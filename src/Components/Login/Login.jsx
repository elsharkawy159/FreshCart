import { useFormik } from "formik";
import React, { useState } from "react";
import "./Login.module.css";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ userData }) {
  const [isLoading, setisLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  let navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email Is Required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email Address is Invalid"),
    password: Yup.string()
      .required("Password Is Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be Minimum eight characters, at least one letter and one number"
      ),
  });

  async function handleLogin(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .catch((err) => {
        setisLoading(false);
        setErrorMessage(`${err.response.data.message}`);
        // console.log(err);
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      userData();
      setisLoading(false);
      navigate("/");
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      mobile: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="p-5 mt-5 shadow container rounded-3">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-center fw-bold">Login</h1>
          {ErrorMessage ? (
            <div className="alert alert-danger mt-3">{ErrorMessage}</div>
          ) : null}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger mt-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger mt-2">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          {isLoading ? (
            <button type="button" className="btn bg-main text-light">
              <i className="fa-solid fa-arrows-spin fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light"
            >
              Submit
            </button>
          )}
        </form>
        <p className="mt-3">
          Don't have an Account?
          <Link
            to={"/register"}
            className="text-decoration-none text-main fw-bold"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
