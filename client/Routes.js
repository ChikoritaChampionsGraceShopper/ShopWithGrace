import React, { Component, Fragment, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import HomePage from './components/HomePage';
import AllProducts from './components/AllProducts';
import Navbar from './components/Navbar';

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
      <Navbar />
      {isLoggedIn ? (
        <Switch>
          <Route path='/home' component={Home} />
          <Redirect to='/home' />
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' />
          <Route path='/login'>{Login}</Route>
          <Route path='/signup'>{Signup}</Route>
          <Route path='/products' component={AllProducts}></Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
