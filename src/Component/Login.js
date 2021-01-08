import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./config/firebase";
import "./Login.css";
import BG from "./Assets/bg_logo.png";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const signIn = (e) => {
    e.preventDefault()
    if (!email == "" && !password == "") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log("logged in");
        })
        .catch((error) => {
          // seterror(error)
          alert(error.message)
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
          <h2>bienvenida</h2>
          <form onSubmit={signIn} className="sign_in_form">
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <input
              type="Password"
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <button>registrarse</button>
          </form>
          <div className="registor_link">
            <p>no tener cuenta ?</p>
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
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
