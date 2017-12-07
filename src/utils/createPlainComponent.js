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
 * This is a function that accepts a string of HTML and returns _another_ function
 * that renders this piece of HTML into a passed node.
 * In LitHub, it’s used as a helper for creating simple components that don’t have children.
 *
 * @example
 *     const renderText = createPlainComponent('<p>Text</p>');
 *         // renderText is a function that accepts a DOM node to render the HTML into
 *
 *     renderText(document.querySelector('#root'));
 *         // The #root element now has <p>Text</p> as a child
 *
 * @param {String} htmlString
 * @returns {Function}
 */
const createPlainComponent = htmlString => {
  const container = document.createElement('div');
  const nodes = new DOMParser().parseFromString(htmlString, 'text/html').body
    .childNodes;
  Array.from(nodes).forEach(node => container.appendChild(node));

  const render = target => {
    target.appendChild(container);
    return container;
  };

  return render;
};

export default createPlainComponent;
