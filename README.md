# Webpack performance project

[![Gitter](https://img.shields.io/gitter/room/Webpack-Training-Project/Lobby.svg)](https://gitter.im/Webpack-Training-Project/Lobby)

A month ago, a popular open-source hosting company decided to build a new extra-light version of its main product – a site with all open-source projects it hosts. They planned that people will use this site on devices with a poor network. They called this product _LitHub_.

As soon as _LitHub_ started, the company realized that all developers are busy on different projects. Somehow, they managed to find a developer who agreed to create this product in their overtime. But two days ago the developer switched the department, and the company decided to hire you to finish the work.

The developer completed the features but didn’t have time to do the only thing left – to optimize the project. Now you have to do this for them instead. The fate of _LitHub_ lies on your shoulders!

<img src="https://i.imgur.com/oRM0kqB.png" alt="LitHub logo" width="300">

_The LitHub logo._

## Task

Using webpack, optimize this repository to make it as small and as network-effective as possible. Here’s what to look at:

* app size (hint: it could be decreased to roughly 160 KB – or even further);
* caching effectiveness.

Focus on changing [the webpack config](./webpack.config.js), but don’t be afraid to change the app too – e.g., some optimizations might come from replacing dependencies.

Use [the article about performance optimization with webpack](https://developers.google.com/web/fundamentals/performance/webpack/) for help.

Want to see our solution? Check [issue #1](https://github.com/iamakulov/webpack-training-project/issues/1).

Want to discuss this task? Join [the Gitter chat](https://gitter.im/Webpack-Training-Project/Lobby).

## How to develop the app

**Initialize the environment**

1\. Clone the repository:

```
git clone https://github.com/iamakulov/webpack-training-project.git
```

2\. Install the dependencies:

```bash
npm install
```

3\. Generate a GitHub access token: run

```
npm run token
```

and follow the instructions.

**Launch the app**

1\. Run the development server:

```bash
npm run dev:server
```

2\. Open [localhost:8080](http://localhost:8080) to see the live app.

**Optimize!**

1\. Apply an optimization.

_Note:_ if you’re applying an optimization in the webpack config, it’s a good practice to apply it only for production builds. Optimizations slow down the build, which is undesirable during development.

To apply an optimization in the production mode, do something like this:

```js
// webpack.config.js
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  /* ... */
  plugins: [
    // Common plugins
  ].concat(
    isProduction
      ? [
          // A plugin that optimizes something in production
        ]
      : [],
  ),
};
```

2\. Run the production build to see if this change affects the size:

```bash
npm run prod:build
```

3\. If you’re optimizing caching, run the production server to see if the change helps:

```bash
npm run prod:server
```

## What’s in the repo

This repo includes the source code of _LitHub_. The app has the following structure:

```
helpers         // Console helpers *for you* that validate
                // a few things during the build.
                // Just don’t care about them.

public          // Static public files (HTML and CSS files)
|- build        // Results of the webpack build (JS and SVG files)

src
|- api         // The API module that makes requests to GitHub API
|- components  // Components that get rendered into the page.
               // Just plain JS, no frameworks (see “How components work”
               // below for additional info)
|- templates   // Templates of HTML pages
|- utils       // Additional utilities
|- index.js    // The entry point. Renders the application
|- initDevelopmentHelpers.js
               // ↑ A helper *for you* that validates a few things
               // and displays errors in a red box. Just don’t care about it.

.babelrc
.gitignore
package.json
package-lock.json
README.md
save-github-token.js
               // ↑ A script that fills the GitHub access token.
webpack.config.js
               // ↑ The webpack config file
```

## How components work

_LitHub_ is built using components, where each component renders a widget on a screen (possibly calling child components).

A component is a plain function that accepts a target (a node where it must be rendered) and a data object to use when rendering the component (e.g. a username). The data argument is optional:

```js
const component = (/** HTMLElement */ target, /**Object */ data) => {
  // Render a component
};
```

A simple component might look like this:

```js
// Will render <p>User <username></p> into the target
const component = (target, { username }) => {
  const content = document.createElement('div');
  content.innerHTML = `<p>User ${username}</p>`;
  target.appendChild(content);
};

component(document.querySelector('#root'), {
  username: 'john-smith',
});
```

A component could do anything inside itself – from calling other components to setting up event listeners.
