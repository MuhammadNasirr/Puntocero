import React from "react";
import "./Paymentmanagment.css";

import VaweBackground from "./VaweBackground";

const PaymentManagment = () => {
  return (
    <div className="payment_managment">
      <VaweBackground />
      <div className="payment_form">
        <h1>Capture Your Campus</h1>
        <form>
          <input type="text" placeholder="Type Of Pages" required />
          <input type="text" placeholder="Cientaiomber" required />
          <input type="text" placeholder="Last Digits of The Number" required />
          <input type="text" placeholder="Folio" required />
          <input type="text" placeholder="Quantity" required />
          <input type="text" placeholder="Radio Date" required />
          <input type="text" placeholder="Add Proof" required />
          <button>Sumbit</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentManagment;
