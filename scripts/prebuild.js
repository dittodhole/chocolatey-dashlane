"use strict";

const request = require('request');
const JSONStream = require('JSONStream');
const path = require('path');
const fs = require('fs');
const winVersionInfo = require('win-version-info');
const crypto = require('crypto');
const glob = require('glob');

const jsonStream = JSONStream
  .parse('content.location')
  .on('data', location => {
    if (location) {
      console.log(`Preparing package from '${location}'.`);
      const hash = crypto.createHash('sha1');
      const setupPath = path.resolve(path.basename(location));
      const writeStream = fs.createWriteStream(setupPath)
        .on('data', (data) => {
          hash.update(data);
        })
        .on('close', () => {
          const versionInfo = winVersionInfo(setupPath);
          const replacements = {
            '$version$': versionInfo.FileVersion,
            '$url$': location,
            '$checksum$': hash.digest('hex')
          };

          console.log(`Searching for *.tmpl-files, and applying following replacements:`);
          console.log(replacements);

          glob.sync('*.tmpl', {
            nocase: true,
            matchBase: true,
            absolute: true
          })
            .forEach((file) => {
              console.log(`Found '${file}'`);

              const content = Object.keys(replacements)
                .reduce((accumulator, key) => {
                  const value = replacements[key];
                  accumulator = accumulator.replace(key, value);
                  return accumulator;
                }, fs.readFileSync(file, {
                  encoding: 'utf8'
                }));

              file = path.join(path.dirname(file),
                               path.basename(file, path.extname(file)));
              fs.writeFileSync(file, content);

              console.log(`Created '${file}'`);
            });

          console.log(`Removing '${setupPath}'.`);
          fs.unlinkSync(setupPath);
        });

      console.log(`Downloading '${location}' to '${setupPath}'.`);
      request
        .get(location)
        .pipe(writeStream);
    } else {
      throw 'Could not determine download location!';
    }
  });

request
  .get('https://dashlane.com/5/binaries/query?platform=website&target=launcher_win')
  .pipe(jsonStream);
