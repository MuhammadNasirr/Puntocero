import React, { useEffect, useState } from "react";
import "./App.css";

import Login from "./Component/Login";
import Registration from "./Component/Registration";
import UserImageUpload from "./Component/UserImageUpload";
import CentralWindow from "./Component/CentralWindow";
import PaymentManagment from "./Component/PaymentManagment"
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  CentralInfo
} from './Container'
import { auth, db } from "./Component/config/firebase";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
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

  const addEvent = async () => {
    const dbRef = (await db.ref(`Table/Event2/`).push()).key;
    db.ref(`Table/Event2/` + dbRef).set({
      name: 'Pista 2',
      uid: dbRef,
      price: 100,
      held: '',
      created_at: Date.now(),
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/melini-business.appspot.com/o/images%2FJBkMcg30o0ZFWDWpfo2UMfca0jB2?alt=media&token=63704c59-97f3-45d6-b3a7-d814accec3c0",
      adultTicket: 10,
      kidTicket: 0,
    })
  };

  const onSignout = async () => {
    await auth.signOut()
    setuser(null)
  }

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
  // setInterval(() => {
  //   addEvent()
  // }, 200);

  console.log(userData);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" >
          {loading ? (
            "Loading....."
          ) : user ? (
            <CentralWindow
              url={userData?.image?.imgUri}
              history={history}
              onSignout={onSignout}
              userName={userData?.UserName}
            />
          ) : (
                <Login />
              )}
        </Route>
        <Route exact path="/upload_image">
          <UserImageUpload
            user={user}
            history={history}
            userName={userData?.UserName}
            url={userData?.image?.imgUri}
          />
        </Route>
        <Route path="/event-add" history={history} component={Home} />
        <Route exact path="/central-information" >
          <CentralInfo
            user={user}
            history={history}
            userName={userData?.UserName}
            url={userData?.image?.imgUri}
          />
        </Route>
        <Route path="/registor_form" history={history} component={Registration} />
        <Route path="/payment_managment_system" history={history} component={PaymentManagment} />

      </Switch>
    </Router>
  );
}

export default App;
