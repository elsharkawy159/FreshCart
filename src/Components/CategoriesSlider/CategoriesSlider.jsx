import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./CategoriesSlider.css";

export default function CategoriesSlider() {
  const [CategoriesSlider, setCategoriesSlider] = useState([]);

  async function getCategories() {
    const { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );
    setCategoriesSlider(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3500,
    cssEase: "linear",
  };

  return (
    <div className="category container-fluid rounded-3 overflow-hidden p-0 mt-0 mb-5">
      <div className="row">
        <Slider className="col-md-12" {...settings}>
          {CategoriesSlider.map((category) => (
            <div className="d-flex- flex-column" key={category._id}>
              <div className="catImg">
                <img className="img-fluid" src={category.image} alt="" />
              </div>
              <h3 className="text-center h6 mt-2 text-main fw-bold">
                {category.name}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
