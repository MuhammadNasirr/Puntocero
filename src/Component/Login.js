import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./config/firebase";
import "./Login.css";
import BG from "./Assets/bg_logo.png";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signIn = () => {
    if (!email == "" && !password == "") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("logged in");
        })
        .catch((error) => {
          alert(error.code);
        });

      setpassword("");
      setemail("");
    } else {
      alert("nnnn");
    }
  };

  return (
    <div className="login">
      <div className="vawe_bg">
        <img src={BG} alt="" />
      </div>

      <div className="sign_in">
        <div className="sign_in_box">
          <h2>Wellcome</h2>
          <form onSubmit={(e) => e.preventDefault()} className="sign_in_form">
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="Password"
              value={password}
              placeholder="Password"
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
