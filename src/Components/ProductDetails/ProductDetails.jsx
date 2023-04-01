import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails({ setisLoading }) {
  const [ProductDetails, setProductDetails] = useState([]); // Use State Line
  const [ProductImages, setProductImages] = useState([]); // Use State Line

  let params = useParams();
  async function getProductDetails() {
    setisLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${params.id}`
    );
    setProductDetails(data.data);
    setProductImages(data.data.images);
    setisLoading(false);
  }
  useEffect(() => {
    getProductDetails();
  }, []);
  const settings = {
    dots: false,
    fade: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 4000,
    cssEase: "linear",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <div className="row align-items-center mt-4">
        <div className="col-md-4">
          <div className="productDetails rounded-3 overflow-hidden cursor-pointer">
            <Slider className="col-md-12" {...settings}>
              {ProductImages.map((img) => (
                <div>
                  <img className="w-100 h-100" src={img} alt="" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="col-md-8">
          <h4 className="fw-bold">{ProductDetails.title}</h4>
          <p className="text-main">{}</p>
          <p>{ProductDetails.description}</p>
          <div className="mb-3">
            <i className="fa-solid fa-star"></i>
            <span className="font-sm fw-bold text-dark">
              {ProductDetails.ratingsAverage}
            </span>
          </div>
          <p className="fs-5 fw-bold">
            <sup>EGP </sup>
            {ProductDetails.price}
            <sup>.00</sup>
          </p>
          <Link to={"/cart"} className="btn btn-success border-0 w-100">
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
