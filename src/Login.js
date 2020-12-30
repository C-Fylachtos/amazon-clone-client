import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          setError([]);
          history.push("/");
        }
      })
      .catch((err) => setError([...error, err]));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
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
          <button
            type="submit"
            className="login__signInButton"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          {error.length > 0
            ? error.map((err) => (
                <p className="login__showError">{err.message}</p>
              ))
            : null}
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <Link to="/register">
          <button className="login__registerButton">
            Create your Amazon Account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
