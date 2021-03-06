'use strict';

const request = require('request');
const JSONStream = require('JSONStream');
const path = require('path');
const fs = require('fs');
const winVersionInfo = require('win-version-info');
const crypto = require('crypto');
const glob = require('glob');
const winston = require('winston');
const nugetRunner = require('nuget-runner');
const choco = nugetRunner({
  nugetPath: 'choco.exe'
});

const hash = crypto.createHash('sha1');

winston.clear();
winston.add(winston.transports.Console, {
  level: 'silly',
  prettyPrint: true,
  colorize: true
});

const options = {
  artifactsPath: path.resolve('../artifacts/'),
  buildPath: path.resolve('./'),
  nuspecPath: path.resolve('../src/dashlane.nuspec'),
  rootPath: path.resolve('../'),
  srcPath: path.resolve('../src/'),
  tmpPath: path.resolve('./tmp/'),
  versionUrl: 'https://ws1.dashlane.com/5/binaries/query?platform=website&target=launcher_win',
  branch: process.env.APPVEYOR_REPO_BRANCH,
  buildNumber: process.env.APPVEYOR_BUILD_NUMBER
};

if (!fs.existsSync(options.artifactsPath)) {
  winston.info(`Creating '${options.artifactsPath}' ...`);
  fs.mkdirSync(options.artifactsPath);
}
if (!fs.existsSync(options.tmpPath)) {
  winston.info(`Creating '${options.tmpPath}' ...`);
  fs.mkdirSync(options.tmpPath);
}

winston.debug(options);

const jsonStream = JSONStream
  .parse('content.location')
  .on('data', setupUrl => {
    if (setupUrl) {
      const setupPath = path.resolve(options.tmpPath,
                                     path.basename(setupUrl));
      const writeStream = fs.createWriteStream(setupPath)
        .on('close', () => {
          const versionInfo = winVersionInfo(setupPath);
          const versionParts = versionInfo.FileVersion.split('.');
          const major = +versionParts[0];
          const minor = +versionParts[1];
          const build = +versionParts[2];
          const revision = +versionParts[3];

          let version;
          if (options.branch === 'master') {
            version = versionInfo.FileVersion;
          } else if (options.branch) {
            version = `${major}.${minor}.${build}-${options.branch}-${revision}-${options.buildNumber.padStart(4, '0')}`;
          } else {
            version = versionInfo.FileVersion;
          }

          const replacements = {
            '$version$': version,
            '$url$': setupUrl,
            '$checksum$': hash.digest('hex'),
            '$author$': versionInfo.CompanyName,
            '$id$': 'dashlane',
            '$title$': versionInfo.ProductName,
            '$copyright$': versionInfo.LegalCopyright,
            '$branch$': options.branch
          };

          winston.info(`Applying replacements ...`);
          winston.debug(replacements);
          glob.sync('*.tmpl', {
            cwd: options.srcPath,
            nocase: true,
            matchBase: true,
            absolute: true
          })
            .forEach((templatePath) => {
              const renderPath = path.resolve(path.dirname(templatePath),
                                              path.basename(templatePath, path.extname(templatePath)));
              winston.info(`'${templatePath}' ...`);
              const content = Object.keys(replacements)
                .reduce((accumulator, key) => {
                  const value = replacements[key];
                  accumulator = accumulator.split(key).join(value);
                  return accumulator;
                }, fs.readFileSync(templatePath, {
                  encoding: 'utf8'
                }));

              fs.writeFileSync(renderPath,
                               content);
            });
          choco.pack({
            spec: options.nuspecPath,
            outputDirectory: options.artifactsPath
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
  .get(options.versionUrl)
  .pipe(jsonStream);
