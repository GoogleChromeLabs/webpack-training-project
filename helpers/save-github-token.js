/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var readline = require('readline');

var APP_CONFIG_FILE_NAME = path.resolve(__dirname, '..', 'appConfig.json');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(
  chalk.blue('LitHub requires a GitHub access token in order to work.')
);
console.log(
  'Please generate the token via https://github.com/blog/1509-personal-api-tokens (don’t choose any token permissions).'
);

rl.question('Then, paste the token here: ', accessToken => {
  fs.writeFileSync(
    APP_CONFIG_FILE_NAME,
    JSON.stringify(
      {
        accessToken: accessToken
      },
      null,
      2
    )
  );
  console.log('Written the token into the ' + APP_CONFIG_FILE_NAME + ' file');
  process.exit(0);
});
