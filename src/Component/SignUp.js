import React from "react";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div>
      <div className="triangle" />

      <div className="signUp">
        <div className="signUp_box">
          <h2>Bienvenido</h2>
          <form onSubmit={(e) => e.preventDefault()} className="signUp_form">
            <input type="text" placeholder="user name"/>
            <input type="password" placeholder="password" />
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
