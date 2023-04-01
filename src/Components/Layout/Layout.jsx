import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";

export default function Layout({ UserData, logOut }) {
  return (
    <>
      <Navbar UserData={UserData} logOut={logOut} />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}
