import React, { useEffect, useState } from "react";
import "./UserImageUpload.css";

import VaweBackground from "./VaweBackground";
import UploadIMG from "./UploadIMG";
import { Link } from "react-router-dom";

const UserImageUpload = ({ user, userName, url }) => {
  const [imgUri, setimgUri] = useState({});
  const [Url, setUrl] = useState("");

  const img = async () => {
    setUrl(await url);
  };
  useEffect(() => {
    img();
  }, [url]);
  console.log(url);

  return (
    <div className="user_image_upload">
      <VaweBackground />
      <div className="central_content">
        <div className="content_1">
          <UploadIMG user={user} userName={userName} Url={url} />

          <Link to={"/central-information"} className="select_event">
            <button >Selecciona evento </button>
          </Link>
        </div>
      </div>
      I
    </div>
  );
};

export default UserImageUpload;
