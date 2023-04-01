import { useFormik } from "formik";
import React, { useState } from "react";
import "./Register.module.css";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  let navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name Is Required")
      .min(3, "Minimum Name Length is 3")
      .max(20, "Maximum Name Length is 20"),
    email: Yup.string()
      .required("Email Is Required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email Address is Invalid"),
    password: Yup.string()
      .required("Password Is Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be Minimum eight characters, at least one letter and one number"
      ),
    rePassword: Yup.string()
      .required("rePassword Is Required")
      .oneOf([Yup.ref("password")], "Repassword is Invalid"),
    mobile: Yup.string()
      .required("Mobile number Is Required")
      .matches(/^01[0125][0-9]{8}$/, "Mobile number is invalid"),
  });

  async function handleRegister(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((err) => {
        setisLoading(false);
        setErrorMessage(`${err.response.data.errors.msg}`);
      });
    if (data.message === "success") {
      navigate("/login");
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
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="p-5 mt-5 shadow container rounded-3">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-center fw-bold">Register</h1>
          {ErrorMessage ? (
            <div className="alert alert-danger mt-3">{ErrorMessage}</div>
          ) : null}
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger mt-2">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
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
          <div className="mb-4">
            <label htmlFor="rePassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="rePassword"
              className="form-control"
              id="rePassword"
              placeholder="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger mt-2">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              className="form-control"
              placeholder="Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
            {formik.errors.mobile && formik.touched.mobile ? (
              <div className="alert alert-danger mt-2">
                {formik.errors.mobile}
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
          Already have an Account?
          <Link
            to={"/login"}
            className="text-decoration-none text-main fw-bold"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
