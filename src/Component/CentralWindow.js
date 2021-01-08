import React from "react";
import VaweBackground from "./VaweBackground";
import "./CentralWindow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CentralWindow = ({ userName, url }) => {
  return (
    <div className="central_window">
      <VaweBackground />
      <div className="content">
        <div className="section_1">
          <div className="user_img">
            {url ? (
              <img src={url} alt="upload image" />
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                pulse
                style={{ marginTop: 30, alignSelf: "center", fontSize: 35 }}
              />
            )}
            <h3>{userName}</h3>
          </div>
          <div className="trade_mark"></div>
        </div>
        <div className="section_2">
          <div className="triangle" />
          <div className="payment_section">
            <div className="total_amount">
              <h3>Total a pagar</h3>
              <input type="number" />
            </div>
            <div className="total_diposit">
              <h3>Total a abonado</h3>
              <input type="number" />
            </div>
          </div>
        </div>
        <button> Systema de gestion de pagos</button>
      </div>
    </div>
  );
};

export default CentralWindow;
