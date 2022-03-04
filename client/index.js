import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import Main from './components/Main';
import ProductProvider from './components/ProductsProvider';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ProductProvider>
        <Main />
      </ProductProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
);
