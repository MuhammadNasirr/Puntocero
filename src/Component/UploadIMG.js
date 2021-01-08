import React, { useEffect, useState } from "react";
import { storage, db } from "./config/firebase";
import "./UploadIMG.css";
import DefaultImage from "./Assets/default-user-image.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UploadIMG = ({ user, userName, Url }) => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [loading, setloading] = useState(false);

  const handleImageAsFile = (e) => {
    const image =  e.target.files[0] ;
    setImageAsFile(() => image);

  };

  const handleFirebaseUpload = (e) => {
    e.preventDefault();

    setloading(true)
    // async magic goes here...
    if (imageAsFile === "") {
      // console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage.ref(`/images/${user?.uid}/`).put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
      },
      (err) => {
        //catches the errors
      },
      async () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        await storage
          .ref("images")
          .child(user.uid)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl(fireBaseUrl);
          });
      }
    );
  }

 

  useEffect(async () => {
    if (imageAsUrl) {
      await db.ref(`User/`).child(`${user.uid}/image`).set({
        imgUri: imageAsUrl,
      }).then(()=>{ 
        setloading(false)
       
      });
    }
  }, [imageAsUrl]);

  return (
    <div className="user_img">
       {loading ? (
              <div className="loader">
                  <FontAwesomeIcon
                  icon={faSpinner}
                  pulse
                  style={{ marginTop: 30,
                    alignSelf:"center",
                    fontSize: 15 }}
                />
              </div>
              ): (
                <img src={Url ? Url : DefaultImage} alt="upload image" />
              )}
      
      <form className="img_upload_form" onSubmit={handleFirebaseUpload}>
        <input type="file" accept="image/*"  onChange={handleImageAsFile} />
        <button disabled={loading}>Done !</button>
      </form>
      <h3>{userName}</h3>
    </div>
  );
};

export default UploadIMG;
