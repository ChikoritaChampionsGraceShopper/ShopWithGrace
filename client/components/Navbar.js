import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  return (
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
          <Link to="/products">
            <a className="navbar-item">Shop</a>
          </Link>
          <div className="navbar-dropdown">
            <div className="navbar-item">Black Teas</div>
            <div className="navbar-item">Green Teas</div>
            <div className="navbar-item">White Teas</div>
            <div className="navbar-item">Oolong</div>
          </div>
          <Link to="/signup">
            <a className="navbar-item">Sign up</a>
          </Link>
          <Link to="/login">
            <a className="navbar-item">Log in</a>
          </Link>
          <div className="navbar-item has-dropdown is-hoverable"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;