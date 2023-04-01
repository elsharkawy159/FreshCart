import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

export default function App() {
  const [UserData, setUserData] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      userData();
    }
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  }, []);

  function userData() {
    let encodedUserData = localStorage.getItem("userToken");
    let decodedUserData = jwtDecode(encodedUserData);
    setUserData(decodedUserData);
  }
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
  }

  console.log(UserData);
  const routers = createBrowserRouter([
    {
      path: "/FreshCart",
      element: <Layout UserData={UserData} logOut={logOut} />,
      children: [
        { index: true, element: <Home setisLoading={setisLoading} /> },
        {
          path: "/FreshCart/Products",
          element: <Products setisLoading={setisLoading} />,
        },
        {
          path: "/productdetails/:id",
          element: <ProductDetails setisLoading={setisLoading} />,
        },
        {
          path: "/Categories",
          element: <Categories setisLoading={setisLoading} />,
        },
        { path: "/Brands", element: <Brands setisLoading={setisLoading} /> },
        { path: "/Cart", element: <Cart /> },
        {
          path: "/Login",
          element: <Login userData={userData} />,
        },
        { path: "/Register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <RouterProvider router={routers}></RouterProvider>;
    </>
  );
}
