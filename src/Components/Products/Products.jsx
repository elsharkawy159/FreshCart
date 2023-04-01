import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import "./Products.module.css";

export default function Products({ setisLoading }) {
  return <FeaturedProducts setisLoading={setisLoading} />;
}
