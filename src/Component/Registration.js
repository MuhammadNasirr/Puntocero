import React, { useEffect, useState } from "react";
import "./registration.css";
import BG from "./Assets/bg_logo.png";

import { auth, db } from "./config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Registration = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [major, setMajor] = useState("");
  const [DoB, setDoB] = useState("");
  const [phone, setphone] = useState("");
  const [career, setcareer] = useState("");
  const [generatedCode, setgeneratedCode] = useState("");
  const [loading, setloading] = useState(false);

  // Auto generatted Code function
  useEffect(() => {
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    setgeneratedCode(makeid(6));
  }, []);

  // registor function sending data on firebase

  function registor() {
    setloading(true);
    if (
      !userName == "" &&
      !phone == "" &&
      !DoB == "" &&
      !major == "" &&
      !career == ""
    ) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          var User = user.user;
          db.ref("User/" + User.uid).set({
            UserName: userName,
            Email: User.email,
            Major: major,
            DoB: DoB,
            Code: generatedCode,
          });
        })
        .catch((error) => {
          alert(error.message);
          setloading(false);
          // ..
        });
    }

    setemail("");
    setDoB("");
    setMajor("");
    setgeneratedCode("");
    setpassword("");
    setuserName("");
    setcareer("");
    setphone("");
  }

  return (
    <div className="registor">
      <div className="vawe_bg_registor">
        <img src={BG} alt="" />
      </div>
      <div className="registor_detail">
        <div className="detail">
          <h2>Completa tu registro</h2>
          <div className="detail_input">
            <input
              className="user_name"
              type="text"
              value={userName}
              placeholder="Full name with capitle letters"
              onChange={(e) => setuserName(e.target.value)}
            />
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Create password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <input type="text" value={generatedCode} />

            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Major"
            />
            <input
              type="date"
              name="begin"
              placeholder="dd-mm-yyyy"
              value={DoB}
              onChange={(e) => setDoB(e.target.value)}
            />

            <div className="career__cellPhone">
              <input
                type="text "
                value={career}
                placeholder="Career"
                onChange={(e) => setcareer(e.target.value)}
              />
              <input
                type="number"
                value={phone}
                placeholder="Cell Phone"
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
            <button
              className="sumbit_btn"
              onClick={registor}
              disabled={loading}
            >
              {loading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  pulse
                  style={{ marginRight: 5, fontSize: 15 }}
                />
              )}
              Sumbit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
