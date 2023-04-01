import React, { useEffect } from "react";
import "./Navbar.css";
// import { NavLink } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
export default function Navbar({ UserData, logOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow position-relative">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="w-100 h-100" src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/categories">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/brands">
                Brands
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav socialIcons align-items-center ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fa-brands fa-instagram text-dark"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fa-brands fa-facebook text-dark"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fa-brands fa-tiktok text-dark"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fa-brands fa-twitter text-dark"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fa-brands fa-linkedin text-dark"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fa-brands fa-youtube text-dark"></i>
              </Link>
            </li>
          </ul>
          <div className="cart btn btn-light">
            <Link className="nav-link d-flex flex-column" to="cart">
              <i className="fa-solid fa-cart-shopping fs-3 text-main"></i>
            </Link>
          </div>
          <ul className="navbar-nav">
            {UserData ? (
              <>
                <span className="opacity-50 cursor-default">|</span>
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark fw-normal"
                    to="/"
                    onClick={logOut}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-normal" to="login">
                    Login
                  </Link>
                </li>
                <span className="opacity-50 cursor-default">|</span>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-normal" to="register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
