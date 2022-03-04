import React, { Component, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import Navbar from "./components/Navbar";
import SingleProduct from "./components/SingleProduct";
import HomePage from "./components/HomePage";

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
      {/* <nav>
        <Navbar />
      </nav> */}
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
<<<<<<< HEAD
          <Route exact path='/' component={HomePage} />
          <Route path='/login'>{Login}</Route>
          <Route path='/signup'>{Signup}</Route>
          <Route exact path='/products' component={AllProducts} />
          <Route exact path='/products/:id' component={SingleProduct} />
=======
          <Route exact path="/" component={HomePage} />
          <Route path="/login">{Login}</Route>
          <Route path="/signup">{Signup}</Route>
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
>>>>>>> 49651c72112309f6a32f3fca91f932635a52d5a5
        </Switch>
      )}
    </div>
  );
};

export default Routes;
