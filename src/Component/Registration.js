import React from "react";
import "./registration.css";

const Registration = () => {
  return (
    <div className="registor">
      <div className="triangle" />
      <div className="registor_detail">
        <div className="detail">
          <h2>Completa tu registro</h2>
          <div className="detail_input">
            <input type="text" placeholder="Full name with capitle letters" />
            <input type="text" placeholder="Administrator's Cve" />
            <input type="text" placeholder="Korea electronics" />
            <div className="career__cellPhone">
              <input type="text " placeholder="career" />
              <input type="text" placeholder="cell phone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
