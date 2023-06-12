import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  let navigate = useNavigate();
  let [orderHistory, setOrderHistory] = useState([]);

  let loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    async function getOrders() {
      if (loggedIn) {
        let name = localStorage.getItem("username");
        let res = await axios.get("/cart/get-orderhistory", {
          params: { name },
        });
        let alldata = res.data;
        console.log("data",res.data)
        console.log("allalldata.payload.orders", alldata.payload);
        if (alldata.message === "Success") {
          if (alldata.payload !== undefined) {
            setOrderHistory([...alldata.payload]);
          }
        } else {
          alert(alldata.message);
          //clear local storage
          localStorage.clear();
          navigate("/techdiff");
        }
      } else {
        navigate("/login");
      }
    }
    getOrders();
  }, []);

  if (orderHistory.length === 0) return <p>loading...</p>;
  return (
    <div className="container">
      <h1 className="text-center mt-3 mb-4 ordersHead">Order History</h1>
      {orderHistory.map((prod, ind) => {
        return (
          <div class="card mb-3  mt-2 shadow p-3 bg-white rounded" key={ind}>
            <div class="row g-0">
              <div class="col-md-4">
                {prod.products.length === 1 ? (
                  <div>
                    <img
                      src={prod.products[0].productImage}
                      class="ms-2 m-auto cart-img w-25"
                      alt="# "
                    />
                  </div>
                ) : (
                  <div className="d-flex">
                    <div className="col-md-8">
                      <img
                        src={prod.products[0].productImage}
                        class="ms-2 m-auto cart-img w-25"
                        alt="#"
                      />
                    </div>
                    <div className="container mt-2 backimage">
                      <p className="text-center p-3 display-5">
                        +{prod.products.length - 1}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  {/* level-1 */}

                  <div className="row">
                    <div className="col">
                      {/* level-1(a) */}
                      <div className="row">
                        <div className="col">
                          <p>Order id # {prod.orderId} </p>
                        </div>
                        <div className="col">
                          <p>No. of items : {prod.products.length}</p>
                        </div>
                        <div className="col">
                          <p>Total Discount : {prod.discount}</p>
                        </div>
                      </div>
                      {/* level-1(b) */}
                      <div className="row">
                        <div className="col">
                          <p className="text-center">
                            Total Amount Paid: ₹ {prod.price}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <h4>Status</h4>
                      <p className="text-success">Succesfull</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
