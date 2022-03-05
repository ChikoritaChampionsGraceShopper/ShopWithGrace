import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import Main from './components/Main';
import ProductProvider from './components/ProductsProvider';
import AccountProvider from './components/AccountProvider';
import CartProvider from './components/Cart/CartProvider'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AccountProvider>
        <ProductProvider>
          <CartProvider>
            <Main />
          </CartProvider>
        </ProductProvider>
      </AccountProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
);
