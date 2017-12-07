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
 * This is the app entry point. It detects the current page
 * and renders the corresponding component.
 */

import 'babel-polyfill';

import renderHome from './components/Home';
import renderUser from './components/User';
import initDevelopmentHelpers from './initDevelopmentHelpers';

// This sets up things that help you during development.
// Feel free to not think about this call.
initDevelopmentHelpers();

const path = window.location.pathname;

switch (path) {
  case '/':
    renderHome(document.querySelector('#root'));
    break;

  case '/users/':
    renderUser(document.querySelector('#root'));
    break;

  default:
    throw new Error('Unknown page. Try going to / or /users/');
}
