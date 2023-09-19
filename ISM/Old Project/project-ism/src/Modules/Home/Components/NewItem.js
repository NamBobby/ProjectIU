import React from "react";

// @svg and img
import imageText from "../assets/images/image-2-9@2x.png";

const NewItem = ({ data }) => {
  // console.log("Data", data);
  const { title, description, content } = data || {};
  return (
    <div className="new-content">
      <div className="new-content__img">
        <img src={imageText} alt="new-img" className="new-img" />
      </div>
      <div className="new-content__info">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default NewItem;
