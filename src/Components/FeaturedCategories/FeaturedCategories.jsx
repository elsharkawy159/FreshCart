import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedCategories.css";
export default function FeaturedCategories({ setisLoading }) {
  const [Category, setCategory] = useState([]); // Use State Line

  async function getCategory() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/subcategories"
    );
    setCategory(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {Category.map((Category) => (
          <Link
            to={"/products"}
            className="text-decoration-none col-lg-2 col-md-3 col-sm-6 "
          >
            <div key={Category._id}>
              <div className="Category rounded-3 overflow-hidden cursor-pointer">
                <h3 className="h6 p-4 text-center m-0 text-dark">
                  {Category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
