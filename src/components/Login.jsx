import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [authInput, changeAuthInput] = useState({ email: "", password: "" });
    const [passwordType, changePasswordType] = useState("password");
    const showPass = (e) => {
        const checked = e.target.checked;
        if (checked) {
            changePasswordType("text");
        } else {
            changePasswordType("password");
        }
    };
    const loginUser = async (e) => {
        e.preventDefault();
        const data = {
            email: authInput.email,
            password: authInput.password,
        };
        await fetch("https://todolistbackend-e7ju.onrender.com/api/auth/login", {
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
                    localStorage.setItem("token", response.authToken);
                    props.showAlert("success", "You are successfully Logged in");
                    navigate("/");
                } else {
                    props.showAlert("danger", "Invalid credentials");
                }
            });
    };

    const onChange = (e) => {
        changeAuthInput({ ...authInput, [e.target.name]: e.target.value });
    };
    return (
        <div className="container mt-5">
            <form onSubmit={loginUser}>
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
                    LogIn
                </button>
            </form>
        </div>
    );
};

export default Login;
