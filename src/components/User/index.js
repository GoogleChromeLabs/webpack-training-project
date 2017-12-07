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
 *
 * This is the user’s page. To see it in action, open /users/index.html.
 *
 * This page has a router that renders specific components based on the URL hash
 * (i.e., /users/index.html#/iamakulov/following).
 * Think of it as of a single-page app with multiple routes (hint-hint!).
 */

import createHashRouter from 'hash-router';
import createPlainComponent from '../../utils/createPlainComponent';
import renderUserHeader from '../UserHeader';
import renderUsernameInput from '../UsernameInput';
import renderUserProfile from '../UserProfile';
import renderUserFollowers from '../UserFollowers';
import renderUserFollowing from '../UserFollowing';
import './style.css';

const Route = {
  USERNAME: 'USERNAME',
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWING: 'FOLLOWING',
};

const renderUsername = (target, { username }) => {
  const render = createPlainComponent(
    `<h2 class="user__user-title">User ${username}</h2>`,
  );
  render(target);
};

const renderNavigation = (target, { username, currentRoute }) => {
  const render = createPlainComponent(`
    <nav>
      <ul class="user__nav-list">
        <li class="user__nav-item">
          ${
            currentRoute === Route.USERNAME
              ? `<span class="user__nav-route user__nav-route_active">Profile</span>`
              : `<a class="user__nav-route" href="#/${username}">Profile</a>`
          }
        </li>
        <li class="user__nav-item">
          ${
            currentRoute === Route.FOLLOWERS
              ? `<span class="user__nav-route user__nav-route_active">Followers</span>`
              : `<a class="user__nav-route" href="#/${username}/followers">Followers</a>`
          }
        </li>
        <li class="user__nav-item">
          ${
            currentRoute === Route.FOLLOWING
              ? `<span class="user__nav-route user__nav-route_active">Following</span>`
              : `<a class="user__nav-route" href="#/${username}/following">Following</a>`
          }
        </li>
      </ul> 
    </nav>
    `);
  render(target);
};

const render = target => {
  // Render static elements
  renderUserHeader(target);
  renderUsernameInput(target);

  // Render route-dependent content
  const routerTarget = document.createElement('div');
  target.appendChild(routerTarget);

  // ...This router renders specific components based on the URL hash.
  const router = createHashRouter();
  router.addRoute('#/:username', (hash, options) => {
    const username = options.params.username;

    routerTarget.innerHTML = '';
    renderUsername(routerTarget, { username });
    renderNavigation(routerTarget, { username, currentRoute: Route.USERNAME });
    renderUserProfile(routerTarget, { username });
  });

  router.addRoute('#/:username/followers', (hash, options) => {
    const username = options.params.username;

    routerTarget.innerHTML = '';
    renderUsername(routerTarget, { username });
    renderNavigation(routerTarget, { username, currentRoute: Route.FOLLOWERS });
    renderUserFollowers(routerTarget, { username });
  });

  router.addRoute('#/:username/following', (hash, options) => {
    const username = options.params.username;

    routerTarget.innerHTML = '';
    renderUsername(routerTarget, { username });
    renderNavigation(routerTarget, { username, currentRoute: Route.FOLLOWING });
    renderUserFollowing(routerTarget, { username });
  });

  window.addEventListener('hashchange', router);
  router();
};

export default render;
