/**
 * This is the app entry point. It detects the current page
 * and renders the corresponding component.
 */

import 'babel-polyfill';

import renderHome from './components/Home';
import initDevelopmentHelpers from './initDevelopmentHelpers';

// This sets up things that help you during development.
// Feel free to not think about this call.
initDevelopmentHelpers();

renderHome(document.querySelector('#root'));
