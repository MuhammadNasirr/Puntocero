import React, { useState } from "react";
import "./registration.css";

import { auth } from "./config/firebase";

const Registration = () => {
  const [userName, setuserName] = useState("");
  const [administrator, setAdministrator] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function registor() {
    auth.createUserWithEmailAndPassword(email, password)

      .then((user) => {
        console.log(user)


      })
      .catch((error) => {
        console.log(error.message);
        // ..
      });
  }

  return (
    <div className="registor">
      <div className="triangle" />
      <div className="registor_detail">
        <div className="detail">
          <h2>Completa tu registro</h2>
          <div className="detail_input">
            <input type="text" placeholder="Full name with capitle letters" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Create password" />
            <input type="text" placeholder="Administrator's Cve" />
            <input type="text" placeholder="Korea electronics" />
           

            <div className="career__cellPhone">
              <input type="text " placeholder="career" />
              <input type="text" placeholder="cell phone" />
            </div>
            <button className="sumbit_btn">Sumbit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
