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

import 'whatwg-fetch';
import appConfig from '../../appConfig';

const fetchWithAuth = url =>
  window
    .fetch(`${url}?access_token=${appConfig.accessToken}`)
    .then(response => Promise.all([response.status, response.json()]))
    .then(results => ({
      status: results[0],
      data: results[1],
    }));

export const fetchUser = username =>
  fetchWithAuth(`https://api.github.com/users/${username}`);
export const fetchFollowing = username =>
  fetchWithAuth(`https://api.github.com/users/${username}/following`);
export const fetchFollowers = username =>
  fetchWithAuth(`https://api.github.com/users/${username}/followers`);
