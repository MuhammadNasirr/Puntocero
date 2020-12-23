import React from "react";
import "./SignUp.css";

const SignUp = () => {
  function registor(e) {}

  return (
    <div>
      <div className="triangle" />

      <div className="signUp">
        <div className="signUp_box">
          <h2>Bienvenido</h2>
          <form onSubmit={(e) => e.preventDefault()} className="signUp_form">
            <input type="text" placeholder="usuario" />
            <input type="password" placeholder="contraseña" />
            <button onClick={registor}>Regístrate </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
