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
 * This is the home page. To see it in action, open /index.html.
 * This component includes only the dynamic page content –
 * the static one is served in public/index.html.
 */

import createPlainComponent from '../../utils/createPlainComponent';
import renderHomeHeader from '../HomeHeader';
import renderUsernameInput from '../UsernameInput';

const render = target => {
  renderHomeHeader(target);

  const renderUsernamePrompt = createPlainComponent(
    '<p>Try the preview today. Type a GitHub username:</p>',
  );
  renderUsernamePrompt(target);

  renderUsernameInput(target);
};

export default render;
