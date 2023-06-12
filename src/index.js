import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Register from "./components/Register";
import { Provider } from "react-redux";
import store from "../src/redux-store/store";
import Login from "./components/Login";
import Home from "./components/Home";
import {
  RouterProvider
} from "react-router-dom";
import routes from "./components/Routing";
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
