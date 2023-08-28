import React from "react";

const product = () => {
  return (
    <>
      <div class="single-product">
        <div class="col-2">
          <div class="container">
            <div class="main-image">
              <img
                src="TEST/images/gallery-1.jpg"
                width="100%"
                id="ProductImg"
                alt="Large Image"
              ></img>
            </div>
            <div class="button-container">
              <button id="prev-btn">
                <i class="bx bxs-chevron-left"></i>
              </button>
              <button id="next-btn">
                <i class="bx bxs-chevron-right"></i>
              </button>
            </div>
          </div>
          <div class="small-img-row">
            <img
              src="TEST/images/gallery-1.jpg"
              width="100%"
              alt="Thumbnail 1"
            ></img>
            <img
              src="TEST/images/gallery-2.jpg"
              width="100%"
              alt="Thumbnail 2"
            ></img>
            <img
              src="TEST/images/gallery-3.jpg"
              width="100%"
              alt="Thumbnail 3"
            ></img>
            <img
              src="TEST/images/gallery-4.jpg"
              width="100%"
              alt="Thumbnail 4"
            ></img>
            <img
              src="TEST/images/gallery-4.jpg"
              width="100%"
              alt="Thumbnail 5"
            ></img>
            <img
              src="TEST/images/gallery-4.jpg"
              width="100%"
              alt="Thumbnail 6"
            ></img>
            <img
              src="TEST/images/gallery-4.jpg"
              width="100%"
              alt="Thumbnail 7"
            ></img>
          </div>
          <div class="certification">
            <p>
              <i class="bx bxs-heart"></i>100% health guarantee for pets
            </p>
            <p>
              <i class="bx bxs-dog"></i>100% guarantee of pet identification
            </p>
          </div>
          <div class="contact-box">
            <div class="share-box" style="display: inline-flex;">
              <p style="display: inline-flex;">
                <i class="bx bx-share-alt" style="display: inline-flex;"></i>
                Share:
              </p>
            </div>
            <div class="social" style="display: inline-flex;">
              <a href="#">
                <i class="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i class="bx bxl-instagram"></i>
              </a>
              <a href="#">
                <i class="bx bxl-twitter"></i>
              </a>
              <a href="#">
                <i class="bx bxl-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-22">
          <div class="breadcrumbs">
            <a href="#">Home</a>
            <a href="#">Dog</a>
            <a href="#">Large Dog</a>
            <a href="#">Shiba Inu Sepia</a>
          </div>
          <h5>SKU #1000078</h5>
          <h1>Shiba Inu Sepia</h1>
          <h4>34.000.000 VND</h4>
          <div class="button-group">
            <button>Add to Cart</button>
            <input type="number" value="1" min="1"></input>
          </div>
          <table class="product-description">
            <tr>
              <td>SKU</td>
              <td>: #1000078</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>: Female</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>: 2 Months</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>: Small</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>: Appricot & Tan</td>
            </tr>
            <tr>
              <td>Vaccinated</td>
              <td>: Yes</td>
            </tr>
            <tr>
              <td>Dewormed</td>
              <td>: Yes</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>: Vietnam</td>
            </tr>
            <tr>
              <td>Published Date</td>
              <td>: 12-OCt-2022</td>
            </tr>
            <tr>
              <td>Additional Information</td>
              <td>
                : Pure breed Shih Tzu. Good body structure. With MKA cert and
                Microchip. Father from champion lineage.
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="Gallery">
        <div class="slider">
          <h1>Our lovely customer</h1>
          <div class="image-list">
            <a>
              <img src="TEST/images/product-1.jpg" alt="" class="active"></img>
            </a>
            <a>
              <img src="TEST/images/product-2.jpg" alt=""></img>
            </a>
            <a>
              <img src="TEST/images/product-3.jpg" alt=""></img>
            </a>
            <a>
              <img src="TEST/images/product-4.jpg" alt=""></img>
            </a>
            <a>
              <img src="TEST/images/product-5.jpg" alt=""></img>
            </a>
            <a>
              <img src="TEST/images/product-6.jpg" alt=""></img>
            </a>
          </div>
        </div>
        <div class="image-navigation">
          <a href="#" class="active"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
        </div>
      </div>
      <div class="offer">
        <div class="small-container">
          <h3>Whats new?</h3>
          <h1>See More Puppies</h1>
          <div class="frames-container">
            <div class="frame">
              <div class="col-4">
                <img src="TEST/images/product-9.jpg"></img>
              </div>
              <div class="row">
                <div class="row-text">
                  <h1 class="name">MO231 - Pomeranian White</h1>
                  <div class="row-description">
                    <div class="first-des">
                      <p class="thh">Gene:</p>
                      <p class="tdd">Male </p>
                    </div>
                    <div class="dot"></div>
                    <div class="second-des">
                      <p class="thh">Age:</p>
                      <p class="tdd">02 months</p>
                    </div>
                  </div>
                  <h1 class="price">6.900.000 VND</h1>
                </div>
              </div>
            </div>

            <div class="frame">
              <div class="col-4">
                <img src="TEST/images/product-8.jpg"></img>
              </div>
              <div class="row">
                <div class="row-text">
                  <h1 class="name">MO502 - Poodle Tiny Yellow</h1>
                  <div class="row-description">
                    <div class="first-des">
                      <p class="thh">Gene:</p>
                      <p class="tdd">Female</p>
                    </div>
                    <div class="dot"></div>
                    <div class="second-des">
                      <p class="thh">Age:</p>
                      <p class="tdd">02 months</p>
                    </div>
                  </div>
                  <h1 class="price">3.900.000 VND</h1>
                </div>
              </div>
            </div>

            <div class="frame">
              <div class="col-4">
                <img src="TEST/images/product-10.jpg"></img>
              </div>
              <div class="row">
                <div class="row-text">
                  <h1 class="name">MO102 - Poodle Tiny Sepia</h1>
                  <div class="row-description">
                    <div class="first-des">
                      <p class="thh">Gene:</p>
                      <p class="tdd">Male </p>
                    </div>
                    <div class="dot"></div>
                    <div class="second-des">
                      <p class="thh">Age:</p>
                      <p class="tdd">02 months</p>
                    </div>
                  </div>
                  <h1 class="price">4.000.000 VND</h1>
                </div>
              </div>
            </div>

            <div class="frame">
              <div class="col-4">
                <img src="TEST/images/product-11.jpg"></img>
              </div>
              <div class="row">
                <div class="row-text">
                  <h1 class="name">MO512 - Alaskan Malamute Grey</h1>
                  <div class="row-description">
                    <div class="first-des">
                      <p class="thh">Gene:</p>
                      <p class="tdd">Male </p>
                    </div>
                    <div class="dot"></div>
                    <div class="second-des">
                      <p class="thh">Age:</p>
                      <p class="tdd">02 months</p>
                    </div>
                  </div>
                  <h1 class="price">8.900.000 VND</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#" class="scroll-top">
        <i class="bx bxl-messenger"></i>
      </a>

      <div class="end-text">
        <p>� late 2022 Tahmid Ahmed. All Rights Reserved.</p>
      </div>
    </>
  );
};
export default product;
