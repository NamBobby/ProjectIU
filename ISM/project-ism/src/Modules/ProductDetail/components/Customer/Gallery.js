import { useState } from 'react';
import Customer1 from '@src/Modules/ProductDetail/assets/images/Customer/Product1-Customer1.png';
import Customer2 from '@src/Modules/ProductDetail/assets/images/Customer/Product1-Customer2.png';
import Customer3 from '@src/Modules/ProductDetail/assets/images/Customer/Product1-Customer3.png';
import Customer4 from '@src/Modules/ProductDetail/assets/images/Customer/Product1-Customer4.png';
import Customer5 from '@src/Modules/ProductDetail/assets/images/Customer/Product1-Customer5.png';
import Customer6 from '@src/Modules/ProductDetail/assets/images/Customer/Product1-Customer6.png';
function Gallery() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageWidth = 328; // Kích thước của mỗi hình ảnh
  const imageDivide = 100; // Kích thước của mỗi hình ảnh

  // Thiết lập sự kiện khi người dùng nhấn vào các liên kết trong image-navigation
  const handleNavigationClick = (index, event) => {
    event.preventDefault();
    const newPosition = index * -(imageWidth - imageDivide);
    const newIndex = Math.abs(index % 6);
    setCurrentPosition(newPosition);
    setActiveIndex(newIndex);
  };

  // Thiết lập sự kiện khi người dùng nhấn vào các hình ảnh trong image-list
  const handleImageClick = (index) => {
    const newPosition = index * -(imageWidth - imageDivide);
    const newIndex = Math.abs(index % 6);
    setCurrentPosition(newPosition);
    setActiveIndex(newIndex);
  };
  

  return (
    <div className="Gallery">
      <div className="slider">
        <h1>Our lovely customer</h1>
        <div className="image-list" style={{ transform: `translateX(${currentPosition}px)` }}>
          <img src={Customer1} alt="" className={activeIndex === 0 ? "active" : ""} onClick={() => handleImageClick(0)} />
          <img src={Customer2} alt="" className={activeIndex === 1 ? "active" : ""} onClick={() => handleImageClick(1)} />
          <img src={Customer3} alt="" className={activeIndex === 2 ? "active" : ""} onClick={() => handleImageClick(2)} />
          <img src={Customer4} alt="" className={activeIndex === 3 ? "active" : ""} onClick={() => handleImageClick(3)} />
          <img src={Customer5} alt="" className={activeIndex === 4 ? "active" : ""} onClick={() => handleImageClick(4)} />
          <img src={Customer6} alt="" className={activeIndex === 5 ? "active" : ""} onClick={() => handleImageClick(5)} />
          <img src={Customer1} alt="" className={activeIndex === 6 ? "active" : ""} onClick={() => handleImageClick(0)} />
        </div>
      </div>
      <div className="image-navigation">
        <a href="#" className={activeIndex === 0 ? "active" : ""} onClick={(event) => handleNavigationClick(0, event)}></a>
        <a href="#" className={activeIndex === 1 ? "active" : ""} onClick={(event) => handleNavigationClick(1, event)}></a>
        <a href="#" className={activeIndex === 2 ? "active" : ""} onClick={(event) => handleNavigationClick(2, event)}></a>
        <a href="#" className={activeIndex === 3 ? "active" : ""} onClick={(event) => handleNavigationClick(3, event)}></a>
        <a href="#" className={activeIndex === 4 ? "active" : ""} onClick={(event) => handleNavigationClick(4, event)}></a>
        <a href="#" className={activeIndex === 5 ? "active" : ""} onClick={(event) => handleNavigationClick(5, event)}></a>
      </div>
    </div>
  );
}

export default Gallery;