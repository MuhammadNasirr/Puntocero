import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./config/firebase";
import "./Login.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("logged in");
      })
      .catch((error) => {
        alert(error.message);
      });
      
      setpassword("")
      setemail("")
  };

  return (
    <div>
      <div className="triangle" />

      <div className="signUp">
        <div className="signUp_box">
          <h2>Wellcome</h2>
          <form onSubmit={(e) => e.preventDefault()} className="signUp_form">
            <input
              type="text"
              value={email}
              placeholder="user name"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>
          </form>
          <div className="registor_link">
            <p>not have account ?</p>
            <Link
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "none",
                fontSize: 12,
                marginLeft: 5,
              }}
              to="/registor_form"
            >
              Registor Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
