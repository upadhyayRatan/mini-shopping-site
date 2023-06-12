import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux-store/userReducer";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const alertStyle = {
    color: "#ff1f00c4",
  };
  let dispatch = useDispatch();
  let [errorMessage, setErrorMessage] = useState(false);
  let { isSuccess } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    let logInfo = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!logInfo) localStorage.clear();
  }, []);

  //on Login form submit
  const onLoginFormSubmit = async (userObj) => {
    try {
      dispatch(userLogin(userObj));
    } catch (error) {
      let errorMsg = error.response.data;
      if (errorMsg) setErrorMessage(true);
    }
  };

  useEffect(() => {
    if (isSuccess === true) {
      console.log("Login successfull");
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="row mt-5 ">
      {/* {isLoading && <h3 className="text-center text-danger">Loading...</h3>} */}

      <h1 className="mx-auto text-dark text-center loginHeading ">
        Login Your Account
      </h1>

      <form
        className="col-11 col-sm-8 col-md-6 mx-auto"
        onSubmit={handleSubmit(onLoginFormSubmit)}
      >
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
        {/* {invalidLoginMessage && <p className="alert alert-danger">{invalidLoginMessage}</p>} */}
        {errors.password?.type === "required" && (
          <p style={alertStyle}>*Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p style={alertStyle}>*Minimum length should be 6</p>
        )}
        <div className="text-center">
          <button className="loginButton">Login</button>{" "}
        </div>
      </form>
      {errorMessage ? (
        <p className="text-center mx-auto mt-5" style={alertStyle}>
          Invalid credentials
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
