import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import "./Home.module.css";

export default function Home({ setisLoading }) {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <FeaturedProducts setisLoading={setisLoading} />
    </>
  );
}
