// third party imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// local imports
import store from '../src/store/store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
