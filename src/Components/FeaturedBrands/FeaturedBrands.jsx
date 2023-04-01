import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedBrands.css";
export default function FeaturedBrands() {
  const [Products, setProducts] = useState([]); // Use State Line

  async function getProducts() {
    let { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/brands"
    );
    setProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container ">
      <div className="row gy-3 gx-4">
        {Products.map((product) => (
          <Link
            to={"/products"}
            key={product._id}
            className="col-lg-2 col-md-3 col-sm-6 text-decoration-none"
          >
            <div className="brand rounded-3 overflow-hidden cursor-pointer">
              <div className="productImg overflow-hidden">
                <img
                  className="card-img-top w-100"
                  src={product.image}
                  alt="Card"
                ></img>
              </div>
              <h3 className="h6 text-center fw-bold text-muted">
                {product.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
