import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Products from "./Products";
import AddProducts from "./AddProducts";
import "../css/Navbar.css";
import { clearLoginStatus } from "../redux-store/userReducer";
import { useDispatch } from "react-redux";

function Navbar() {
  const [showProducts, setShowProducts] = useState(true);
  const dispatch = useDispatch();
  let numberOfItems =
    JSON.parse(localStorage.getItem("cartProducts")) &&
    JSON.parse(localStorage.getItem("cartProducts")).length;
  //handle user logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearLoginStatus());
  };

  return (
    <div>
      <nav class="navbar navBar">
        <form class="container-fluid ">
          <div class="product-btn">
            <button
              class="btn btn-outline-success me-4"
              type="button"
              onClick={() => setShowProducts(true)}
            >
              View Products
            </button>
            <button
              class="btn btn-outline-success"
              type="button"
              onClick={() => setShowProducts(false)}
            >
              Add Products
            </button>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
              <i class="far fa-minus-square"></i>
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav cart-logout-btn">
              <li class="nav-item">
                <NavLink
                  to="/orders"
                  class="nav-link"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  OrderHistory
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/"
                  class="nav-link logoutLink"
                  onClick={handleLogout}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Logout
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink
                  class="nav-link w-10 me-2 cartBtn"
                  to="/cart"
                  aria-current="page"
                  href="#"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <i class="fas fa-cart-plus fa-1x">
                    <sup>{numberOfItems}</sup>
                  </i>
                </NavLink>
              </li>
            </ul>
          </div>
        </form>
      </nav>
      {showProducts ? <Products /> : <AddProducts />}
    </div>
  );
}

export default Navbar;
