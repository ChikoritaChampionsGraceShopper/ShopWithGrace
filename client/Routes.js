import React, { Component, Fragment, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import EditProduct from './components/EditProduct';
import CartPage from './components/Cart/CartPage';
import NotFound from './components/NotFound';

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div className='routes'>
      {isLoggedIn ? (
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/home' component={Home} />
          <Route path='/account/:id' component={AccountPage} />
          <Route path='/edit-product/:id' component={EditProduct} />
          <Route exact path='/products' component={AllProducts} />
          <Route exact path='/products/:id' component={SingleProduct} />
          <Route exact path='/cart/:id' component={CartPage} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login'>{Login}</Route>
          <Route path='/signup'>{Signup}</Route>
          <Route exact path='/products' component={AllProducts} />
          <Route exact path='/products/:id' component={SingleProduct} />
          <Route exact path='/cart' component={CartPage} />
          <Route path='/*' component={NotFound} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
