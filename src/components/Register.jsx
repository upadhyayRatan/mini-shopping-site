import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [errorMessage, setErrorMessage] = useState("");
  const alertStyle = {
    color: "#ff1f00c4",
  };
  const navigate = useNavigate();

  useEffect(() => {
    let logInfo = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!logInfo) localStorage.clear();
  });

  const onRegisterFormSubmit = async (userObj) => {
    try {
      setErrorMessage(false);
      //http post request
      let responseObj = await axios.post("/users/register", userObj);
      let payload = responseObj.data;
    } catch (error) {
      let errorMsg = error.response.data.error;
      if (errorMsg) setErrorMessage(true);
      return;
    }
    navigate("/login");
  };

  return (
    <div className="row mt-5">
      <h1 className="mx-auto text-center text-dark registerHeading">
        Register
      </h1>
      <form
        className="col-11 col-sm-8 col-md-6 mx-auto"
        onSubmit={handleSubmit(onRegisterFormSubmit)}
      >
        {/* name */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="name@example.com"
            {...register("name", { required: true, minLength: 3 })}
          />
          <label htmlFor="name">Name</label>
        </div>
        {errors.name?.type === "required" && (
          <p style={alertStyle}>*Name is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p style={alertStyle}>*Minimum length should be 3</p>
        )}

        {/* username */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username@example.com"
            {...register("username", { required: true, minLength: 6 })}
          />
          <label htmlFor="username">Username</label>
        </div>
        {errors.username?.type === "required" && (
          <p style={alertStyle}>*Username is required</p>
        )}
        {errors.username?.type === "minLength" && (
          <p style={alertStyle}>*Minimum length should be 6</p>
        )}

        {/* email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="email@example.com"
            {...register("email", { required: true })}
          />
          <label htmlFor="name">Email</label>
        </div>
        {errors.email?.type === "required" && (
          <p style={alertStyle}>*email is required</p>
        )}

        {/* password */}
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password@example.com"
            {...register("password", { required: true, minLength: 6 })}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errors.password?.type === "required" && (
          <p style={alertStyle}>*Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p style={alertStyle}>*Password minimum length should be 6</p>
        )}

        <div className="text-center">
          <button className=" registerButton">SignUp</button>
        </div>

        <button className="mt-2">
          <NavLink to="/login" className="loginLink">
            already user?
            <br />
            /Sign-in
          </NavLink>
        </button>
      </form>
      {errorMessage ? (
        <p className="text-center mx-auto" style={alertStyle}>
          Email-id already exists
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Register;
