'use strict';

const request = require('request');
const JSONStream = require('JSONStream');
const path = require('path');
const fs = require('fs');
const winVersionInfo = require('win-version-info');
const crypto = require('crypto');
const glob = require('glob');
const winston = require('winston');
const Nuget = require('nuget-runner');
const nuget = Nuget({
  nugetPath: 'choco.exe'
});

const hash = crypto.createHash('sha1');

const artifactsPath = path.resolve('../artifacts/');
const buildPath = path.resolve('./');
const nuspecPath = path.resolve('../src/dashlane.nuspec');
const srcPath = path.resolve('../src/');
const tmpPath = path.resolve('./tmp/');
const versionUrl = 'https://dashlane.com/5/binaries/query?platform=website&target=launcher_win';

console.log(`| Variable         | Value`);
console.log(`|------------------|-----------------------------`);
console.log(`| artifactsPath    | ${artifactsPath}`);
console.log(`| buildPath        | ${buildPath}`);
console.log(`| nuspecPath       | ${nuspecPath}`);
console.log(`| srcPath          | ${srcPath}`);
console.log(`| tmpPath          | ${tmpPath}`);
console.log(`| versionUrl       | ${versionUrl}`);
console.log(`|------------------|-----------------------------`);
console.log();

const jsonStream = JSONStream
  .parse('content.location')
  .on('data', setupUrl => {
    if (setupUrl) {
      const setupPath = path.resolve(tmpPath,
                                     path.basename(setupUrl));
      const writeStream = fs.createWriteStream(setupPath)
        .on('close', () => {
          const versionInfo = winVersionInfo(setupPath);
          const replacements = {
            '$version$': versionInfo.FileVersion,
            '$url$': setupUrl,
            '$checksum$': hash.digest('hex')
          };

          winston.info(`Applying replacements ...`);
          glob.sync('*.tmpl', {
            cwd: srcPath,
            nocase: true,
            matchBase: true,
            absolute: true
          })
            .forEach((templatePath) => {
              const renderPath = path.resolve(path.dirname(templatePath),
                                              path.basename(templatePath, path.extname(templatePath)));
              winston.info(`${templatePath} ...`);
              const content = Object.keys(replacements)
                .reduce((accumulator, key) => {
                  const value = replacements[key];
                  accumulator = accumulator.replace(key, value);
                  return accumulator;
                }, fs.readFileSync(templatePath, {
                  encoding: 'utf8'
                }));

              fs.writeFileSync(renderPath,
                               content);
            });
          nuget.pack({
            spec: nuspecPath,
            outputDirectory: artifactsPath
          });
        });

      winston.info(`Downloading '${setupUrl}' ...`);
      request
        .get(setupUrl)
        .on('data', (data) => {
          hash.update(data);
        })
        .pipe(writeStream);
    } else {
      winston.error('Could not determine setup url!!');
    }
  });

winston.info(`Downloading version information ...`);
request
  .get(versionUrl)
  .pipe(jsonStream);