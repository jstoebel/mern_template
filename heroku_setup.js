/* eslint-disable no-alert, no-console */
const commandLineArgs = require('command-line-args');
const exec = require('child-process-promise').exec;
const thisPackage = require('./package.json');
const chalk = require('chalk');
const emoji = require('node-emoji');
const randomBytes = require('crypto').randomBytes;

// access other dev env variables should you want to transfer them to production
const dotenv = require('dotenv');
dotenv.load();


// add names of env variables you want passed into your Heroku instance
const varsToPass = [];

const optionDefinitions = [
        {name: 'name', alias: 'n', type: String, defaultValue: thisPackage.name},
    ];

const options = commandLineArgs(optionDefinitions);

const reportSuccess = function(result) {
    // prints results from stdout and stderr

    const stdout = result.stdout;
    console.log(`${emoji.get('white_check_mark')} ${chalk.green(stdout)}`);
};

const reportError = function(err) {
    console.log(`${emoji.get('heavy_exclamation_mark')} ${chalk.red.bold(err)}`);
};

console.log(`Creating your heroku instance for ${options.name}...`);
exec(`heroku apps:create ${options.name}`)
    .then(function(result) {
        // created new app!
        reportSuccess(result);
    }).then(function() {
        // next spin up MongoLab
        console.log('creating MongoLab instance...');
        exec('heroku addons:create mongolab')
            .then(function(result) {
                // created MongoLab instance
                reportSuccess(result);
            })
            .then(function() {
                // next add app secret
                randomBytes(48, function(err, buffer) {
                  const token = buffer.toString('hex');
                  console.log('adding enviornment variables...');
                  // process this object into a key/value string

                  const vars = varsToPass.map(function(varName) {
                    return `${varName}=${process.env[varName]}`;
                  });

                  vars.push(`SESSION_SECRET=${token}`);

                  exec(`heroku config:set ${vars}`)
                    .then(function(result) {
                        // added config vars
                        reportSuccess(result);
                    })
                    .then(function() {
                        // finished successfully!
                        console.log(`${emoji.get('rocket')} ${chalk.green.bold(`${options.name} created successfully!`)}`);
                    }).catch(function(err) {
                        // failed to set session secret
                        reportError(err);
                        process.exit();
                    });
                });
            })
            .catch(function(err) {
                // failed to create MongoLab instance
                reportError(err);
                process.exit();
            });
    })
    .catch(function(err) {
        // failed to create new app
        reportError(err);
        process.exit();
    });
