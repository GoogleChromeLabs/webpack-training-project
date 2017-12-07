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

import moment from 'moment/moment';
import createPlainComponent from '../../utils/createPlainComponent';

const render = target => {
  // Create HTML
  const renderHeader = createPlainComponent(
    `<p>
      LitHub is opening in <span class="home-header__time">∞</span> seconds!
    </p>`,
  );
  const element = renderHeader(target);

  // Init interactivity
  const release = moment([2018, 3, 1]);
  const updateDate = () => {
    const time = release.diff(moment(), 'seconds', true);
    element.querySelector('.home-header__time').textContent = time.toFixed(3);

    // requestAnimationFrame would call updateDate() as soon as the frame changes
    requestAnimationFrame(updateDate);
  };
  updateDate();
};

export default render;
