import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [authInput, changeAuthInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [passwordType, changePasswordType] = useState("password");
  const showPass = (e) => {
    const checked = e.target.checked;
    if (checked) {
      changePasswordType("text");
    } else {
      changePasswordType("password");
    }
  };
  const onChange = (e) => {
    changeAuthInput({ ...authInput, [e.target.name]: e.target.value });
  };
  const registerUser = async (e) => {
    e.preventDefault();
    const data = {
      name: authInput.name,
      email: authInput.email,
      password: authInput.password,
    };
    await fetch("https://todolistbackend-e7ju.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((value) => {
        return value.json();
      })
      .then((response) => {
        if (response.success) {
          props.showAlert("success", "You are successfully Registered");
          localStorage.setItem("token", response.authToken);
          navigate("/");
        } else {
          props.showAlert("warning", "Something went wrong");
          navigate("/login");
        }
      });
  };
  return (
    <>
      <div className="container my-5">
        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={authInput.name}
              onChange={onChange}
              required
              minLength={2}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              autoComplete="on"
              value={authInput.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={passwordType}
              className="form-control"
              id="password"
              name="password"
              autoComplete="off"
              value={authInput.password}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type={passwordType}
              className="form-control"
              id="cpassword"
              name="cpassword"
              autoComplete="off"
              value={authInput.cpassword}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={showPass}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show password
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Sing-Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
