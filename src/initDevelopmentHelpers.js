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

/**
 *** ABOUT THIS FILE ***
 * This file includes checks that help you while developing the app.
 * You can safely not think about it.
 */

const runChecks = () => {
  const errorMessage =
    'Looks like you haven’t generated the GitHub access token. Please see the “Initialize the environment” section in the Readme.';

  if (!__webpack_modules__[require.resolveWeak('../appConfig.json')]) {
    throw new Error(errorMessage);
  }

  const config = require('../appConfig.json');
  if (!config.accessToken) {
    throw new Error(errorMessage);
  }
};

const setupErrorListener = () => {
  const handleError = (message, stackTrace) => {
    if (!document.querySelector('#error-container')) {
      const errorContainer = document.createElement('div');
      errorContainer.id = 'error-container';
      Object.assign(errorContainer.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '18px 12px 30px',
        fontFamily: 'sans-serif',
        background: '#aa3333',
        color: 'white',
      });

      document.body.appendChild(errorContainer);
    }

    const errorContainer = document.querySelector('#error-container');
    errorContainer.innerHTML = `
            <div>
                <strong>Error:</strong> ${message}
            </div>

            <div style="margin-top: 18px">(Check the DevTools console (<code>F12</code>) for the stack trace.)</div>
        `;
  };

  window.addEventListener('error', event => {
    const error = event.error || {};
    return handleError(error.message);
  });

  window.addEventListener('unhandledrejection', event => {
    const error = event.reason || {};
    return handleError(error.message || error);
  });
};

const initDevelopmentHelpers = () => {
  setupErrorListener();

  runChecks();
};

module.exports = initDevelopmentHelpers;
