import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AddProducts() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [file, setFile] = useState(null);

  //On file select
  const onFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const onProductFormSubmit = async (productObj) => {
    //create form data object
    let formData = new FormData();
    debugger;
    //append image to it
    formData.append("photo", file, file.name);
    //append productObj
    formData.append("productObj", JSON.stringify(productObj)); // stringify converts object to string

    console.log("form data is", formData);
    //HTTP POST
    let response = await axios.post("/products/addProduct", formData);
    console.log("Response",response);
    alert(response.data.message);

  };

  return (
    <div className="row mt-5">
      <form
        className="col-11 col-sm-8 col-md-6 mx-auto"
        onSubmit={handleSubmit(onProductFormSubmit)}
      >
        {/* Select category */}
        <div className=" mb-3 mt-3">
          <label>
            Select category:
            <select
              className="form-select"
              id="productCategory"
              {...register("category", { required: true })}
            >
              <option value="Beverages">Beverages</option>
              <option value="Baby-care">Baby Care</option>
              <option value="Vegetables & Fruits">Vegatables & Fruits</option>
              <option value="Dry Fruits & Nuts">Dry Fruits & Nuts</option>
              <option value="Salt & Sugar">Salt & Sugar</option>
              <option value="Pulses">Pulses</option>
            </select>
          </label>
        </div>

        {/* name */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="productName@example.com"
            {...register("productName", { required: true })}
          />
          <label htmlFor="productName">Product Name</label>
        </div>
        {errors.productName?.type === "required" && (
          <p className="alert alert-danger">*Prodcut Name is required</p>
        )}

        {/* id */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="productId"
            placeholder="productId@example.com"
            {...register("productId", { required: true, minLength: 6 })}
          />
          <label htmlFor="productId">Product Id</label>
        </div>
        {errors.productId?.type === "required" && (
          <p className="alert alert-danger">*Product Id is required</p>
        )}
        {errors.productId?.type === "minLength" && (
          <p className="alert alert-danger">*Minimum length should be 6</p>
        )}

        {/* price */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="productPrice"
            placeholder="productPrice@example.com"
            {...register("productPrice", { required: true })}
          />
          <label htmlFor="productPrice">Price</label>
        </div>
        {errors.productPrice?.type === "required" && (
          <p className="alert alert-danger">*Price is required</p>
        )}

        {/* Count*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="productCount"
            placeholder="productCount@example.com"
            {...register("productCount", { required: true })}
          />
          <label htmlFor="productCount">Product Quantity</label>
        </div>
        {errors.productCount?.type === "required" && (
          <p className="alert alert-danger">*Product Count is required</p>
        )}

        {/* Description */}
        <div className="form-floating mb-3">
          <textarea
            id="productDescription"
            cols="0"
            rows="10"
            className="form-control"
            placeholder="productDescription@example.com"
            {...register("productDescription", { required: true })}
          ></textarea>
          <label htmlFor="productDescription">Product Description</label>
        </div>
        {errors.productDescription?.type === "required" && (
          <p className="alert alert-danger">*Product-Description is required</p>
        )}

        {/* file */}
        <div className="form-floating mb-3">
          <input
            type="file"
            className="form-control"
            name="photo"
            id="productImage"
            required
            onChange={onFileSelect}
          />
          <label htmlFor="productImage">Upload file</label>
        </div>

        <button className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
}

export default AddProducts;
