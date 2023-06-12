import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  let loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  let [cartState, setCartState] = useState({
    emptyCart: true,
  });

  let [productState, setProducts] = useState({
    products: [],
  });

  useEffect(() => {
    //get items from local storage
    let productsLocal = JSON.parse(localStorage.getItem("cartProducts"));
    console.log("In cart effect");

    //set to products array to display in cart
    if (productsLocal !== null) {
      setProducts({ products: [...productsLocal] });
      setCartState({ emptyCart: false });
    }
    //when cart is empty
    if (productsLocal === null || productState.products.length === 0) {
      cartState.emptyCart = true;
    }
  }, []);
  console.log("IN CART ", cartState, productState);

  //order summary
  let order = {
    numberOfItems: 0,
    subTotal: 0,
    discount: 0,
    total: 0,
  };

  order.numberOfItems = productState.products.length;
  for (let i of productState.products) {
    let index = productState.products.indexOf(i);
    if (index === 0) {
      order.subTotal = 0;
    }
    console.log("in for", i.productPrice);
    order.subTotal = order.subTotal + JSON.parse(i.productPrice);
  }
  if (order.subTotal > 200) {
    order.discount = 10;
  }
  if (order.subTotal < 200) {
    order.discount = 0;
  }
  order.total = order.subTotal - order.discount * 0.01 * order.subTotal;

  //initialize order history state 
  let orderHistory = {
    username: "",
    products: [],
    price: 0,
    discount: 0,
    orderId: 0,
  };

  //handle checkout
  const handleCheckout = async (order) => {
    console.log("In checkout");
    console.log("IsLogin is", loggedIn);
    //check user login
    if (loggedIn) {
      let products = JSON.parse(localStorage.getItem("cartProducts"));
      let username = localStorage.getItem("username");
      //set order history

      orderHistory.username = username;
      orderHistory.products = products;
      orderHistory.price = order.total;
      orderHistory.discount = order.discount;
      orderHistory.orderId = Math.floor(Math.random() * 100 + 1);

      try {
        let response = await axios.post("/cart/orderHistory", { orderHistory });
        if ((response.data.message = "success")) {
          localStorage.setItem("orderData", JSON.stringify(orderHistory));
          //empty cart after placing order
          localStorage.removeItem("cartProducts");
          setProducts({ products: [] });
          setCartState({ emptyCart: true });
        }
      } catch (err) {
        navigate("/techdiff");
      }
    } else if (loggedIn === null || loggedIn === false) {
      alert("Please login to continue..");
      navigate("/techdiff");
    }
  };

  //go to invoice
  const gotoInvoice = () => {
    navigate("/invoice");
  };

  return (
    <div className="container">
      {!cartState.emptyCart ? (
        <>
          <h3 className="ms-3 mt-4 mb-4 mx-auto text-center">
            Items in the Cart{" "}
          </h3>
          <div className="row row-cols-1 d-flex">
            <div className="col-8">
              {productState.products.map((prod, ind) => {
                return (
                  <div
                    className="card mt-2 shadow p-3 bg-white rounded"
                    key={ind}
                  >
                    <div className="row">
                      <div className="col-4 cols-md-6">
                        <img
                          src={prod.productImage}
                          className="card-img  ms-2 m-auto cartimg w-50"
                          alt="something"
                        />
                      </div>
                      <div className="col-8 col-md-6">
                        <div class="card-body w-100">
                          <h3 class="card-title ms-2">{prod.productName}</h3>
                          <h5 className="card-text ms-2">
                            ₹ {prod.productPrice}
                          </h5>
                          <p className="card-text ms-2">
                            Total :{prod.productPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Order Summary */}
            <div className="col-4 ">
              <div className="border border-dark rounded order">
                <h5 className="text-center m-3">Order Summary</h5>
                <p class="m-3">No. of Items :{order.numberOfItems} </p>
                <p class="m-3">Sub-total :{order.subTotal}</p>
                <p class="m-3">Discount % :{order.discount} </p>

                <h5 className="m-2">Total : {order.total} </h5>

                <div className="d-block mx-auto">
                  <button
                    className=" checkoutBtn mx-auto "
                    onClick={() => handleCheckout(order)}
                    data-bs-toggle="modal"
                    data-bs-target="#example"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="emptyCart mx-auto text-center">
            No items in the cart...{" "}
          </h1>
        </>
      )}
      {/* modal for invoice */}
      {loggedIn && (
        <div
          class="modal fade"
          id="example"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <h3 className="text-center">Yay.. Order placed</h3>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary d-block mx-auto"
                  onClick={() => gotoInvoice()}
                >
                  Check Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
