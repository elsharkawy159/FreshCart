import React from "react";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import "./Categories.module.css";

export default function Categories({ setisLoading }) {
  return (
    <>
      <CategoriesSlider />
      <FeaturedCategories setisLoading={setisLoading} />
    </>
  );
}
