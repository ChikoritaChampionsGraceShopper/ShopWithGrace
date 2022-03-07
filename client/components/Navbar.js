import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logout } from "../store";
import CartIcon from "../components/Cart/CartIcon";
import history from "../history";

const Navbar = () => {
  let id = 0;
  const isLoggedIn = useSelector((state) => {
    id = state.auth.id;
    return !!state.auth.id;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="nav-menu">
        <div className="logo">
          <Link to="/">Chao's Teas</Link>
        </div>
        {isLoggedIn ? (
          <div className="logged-in">
            <div>
              <ul className="links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Shop</Link>
                </li>
                <li>
                  <Link to={`/account/${id}`}>Account</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => dispatch(logout())}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <CartIcon id={id} />
            </div>
          </div>
        ) : (
          <div className="logged-out">
            <div>
              <ul className="links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Shop</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              </ul>
            </div>
            <div>
              <CartIcon props={history} />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
