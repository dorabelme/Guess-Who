import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import "./login.scss";

import Navbar from "../Navbar/Navbar";

function Login({ touched, errors }) {
  return (
    <div className="loginPage">
      <Navbar />
      <Form className="form">
        <div className="form-box">
          <label className="label">Username:</label>
          <Field
            className="input"
            name="username"
            type="text"
            autoComplete="off"
          />
          <p>{touched.username && errors.username}</p>
        </div>
        <div className="form-box">
          <label className="label">Password:</label>
          <Field
            className="input"
            name="password"
            type="password"
            autoComplete="off"
          />
          <p>{touched.password && errors.password}</p>
        </div>
        <button type="submit" className="btn">
          Sign In
        </button>
        <div className="login-redirect">
          <Link className="login-link" to="/register">
            New User? Register Here
          </Link>
        </div>
      </Form>
    </div>
  );
}
export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6)
      .required("Password is required")
  }),
  handleSubmit(values, formikBag) {
    formikBag.props.getLogin(values);
    // const url = "https://lambda-guess-who.herokuapp.com/api/auth/login";
    // axiosWithAuth()
    //   .post(url, values)
    //   .then(res => {
    //     console.log(res);
    //     localStorage.setItem("token", res.data.token);
    //     formikBag.props.history.push("/guesswho");
    //   })
    //   .catch(e => {
    //     console.log(e.response);
    //   });
  }
})(Login);
