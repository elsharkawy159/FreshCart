import React, { useState } from "react";
import "./Footer.module.css";
import amazonPay from "../../images/payments/amazonPay.svg";
import MC from "../../images/payments/Mastercard-Logo.wine.svg";
import Paypal from "../../images/payments/PayPal-Logo.wine.svg";
import GooglePlay from "../../images/payments/googleplay.png";
import AppStore from "../../images/payments/appstore.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const [Mailto, setMailto] = useState("");
  function mailTo(e) {
    setMailto(e.target.value);
  }
  return (
    <>
      <footer className="w-100 pt-5 pb-5 mt-5 mb-0">
        <div className="container">
          <h3>Get the FreshCart app</h3>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="shareLink m-3 mb-4 row">
            <div className="input col-md-10">
              <input
                id="mail"
                className="form-control"
                type="email"
                placeholder="Email .."
                onBlur={mailTo}
              />
            </div>
            <Link
              to={`mailto:${Mailto}`}
              className="btn btn-success bg-main col-md-2 col-4 m-auto"
            >
              Share App Link
            </Link>
          </div>
          <div className="row">
            <div className="bar mb-3"></div>
            <div className="col-md-6">
              <span className="h6 m-0">Payment Partners</span>
              <img src={amazonPay} width="70px" alt="" />
              <img src={MC} width="70px" alt="" />
              <img src={Paypal} width="70px" alt="" />
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <span className="h6 m-0">Get deliveries with FreshCart </span>
              <Link>
                <img src={AppStore} width="70px" height={33} alt="" />
              </Link>
              <Link>
                <img src={GooglePlay} width="70px" alt="" />
              </Link>
            </div>
            <div className="bar mt-3 mb-3"></div>
          </div>
        </div>
      </footer>
    </>
  );
}
