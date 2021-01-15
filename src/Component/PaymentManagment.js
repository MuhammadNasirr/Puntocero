import React from "react";
import "./Paymentmanagment.css";
import { Link } from 'react-router-dom';

import VaweBackground from "./VaweBackground";

const PaymentManagment = ({ history }) => {

  const params = history.location.state && history.location.state.value
  console.log('params',params)
  return (
    <div className="payment_managment">
      <VaweBackground />
      <div className="payment_form">
        <h1>Capture Your Payment</h1>
        <form>
          <input type="text" placeholder="Type Of Pages"  />
          <input type="text" placeholder="Cientaiomber"  />
          <input type="text" placeholder="Last Digits of The Number"  />
          <input type="text" placeholder="Folio"  />
          <input type="text" placeholder="Quantity"  />
          <input type="text" placeholder="Radio Date"  />
          <input type="text" placeholder="Add Proof"  />
          <button>
            <Link style={{ textDecoration: 'none', color: '#000' }} to={{
              pathname: '/event-add',
              state: {
                value: params
              }
            }}>
              Sumbit
          </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentManagment;
