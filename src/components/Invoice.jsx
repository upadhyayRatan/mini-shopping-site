import React from "react";

function Invoice() {
  // getting order data from localStorage
  let data = JSON.parse(localStorage.getItem("orderData"));
  let { orderId, products, price, discount } = data;

  return (
    <div>
      <h2 className="text-center mt-3 mb-3">OrderID # :{orderId}</h2>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Serial No.</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product-Id</th>
            <th scope="col">Discount</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, ind) => {
            return (
              <tr>
                <th scope="row">{ind + 1}</th>
                <td>{prod.productName}</td>
                <td>{prod.productId}</td>
                <td>{prod.discount}</td>
                <td> ₹{prod.productPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <h2 className="text-center">Total Discount : {discount} </h2>
        <h2 className="text-center">Total Price : {price} </h2>
      </div>
    </div>
  );
}

export default Invoice;
