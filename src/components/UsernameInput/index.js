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

import createPlainComponent from '../../utils/createPlainComponent';

const render = target => {
  // Create HTML
  const renderHtml = createPlainComponent(
    `<form class="username-input__form">
      User:
      <input class="username-input__input" />
      <input type="submit" value="Open profile">
    </form>`,
  );
  const element = renderHtml(target);

  // Init interactivity
  element
    .querySelector('.username-input__form')
    .addEventListener('submit', event => {
      event.preventDefault();

      const username = element.querySelector('.username-input__input').value;

      if (document.location.pathname !== '/users') {
        document.location = `/users/#/${username}`;
      } else {
        document.location.hash = `/${username}`;
      }
    });
};

export default render;
