import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Cart.css";

export default function Cart() {
  const [CartList, setCartList] = useState([]);
  const [Quantity, setQuantity] = useState(1);

  function getCartList() {
    setCartList(JSON.parse(localStorage.getItem("cartItems")));
  }

  useEffect(() => {
    getCartList();
  }, []);

  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCartList = CartList.filter((p) => p.id !== product.id);
        setCartList(updatedCartList);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartList));
        Swal.fire(
          "Deleted!",
          "The Product has been deleted from your cart.",
          "success"
        );
      }
    });
  };
  function HandlePlaceOrder() {
    if (localStorage.getItem("cartItems") === "[]") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The Cart is Empty!",
      });
    } else {
      Swal.fire("Thank You", "Order Placed Successfully!", "success");
      localStorage.setItem("cartItems", JSON.stringify([]));
      setCartList([]);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  // const handleIncrement = (product) => {
  //   // const updatedProducts = [...CartList];
  //   // const index = updatedProducts.indexOf(product);
  //   // updatedProducts[index] = { ...product };
  //   // setQuantity(updatedProducts[index].Quantity++);
  // };

  const subTotal = CartList.reduce(
    (acc, item) => acc + item.price * Quantity,
    0
  );
  const shipping = 9.99;
  const tax = subTotal * 0.08;
  const total = subTotal + shipping + tax;

  return (
    <div className="mt-5 container shadow rounded-4 p-4">
      <h1 className="text-center mb-5 fw-bold text-dark">Shopping Cart</h1>
      <div className="row">
        <div className="table text-center mb-5">
          <thead>
            <tr>
              <th className="col-md-1">Image</th>
              <th className="col-md-2">Product</th>
              <th className="col-md-3">Price</th>
              <th className="col-md-1">Quantity</th>
              <th className="col-md-4">Total</th>
              <th className="col-md-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {CartList.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    className="cartImg"
                    src={item.imageCover}
                    width={50}
                    alt=""
                  />
                </td>
                <td className="text-main fw-semibold ">
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </td>
                <td>EGP {item.price.toFixed(2)}</td>
                <td>{Quantity}</td>
                <td>EGP {(item.price * Quantity).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
      <div className="row">
        <div className="text-center col-md-4 m-auto">
          <p>Subtotal: EGP {subTotal.toFixed(2)}</p>
          <p>Shipping: EGP {shipping.toFixed(2)}</p>
          <p>Tax: EGP {tax.toFixed(2)}</p>
          <h4 className="fw-bolder mb-3">
            Total: EGP <span className="text-main">{total.toFixed(2)}</span>
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group" controlId="paymentMethod">
              <div className="form-label ">Payment Methods</div>
              <select className="form-control mb-3 text-center">
                <option>Select..</option>
                <option>Cash on Delivery</option>
                <option>Credit/Debit Card</option>
                <option>PayPal</option>
                <option>Vodafone Cash</option>
              </select>
            </div>
            <button
              onClick={() => HandlePlaceOrder()}
              className="btn bg-main text-light"
              type="submit"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
