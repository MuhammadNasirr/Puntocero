import React, { useEffect, useState } from "react";
import "./App.css";

import Login from "./Component/Login";
import Registration from "./Component/Registration";
import UserImageUpload from "./Component/UserImageUpload";
import CentralWindow from "./Component/CentralWindow";
import PaymentManagment from "./Component/PaymentManagment"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth, db } from "./Component/config/firebase";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [user, setuser] = useState(null);
  const [userData, setuserData] = useState({});
  const [loading, setloading] = useState(true);

  const getDataFromDB = async () => {
    const dbRef = db.ref(`User/`).child(`${user?.uid}`);

    dbRef.on("value", (snapshot) => {
      setuserData(snapshot.val());
    });
  };

  useEffect(async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
        setloading(false);
      } else {
        setloading(false);
      }
    });
    getDataFromDB();
  }, [user]);

  console.log(userData);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loading ? (
            "Loading....."
          ) : user ? (
            <CentralWindow
              url={userData?.image?.imgUri}
              userName={userData?.UserName}
            />
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path="/upload_image">
          <UserImageUpload
            user={user}
            userName={userData?.UserName}
            url={userData?.image?.imgUri}
          />
        </Route>
        <Route path="/registor_form" component={Registration} />
        <Route path="/payment_managment_system" component={PaymentManagment} />

      </Switch>
    </Router> 
  );
}

export default App;
