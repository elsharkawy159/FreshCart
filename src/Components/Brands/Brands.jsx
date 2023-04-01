import React from "react";
import FeaturedBrands from "../FeaturedBrands/FeaturedBrands";
import MainSlider from "../MainSlider/MainSlider";
import "./Brands.module.css";

export default function Brands({ setisLoading }) {
  return (
    <>
      <MainSlider />
      <FeaturedBrands setisLoading={setisLoading} />
    </>
  );
}
