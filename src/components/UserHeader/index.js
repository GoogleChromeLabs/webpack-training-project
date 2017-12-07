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
import logo from './logo.svg';
import './style.css';

const render = target => {
  const renderUserHeader = createPlainComponent(`
    <header>
      <a class="user-header__link" href="/">
        <img class="user-header__logo" src="${logo}" />
      </a>
    </header>
  `);
  renderUserHeader(target);
};

export default render;
