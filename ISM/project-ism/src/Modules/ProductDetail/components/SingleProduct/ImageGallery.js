import React, { useState } from "react";
import Gallery1 from "@src/Modules/ProductDetail/assets/images/Gallery/Product1-Gallery1.png";
import Gallery2 from "@src/Modules/ProductDetail/assets/images/Gallery/Product1-Gallery2.png";
import Gallery3 from "@src/Modules/ProductDetail/assets/images/Gallery/Product1-Gallery3.png";
import Gallery4 from "@src/Modules/ProductDetail/assets/images/Gallery/Product1-Gallery4.png";
import Gallery5 from "@src/Modules/ProductDetail/assets/images/Gallery/Product1-Gallery5.png";
import Gallery6 from "@src/Modules/ProductDetail/assets/images/Gallery/Product1-Gallery6.png";
import CertificationID from "@src/Modules/ProductDetail/assets/images/Certification/Certification-ID.png";
import CertificationHealth from "@src/Modules/ProductDetail/assets/images/Certification/CertificationHealth.png";

function ImageGallery({ imageList = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleries = [
    Gallery1,
    Gallery2,
    Gallery3,
    Gallery4,
    Gallery5,
    Gallery6,
  ];

  function displayImage() {
    const mainImage = document.querySelector(".main-image img");
    // Change the main image source
    mainImage.src = imageList[currentImageIndex];

    // Remove the active class from all galleries
    const thumbnailElems = document.querySelectorAll(".small-img-row img");
    thumbnailElems.forEach((thumbnailElem) => {
      thumbnailElem.classList.remove("active");
    });

    // Add the active class to the current gallery
    thumbnailElems[currentImageIndex].classList.add("active");
  }

  function goToPreviousImage() {
    setCurrentImageIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = imageList.length - 1;
      }
      return newIndex;
    });
  }

  function goToNextImage() {
    setCurrentImageIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= imageList.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  }

  return (
    <div className="col-2">
      <div className="container">
        <div className="main-image">
          <img
            src={imageList[currentImageIndex]?.url}
            width="100%"
            id="ProductImg"
            alt="Large Image"
          ></img>
        </div>
        <div className="button-container">
          <button id="prev-btn" onClick={goToPreviousImage}>
            <i className="bx bxs-chevron-left"></i>
          </button>
          <button id="next-btn" onClick={goToNextImage}>
            <i className="bx bxs-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="small-img-row">
        {imageList.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail?.url}
            alt=""
            className={index === currentImageIndex ? "active" : ""}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
      {/* <div className="certification">
        <p>
          <img src={CertificationHealth} alt="Certification"></img>100% health
          guarantee for pets
        </p>
        <p>
          <img src={CertificationID} alt="Certification"></img>100% guarantee of
          pet identification
        </p>
      </div> */}
      {/* <div className="contact-box">
        <div className="share-box" style={{ display: "inline-flex" }}>
          <p style={{ display: "inline-flex" }}>
            <i
              className="bx bx-share-alt"
              style={{ display: "inline-flex" }}
            ></i>
            Share:
          </p>
        </div>
        <div className="social" style={{ display: "inline-flex" }}>
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="#">
            <i className="bx bxl-twitter"></i>
          </a>
          <a href="#">
            <i className="bx bxl-youtube"></i>
          </a>
        </div>
      </div> */}
    </div>
  );
}

export default ImageGallery;
