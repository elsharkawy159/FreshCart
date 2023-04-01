import React from "react";
import Slider from "react-slick";
import "./MainSlider.module.css";
import Slide1 from "../../images/images/mainSlider/1.jpg";
import Slide2 from "../../images/images/mainSlider/2.jpg";
import Slide3 from "../../images/images/mainSlider/3.jpg";
import Slide4 from "../../images/images/mainSlider/4.jpg";
export default function MainSlider() {
  const settings = {
    dots: false,
    fade: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 5000,
    cssEase: "linear",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container-fluid p-0 mt-0 mb-0">
      <div className="row gx-0">
        <Slider className="col-md-12" {...settings}>
          <div>
            <img className="w-100 h-100" src={Slide1} alt="" />
          </div>
          <div>
            <img className="w-100 h-100" src={Slide2} alt="" />
          </div>
          <div>
            <img className="w-100 h-100" src={Slide3} alt="" />
          </div>
          <div>
            <img className="w-100 h-100" src={Slide4} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}
