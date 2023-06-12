import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productList } from "../redux-store/productReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { updateProduct } from "../redux-store/productReducer";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosRequestWithToken";

function Products() {
  debugger;
  //get admin login status frm local storage
  let { productObj=[], isLoading=true, isSuccess=false, isError=false } = useSelector(
    (state) => state.products
  );
  console.log(
    "productObj,Is loading,isSuccess,isError",
    productObj,
    isLoading,
    isSuccess,
    isError
  );
  const navigate = useNavigate();

  //set cart
  let cart = useRef([]);
  let dispatch = useDispatch();
  let [products, setProducts] = useState([]);
  let content = null;
  let loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  let cartProducts=JSON.parse(localStorage.getItem('cartProducts'));
    if(loggedIn && cartProducts){
      cart.current=cartProducts;
    }
    console.log("Cart current",cart.current);

    useEffect(() => {
    //get products
    console.log("In 1st effect")
    dispatch(productList());
    // console.log("Products in productList", products);
    // let products = JSON.parse(localStorage.getItem("productList"));
    // setProducts([...products]);
    // console.log("Products in localstorage", products);
  }, []);

  useEffect(() => {
    if(loggedIn){
      let localProducts = JSON.parse(localStorage.getItem("productList"));
      if(localProducts){
        setProducts([...localProducts]);
      }
      console.log("In if efffect",localProducts);
    }
    
  }, [productObj,loggedIn]);

  //handle add to cart
  const handleCartItem = async (product, index) => {
    debugger
    let axiosWithToken= getAxiosWithTokenObj();
    try {
      const response = await axiosWithToken.get("/products/addToCart");
      console.log("REsponse",response)
      if (response.data.message === "success") {
        console.log("In if");
        console.log("Cart.current",cart.current);
        cart.current.push(product);      
        //cart.push(product);
        localStorage.setItem("cartProducts", JSON.stringify(cart.current));
        dispatch(updateProduct(index));
      } else {
        localStorage.clear();
        navigate("/techdiff");
      }
    } catch (e) {
      localStorage.clear();
      navigate("/techdiff");
    }

  };

  // if (isError) {
  //   content = <div class="text-center">Error in loading products..</div>;
  // }
  if (isLoading || products.length===0) {
    content = <div class="text-center">Loading...</div>;
  }
  if (products.length > 0) {
    content = (
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products.map((product, index) => {
          return (
            <div class="col">
              <div class="card shadow p-3 bg-white rounded">
                <img
                  src={product.productImage}
                  class="card-img-top w-50 mx-auto"
                  alt="..."
                />
                <div class="card-body mx-auto">
                  <h3 class="card-title mx-auto">{product.productName}</h3>
                  {product.productCategory === "Vegetables & Fruits" ? (
                    <p class="card-title mx-auto">
                      Price:{product.productPrice}/Kg
                    </p>
                  ) : (
                    <p class="card-title mx-auto">
                      Price:{product.productPrice}
                    </p>
                  )}
                  <p class="card-text mx-auto">{product.productDescription}</p>

                  {product.productInCart === true ? (
                    <NavLink to="/cart">
                      <button class=" productInCart addCart">Go to Cart</button>
                    </NavLink>
                  ) : (
                    <button
                      class="addCart"
                      onClick={() => {
                        handleCartItem(product, index);
                      }}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="container mt-3">{content}</div>;
}

export default Products;
