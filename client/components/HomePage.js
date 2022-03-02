import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './AuthForm';
import AllProducts from './AllProducts'

const HomePage = () => {
  return (
    <div>
      <nav>
        <Switch>
          <Route path='/login'>{Login}</Route>
          <Route path='/signup'>{Signup}</Route>
        </Switch>
      </nav>
      <div>
        <h1>I don't know why it is boujee, but it is cool! But why not Edwin??</h1>
      </div>
      <div>
          {/* <AllProducts /> */}
      </div>
    </div>
  );
};

export default HomePage;
