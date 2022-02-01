import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth } from "../helpers";
import { login } from "../services/auth";
// import crypto from "crypto-js";

const Login = ({ location }) => {
  const [email, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(auth.checkIfAuthenticated);

  const handleLogin = (event) => {
    event.preventDefault();
    let canSubmit = true;

    if (email.trim() === "") {
      setErrors({ ...errors, email: true });
      canSubmit = false;
    }
    // if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
    //   setErrors({ ...errors, email: true });
    //   canSubmit = false;
    // }

    if (password.trim() === "") {
      setErrors((state) => {
        return { ...state, password: true };
      });
      canSubmit = false;
    }

    if (canSubmit) {
      const formData = {
        username: email,
        password,
      };

      dispatch(
        login(formData),
        () => {
          location.pathname("/");
        },
        (error) => {}
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid">
      <div className="login-container">
        <div className="card login-form bg-light col-md-8">
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setIdentification(e.target.value);
                      setErrors({ ...errors, email: false });
                    }}
                    value={email}
                    id="email"
                    placeholder="Enter username"
                    className={
                      errors.email
                        ? "error form-control login-textfield"
                        : "form-control login-textfield"
                    }
                  />
                  <span
                    className={`login-error-msgField ${
                      errors.email && "show-error-msgField"
                    }`}
                  >
                    Please enter valid email!
                  </span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: false });
                    }}
                    value={password}
                    className={
                      errors.password ? "error form-control" : "form-control"
                    }
                    placeholder="Password"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin(e);
                      }
                    }}
                  />
                  <span
                    className={`login-error-msgField ${
                      errors.password && "show-error-msgField"
                    }`}
                  >
                    Please enter valid password!
                  </span>
                </div>
              </div>
              <div className="login-button">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-outline-primary"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
