import React from 'react';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Login, Signup } from './AuthForm';
import AllProducts from './AllProducts';
import Navbar from './Navbar';
import Routes from '../Routes';

const HomePage = () => {
  return (
    <div>
      <nav>
        <Routes />
      </nav>
      <div>
        <h1>
          s I don't know why it is boujee, but it is cool! But why not Edwin??
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
