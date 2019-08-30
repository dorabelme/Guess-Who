import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
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
        <div className="form-box">
          <label className="label">Confirm:</label>
          <Field
            className="input"
            name="passwordConfirm"
            type="password"
            autoComplete="off"
          />
          <p>{touched.password && errors.password}</p>
        </div>
        <button type="submit" className="btn">
          {" "}
          Register
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
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6)
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is required")
  }),
  handleSubmit(values, formikBag) {
    formikBag.props.getSignup(values);
  }
})(Register);
