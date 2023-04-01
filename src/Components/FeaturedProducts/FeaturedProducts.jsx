import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./FeaturedProducts.css";

export default function FeaturedProducts({ setisLoading }) {
  const [Products, setProducts] = useState([]); // Use State Line

  async function getProducts() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/products"
    );
    setProducts(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Added to Cart",
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {Products.map((product) => (
          <div key={product.id} className="col-lg-2 col-md-3 col-6">
            <Link
              className="text-decoration-none"
              to={`/productdetails/${product.id}`}
            >
              <div className="product rounded-3 overflow-hidden cursor-pointer">
                <div className="productImg overflow-hidden">
                  <img
                    className="card-img-top w-100"
                    src={product.imageCover}
                    alt="Card"
                  ></img>
                </div>
                <div className="card-body p-2">
                  <p className="card-title text-main h6 mb-2">
                    {product.category.name}
                  </p>
                  <h3 className="card-title fw-bolder h6 mb-3 text-dark">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="price mb-0 text-dark h6 ">
                      {" "}
                      <sup>EGP</sup>
                      {product.price}
                      <sup>00</sup>
                    </p>
                    <div>
                      <i className="fa-solid fa-star"></i>
                      <span className="font-sm fw-bold text-dark">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                  <Link
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-success w-100 mb-2"
                  >
                    Add to Cart
                  </Link>
                  <Link to={"/cart"} className="btn btn-success w-100">
                    View Cart
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
