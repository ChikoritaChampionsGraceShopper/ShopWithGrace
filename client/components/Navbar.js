import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  return (
<<<<<<< HEAD
    <div>
      <h1>Chao's Teas Test</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/home'>Home</Link>
            <a href='#' onClick={() => dispatch(logout())}>
              Logout
            </a>
=======
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <img src="/images/logo.png" width="100" height="100" />
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/">
            <a className="navbar-item">Home</a>
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <Link to="/products">
              <a className="navbar-item">Shop</a>
            </Link>
            <div className="navbar-dropdown">
              <div className="navbar-item">Black Teas</div>
              <div className="navbar-item">Green Teas</div>
              <div className="navbar-item">White Teas</div>
              <div className="navbar-item">Oolong</div>
            </div>
>>>>>>> 49651c72112309f6a32f3fca91f932635a52d5a5
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
