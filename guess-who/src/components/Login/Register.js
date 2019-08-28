import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import "./login.scss";

import Navbar from "../Navbar/Navbar";

function Register({ touched, errors }) {
  return (
    <div className="loginPage">
      <Navbar />
      <Form className="form registerForm">
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
       <button type="submit" className="btn"> Register
        </button>
      </Form>
      <div className="login-redirect">
        <h4>
          By registering, you automatically accept the Terms and Policies of
          Guess Who app.
        </h4>
        <Link className="login-link" to="/">
          Have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6)
      .required("Password is required"),
  }),
  handleSubmit(values, formikBag) {
    const url = "https://lambda-guess-who.herokuapp.com/api/auth/register";
    axiosWithAuth()
      .post(url, values)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        formikBag.props.history.push("/guesswho");
      })
      .catch(e => {
        console.log(e.response);
      });
  }
})(Register);
