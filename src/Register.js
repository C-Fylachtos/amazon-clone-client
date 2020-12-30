import { InfoSharp } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {
            setError([]);
            history.push("/");
          }
        })
        .catch((err) => setError([...error, err]));
    } else {
      setError([
        ...error,
        { message: "Password and Confirm Password dont match" },
      ]);
    }
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          className="register__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>
      <div className="register__container">
        <h1>Sign In</h1>
        <form onSubmit={handleRegister}>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError([]);
            }}
          ></input>
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError([]);
            }}
          ></input>
          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError([]);
            }}
          ></input>
          <button className="register__registerButton" type="submit">
            Create your Amazon Account
          </button>
          {error.length > 0
            ? error.map((err) => (
                <p className="register__showError">{err.message}</p>
              ))
            : null}
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
    </div>
  );
}

export default Register;
