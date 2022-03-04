import React, { Component, Fragment, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import HomePage from './components/HomePage';

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path='/home' component={Home} />
          <Redirect to='/home' />
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login'>{Login}</Route>
          <Route path='/signup'>{Signup}</Route>
          <Route exact path='/products' component={AllProducts} />
          <Route exact path='/products/:id' component={SingleProduct} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
