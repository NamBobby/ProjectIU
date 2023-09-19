import "../bootstrap.scss";
import "../responsive.scss";
import "./homepage.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCodeLanguage } from "@store/common/selectors";
import queryString from "query-string";
import { getDataHomeAction } from "@Modules/Home/Store/actions";
import {
  getDataHome,
  getLoadingDataHomeSelector,
} from "@Modules/Home/Store/selectors";
import { useHistory, useLocation } from "react-router";
import image_2 from "../assets/images/image-2@2x.png";
import banner from "../assets/images/herro-banner.png";

import imageText from "../assets/images/image-2-9@2x.png";

// @service
import { getListProducts } from "../Store/service";

const Home = () => {
  useEffect(() => {
    fetchGetListProducts();
  }, []);

  const fetchGetListProducts = async () => {
    try {
      const res = await getListProducts({
        page: 1,
        size: 6,
      });
      console.log("res", res);
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
    }
  };

  return (
    <form className="homepage screen" name="form1" action="form1" method="post">
      <a href="javascript:SubmitForm('form1')">
        <img
          className="herro-banner bp1-animate-enter "
          src={banner}
          alt="herro-banner"
        />
      </a>
      {/* <div className="frame52">
        <div className="flex-row">
          <div className="frame">
            <div className="what-news valign-text-bottom svn-gilroy-medium-black-16px">
              What's news?
            </div>
            <p className="take-a-look valign-text-bottom svn-gilroy-bold-prussian-blue-24px">
              {" "}
              Take a look at our news pets
            </p>
          </div>
          <div className="button-m button ">
            <div className="click-btn valign-text-bottom svn-gilroy-medium-prussian-blue-14px">
              {" "}
              View More &gt;
            </div>
          </div>
          <div className="flex-row-1 flex-row-3">
            <div className="product-card product-8">
              <div className="frame-7">
                <img className="image-2" src={image_2} alt="dog1" />
              </div>
              <div className="frame-15">
                <div className="frame-14">
                  <div className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                    MO-231 - Pomeranian White
                  </div>
                  <div className="frame-12">
                    <div className="frame-1">
                      <div className="gene svn-gilroy-medium-nevada-12px">
                        Gene:
                      </div>
                      <div className="gender svn-gilroy-bold-nevada-12px">
                        Male
                      </div>
                    </div>
                    <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                    <div className="frame-1">
                      <div className="age svn-gilroy-medium-nevada-12px">
                        {" "}
                        Age:
                      </div>
                      <div className="address svn-gilroy-bold-nevada-12px">
                        02 months
                      </div>
                    </div>
                    <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                      {" "}
                      5.000.000 VND
                    </div>
                  </div>
                </div>
              </div>
              <div className="overlap-group">
                <div className="product-card-1 product-card-3">
                  <div className="frame-7">
                    <img className="image-2" src={image_2} alt="img-2" />
                  </div>
                  <div className="frame-15">
                    <div className="frame-14">
                      <p className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                        MB052 - Poodle Tiny
                      </p>
                      <div className="frame-12">
                        <div className="frame-1">
                          <div className="gene svn-gilroy-medium-nevada-12px">
                            Gene:
                          </div>
                          <div className="gender svn-gilroy-bold-nevada-12px">
                            Female
                          </div>
                        </div>
                        <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                        <div className="frame-1">
                          <div className="age svn-gilroy-medium-nevada-12px">
                            Age:
                          </div>
                          <div className="address svn-gilroy-bold-nevada-12px">
                            02 months
                          </div>
                        </div>
                      </div>
                      <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                        3.900.000 VND
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="image"
                  src="../assets/images/image-2-9@2x.png"
                  alt="dog2"
                />
              </div>
              <div className="overlap-group">
                <div className="product-card-1 product-card-3">
                  <div className="frame-7">
                    <img className="image-2" src={image_2} alt="dog" />
                  </div>
                  <div className="frame-15">
                    <div className="frame-14">
                      <p className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                        M012 - Poddle
                      </p>
                      <div className="frame-12">
                        <div className="frame-1">
                          <div className="gene svn-gilroy-medium-nevada-12px">
                            Gene:
                          </div>
                          <div className="gender svn-gilroy-bold-nevada-12px">
                            Male
                          </div>
                        </div>
                        <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                        <div className="frame-1">
                          <div className="age svn-gilroy-medium-nevada-12px">
                            Age:
                          </div>
                          <div className="address svn-gilroy-bold-nevada-12px">
                            {" "}
                            05 months
                          </div>
                        </div>
                      </div>
                      <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                        5.000.000 VND
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="image"
                  src="../assets/images/image-3@2x.png"
                  alt="dog"
                />
              </div>
              <div className="overlap-group">
                <div className="product-card-1 product-card-3">
                  <div className="frame-7">
                    <img className="image-2" src={image_2} alt="dog" />
                  </div>
                  <div className="frame-15">
                    <div className="frame-14">
                      <p className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                        M056 - Alaska Malamute Grey
                      </p>
                      <div className="frame-12">
                        <div className="frame-1">
                          <div className="gene svn-gilroy-medium-nevada-12px">
                            Gene:
                          </div>
                          <div className="gender svn-gilroy-bold-nevada-12px">
                            Male
                          </div>
                        </div>
                        <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                        <div className="frame-1">
                          <div className="age svn-gilroy-medium-nevada-12px">
                            Age:
                          </div>
                          <div className="address svn-gilroy-bold-nevada-12px">
                            {" "}
                            02 months
                          </div>
                        </div>
                      </div>
                      <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                        8.900.000 VND
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="image"
                  src="../assets/images/image-4-1@2x.png"
                  alt="dog"
                />
              </div>
            </div>
            <div className="overlap-group-container">
              <div className="overlap-group">
                <div className="product-card-1 product-card-3">
                  <div className="frame-7">
                    <img className="image-2" src={image_2} alt="dog" />
                  </div>
                  <div className="frame-15">
                    <div className="frame-14">
                      <p className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                        M0231 - Pembroke Corgi Cream
                      </p>
                      <div className="frame-12">
                        <div className="frame-1">
                          <div className="gene svn-gilroy-medium-nevada-12px">
                            Gene:
                          </div>
                          <div className="gender svn-gilroy-bold-nevada-12px">
                            Male
                          </div>
                        </div>
                        <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                        <div className="frame-1">
                          <div className="age svn-gilroy-medium-nevada-12px">
                            Age:
                          </div>
                          <div className="address svn-gilroy-bold-nevada-12px">
                            02 months
                          </div>
                        </div>
                      </div>
                      <div className="price-1 valign-text-bottom svn-gilroy-bold-swamp-14px">
                        <span>
                          <span className="span0 svn-gilroy-bold-swamp-14px">
                            7.
                          </span>
                          <span className="span1 svn-gilroy-bold-swamp-14px">
                            9
                          </span>
                          <span className="span2 svn-gilroy-bold-swamp-14px">
                            00.000 VND
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="image"
                  src="../assets/images/image-5@2x.png"
                  alt="dog"
                />
              </div>
              <div className="overlap-group">
                <div className="product-card-1 product-card-3">
                  <div className="frame-7">
                    <img className="image-2" src={image_2} alt="dog" />
                  </div>
                  <div className="frame-15">
                    <div className="frame-14">
                      <p className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                        M053 - Pembroke Corgi Tricolor
                      </p>
                      <div className="frame-12">
                        <div className="frame-1">
                          <div className="gene svn-gilroy-medium-nevada-12px">
                            Gene:
                          </div>
                          <div className="gender svn-gilroy-bold-nevada-12px">
                            Female
                          </div>
                        </div>
                        <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                        <div className="frame-1">
                          <div className="age svn-gilroy-medium-nevada-12px">
                            Age:
                          </div>
                          <div className="address svn-gilroy-bold-nevada-12px">
                            {" "}
                            02 months
                          </div>
                        </div>
                      </div>
                      <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                        9.000.000 VND
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="image"
                  src="../assets/images/image-6@2x.png"
                  alt="doog "
                />
              </div>
              <div className="overlap-group">
                <div className="product-card-1 product-card-3">
                  <div className="frame-7">
                    <img className="image-2" src={image_2} alt="dog" />
                  </div>
                  <div className="frame-15">
                    <div className="frame-14">
                      <div className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                        M021 - Pomeranian White
                      </div>
                      <div className="frame-12">
                        <div className="frame-1">
                          <div className="gene svn-gilroy-medium-nevada-12px">
                            Gene:
                          </div>
                          <div className="gender svn-gilroy-bold-nevada-12px">
                            Female
                          </div>
                        </div>
                        <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                        <div className="frame-1">
                          <div className="age svn-gilroy-medium-nevada-12px">
                            Age:
                          </div>
                          <div className="address svn-gilroy-bold-nevada-12px">
                            02 months
                          </div>
                        </div>
                      </div>
                      <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                        6.500.000 VND
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="image"
                  src="../assets/images/image-7@2x.png"
                  alt="picture"
                />
              </div>
              <div className="overlap-group">
                <div className="product-card-1 product-card-3">
                  <div className="frame-7">
                    <img className="image-2" src={image_2} alt="dog" />
                  </div>
                  <div className="frame-15">
                    <div className="frame-14">
                      <p className="pet-name valign-text-bottom svn-gilroy-bold-swamp-16px">
                        M05 - Poddle Tiny Dariry
                      </p>
                      <div className="frame-12">
                        <div className="frame-1">
                          <div className="gene svn-gilroy-medium-nevada-12px">
                            Gene:
                          </div>
                          <div className="gender svn-gilroy-bold-nevada-12px">
                            Male
                          </div>
                        </div>
                        <div className="frame-12">
                          <div className="frame-1">
                            <div className="age svn-gilroy-medium-nevada-12px">
                              Age:
                            </div>
                            <div className="address svn-gilroy-bold-nevada-12px">
                              02 months
                            </div>
                          </div>
                        </div>
                        <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                          5.000.000 VND
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    className="image"
                    src="../assets/images/image-8@2x.png"
                    alt="pic1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="banner banner-2 bp1-animate-enter1">
        <div className="overlap-group-container-1 overlap-group-container-3">
          <div className="overlap-group7">
            <div className="rectangle-9 rectangle"></div>
            <h1 className="one-more svn-gilroy-x-bold-prussian-blue-52px">
              One More Friend
            </h1>
            <div className="thousands svn-gilroy-bold-prussian-blue-36px">
              Thousands More Fun!
            </div>
            <p className="having-a-pet svn-gilroy-medium-charade-12px">
              Having a pet means you have more joy, a new friend, a happy person
              who will always be with you to have fun. We have 200+ different
              pets that can meet your needs!
            </p>
            <div className="button-l-1">
              <div className="click-here-2 valign-text-bottom click-here-7 svn-gilroy-medium-baby-powder-16px">
                Explore Now!
              </div>
            </div>
            <div className="button-l-2">
              <div className="click-here-3 valign-text-bottom click-here-7 svn-gilroy-medium-prussian-blue-16px">
                View Intro
              </div>
              <img
                className="media-play-circle"
                src="../assets/svg/media-play-circle.svg"
                alt="Media-/ Play-circle"
              />
            </div>
          </div>
          <div className="overlap-group8">
            <div className="rectangle-1 rectangle"></div>
            <img
              className="horizontal-shot-adul"
              src="../assets/images/horizontal.png"
              alt="horizontal"
            />
          </div>
        </div>
      </div>
      <div className="frame-53">
        <div className="flex-row-2 flex-row-3">
          <div className="frame">
            <p className="hard-text valign-text-bottom svn-gilroy-medium-black--16px">
              Hard to choose right products for your pets?
            </p>
            <div className="our-products valign-text-bottom svn-gilroy-bold-prussian-blue-24px">
              Our Products
            </div>
          </div>
          <div className="button-m button">
            <div className="click-here valign-text-bottom svn-gilroy-medium-prussian-blue-14px">
              View More!
            </div>
            <img
              className="arrow-chevron-right_md-4"
              src="../assets/svg/arrow---chevron-right-md-1.svg"
              alt="arrow-chevron-right-md-1"
            />
          </div>
        </div>
        <div className="frame-54">
          <article className="product-card product-8">
            <div className="frame-7">
              <img className="image-2-1" src={imageText} alt="image-2" />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <p className="product-text-reflex valign-text-bottom svn-gilroy-bold-swamp-16px">
                  {" "}
                  Reflex Plus Adult Cat Food Salmon
                </p>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product product-8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Dog Food
                    </div>
                  </div>
                  <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                  <div className="frame-1">
                    <div className="size-4 svn-gilroy-medium-nevada-12px">
                      Size:
                    </div>
                    <div className="weight-product svn-gilroy-bold-nevada-12px">
                      385gm
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  140.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-4"
                  src="../assets/svg/frame-1.svg"
                  alt="frame-1"
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <p className="product-text-freetoy valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  {" "}
                  Free Toys &amp; Free Shaker{" "}
                </p>
              </div>
            </div>
          </article>
          <article className="product-card product-8">
            <div className="frame-7">
              <img
                className="image-2-1"
                src="../assets/images/image-2-10@2x.png"
                alt="product"
              />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <p className="product-text valign-text-bottom svn-gilroy-bold-swamp-16px">
                  Reflex Plus Adult Cat Food Salmon
                </p>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product-1 product-8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Cat Food
                    </div>
                  </div>
                  <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                  <div className="frame-1">
                    <div className="size-4 svn-gilroy-medium-12px">Size:</div>
                    <div className="weight-product svn-gilroy-bold-nevada-12px">
                      1.5 kg{" "}
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  165.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-5"
                  src="../assets/svg/frame-2.svg"
                  alt="frame"
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <p className="product-text-freetoy valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  Free Toy &amp; Free Shaker
                </p>
              </div>
            </div>
          </article>
          <article className="product-card product-8">
            <div className="frame-7">
              <img
                className="image-2-1"
                src="../assets/images/image-2-11@2x.png"
                alt="product"
              />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <p className="product-text valign-text-bottom svn-gilroy-bold-swamp-16px">
                  Cat scratching ball toy kitten sisal rope ball
                </p>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product-2 product-8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Toy
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  1.100.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-6"
                  src="../assets/svg/frame-3.svg"
                  alt="frame"
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <div className="product-text valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  Free Cat Food
                </div>
              </div>
            </div>
          </article>
          <article className="product-card-2 product-card-3">
            <div className="frame-7">
              <img
                className="image-2"
                src="../assets/images/image-2-12@2x.png"
                alt="image"
              />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <p className="product-text svn-gilroy-bold-swamp-16px valign-text-bottom">
                  Cute Pet Cat Warm Nest
                </p>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product-3 product-8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Toy
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  410.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-8"
                  src="../assets/svg/frame-4.svg"
                  alt="frame"
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <div className="product-text valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  Free Cat Food
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="frame-55">
          <article className="product-card product-8">
            <div className="frame-7">
              <img
                className="image-2-1"
                src="../assets/images/image-2-13@2x.png"
                alt="product"
              />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <p className="product-text valign-text-bottom svn-gilroy-bold-swamp-16px">
                  NarturVet Dogs - Omega Gold Plus Salmon Oil
                </p>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product-4 product--8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Dog Food
                    </div>
                  </div>
                  <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                  <div className="frame-1">
                    <div className="size-4 svn-gilroy-medium-nevada-12px">
                      Size:
                    </div>
                    <div className="weight-product svn-gilroy-bold-nevada-12px">
                      385 gm
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  350.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-9"
                  src="../assets/svg/frame-6.svg"
                  alt="frame"
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <p className="product-text-freetoy valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  Free Toy &amp; Free Shaker
                </p>
              </div>
            </div>
          </article>
          <article className="product-card product-8">
            <div className="frame-7">
              <img
                className="image-2"
                src="../assets/images/image-2-14@2x.png"
                alt="imgae"
              />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <p className="product-text valign-text-bottom svn-gilroy-bold-swamp-16px ">
                  Costume Fashion Pet Clother Cowboy Rider
                </p>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product-5 product-8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Costume
                    </div>
                  </div>
                  <div className="text-12 svn-gilroy-medium-nevada-12px"></div>
                  <div className="frame-1">
                    <div className="size-4 svn-gilroy-medium-nevada-12px">
                      Size:
                    </div>
                    <div className="weight-product svn-gilroy-bold-nevada-12px">
                      1.5 kg
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  500.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-10"
                  src="../assets/svg/frame-7.svg"
                  alt="frame"
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <p className="product-text-freetoy valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  Free Toy &amp; Free Shaker
                </p>
              </div>
            </div>
          </article>
          <article className="product-card product-8">
            <div className="frame-7">
              <img
                className="image-2"
                src="../assets/images/image-2-15@2x.png"
                alt="image 22"
              />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <p className="product-text valign-text-bottom svn-gilroy-bold-swamp-16px">
                  Costumes Chicken Drumsti ck Headband
                </p>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product-6 product-8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Costume
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  400.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-11"
                  src="../assets/svg/frame-8.svg"
                  alt="frame "
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <div className="product-text valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  {" "}
                  Free Cat Food
                </div>
              </div>
            </div>
          </article>
          <article className="product-card-2 product-card-3">
            <div className="frame-7">
              <img
                className="image-2"
                src="../assets/images/image-2-16@2x.png"
                alt="frame"
              />
            </div>
            <div className="frame-15-1">
              <div className="frame-14">
                <div className="product-text valign-text-bottom svn-gilroy-bold-swamp-16px">
                  Plush Pet Toy
                </div>
                <div className="frame-12">
                  <div className="frame-1">
                    <div className="product-7 product-8 svn-gilroy-medium-nevada-12px">
                      Product:
                    </div>
                    <div className="food-8 svn-gilroy-bold-nevada-12px">
                      Toy
                    </div>
                  </div>
                </div>
                <div className="price valign-text-bottom svn-gilroy-bold-swamp-14px">
                  250.000 VND
                </div>
              </div>
              <div className="frame-49">
                <img
                  className="frame-13"
                  src="../assets/svg/frame-9.svg"
                  alt="frame"
                />
                <div className="frame-51">
                  <div className="frame-50"></div>
                </div>
                <div className="product-text-freetoy valign-text-bottom svn-gilroy-bold-blue-whale-14px">
                  Free Food &amp; Free Shaker
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="frame-42">
        <div className="frame-43">
          <div className="frame-6-1">
            <p className="proud valign-text-bottom svn-gilroy-medium-black-16px">
              {" "}
              Proud to be part of
            </p>
            <div className="pet-sellers valign-text-bottom pet svn-gilroy-bold-prussian-blue-24px">
              Pet Sellers
            </div>
            a
          </div>
          <div className="button-m button">
            <div className="click-here valign-text-bottom svn-gilroy-medium-prussian-blue-14px">
              View all our sellers
            </div>
            <img
              className="arrow-chevron-right_md-4"
              src="../assets/svg/arrow---chevron-right-md-2.svg"
              alt="Arrow"
            />
          </div>
        </div>
        <div className="frame-40">
          <div className="frame-34">
            <img
              className="image-4"
              src="../assets/images/image-4@2x.png"
              alt="image-4"
            />
          </div>
          <div className="frame-2">
            <img
              className="image-6"
              src="../assets/images/image-6-1@2x.png"
              alt="image 6"
            />
          </div>
          <div className="frame-2">
            <img
              className="image-7"
              src="../assets/images/image-7-1@2x.png"
              alt="image-7"
            />
          </div>
          <div className="frame-2">
            <img
              className="image-8"
              src="../assets/images/image-8@2x.png"
              alt="image-8"
            />
          </div>
          <div className="frame-2">
            <img
              className="image-9"
              src="../assets/images/image-9@2x.png"
              alt="image-9"
            />
          </div>
          <div className="frame-2">
            <img
              className="image-10"
              src="../assets/images/image-10@2x.png"
              alt="image-10"
            />
          </div>
          <div className="frame-2">
            <img
              className="image-11"
              src="../assets/images/image-11@2x.png"
              alt="image-11"
            />
          </div>
        </div>
      </div>
      <div className="frame-56">
        <div className="flex-col">
          <div className="frame">
            <div className="you-already-know valign-text-bottom svn-gilroy-medium-black-16px">
              You alraedy know?
            </div>
            <div className="useful-pet valign-text-bottom svn-gilroy-bold-prussian-blue-24px">
              Useful Pet Knowledge
            </div>
          </div>
          <div className="card">
            <div className="frame-7-1">
              <img
                className="image-3"
                src="../assets/images/image-3-1@2x.png"
                alt="image 3"
              />
            </div>
            <div className="frame-22">
              <div className="frame-20">
                <div className="text-intro valign-text-bottom pet svn-gilroy-bold-baby-powder-10px">
                  Pet Knowledge
                </div>
              </div>
              <div className="frame-21">
                <p className="text-intro svn-gilroy-bold-swamp-16px">
                  What is Pomeranian? How to Identify Pomeranian Dogs
                </p>
                <p className="text-intro-also svn-gilroy-regular-normal-charade-14px">
                  The Pomeranian, also known as the Pomeranian &#40;Pom
                  Dog&#41;, is always in the top of the cutest pets. Not only
                  that, the small, lovely, smart, friendly, and skillful circus
                  dog breed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-blog02 card">
          <div className="frame-7-1">
            <img
              className="image-3"
              src="../assets/images/image-3-2@2x.png"
              alt="image -3-2"
            />
          </div>
          <div className="frame-22-1">
            <div className="frame-20">
              <div className="text-intro valign-text-bottom pet svn-gilroy-bold-baby-powder-10px">
                Pet Knowledge
              </div>
            </div>
            <div className="frame-21-1">
              <p className="text-intro-dog-diet svn-gilroy-bold-swamp-16px">
                Dog Diet You Need To Know
              </p>
              <p className="text-intro-dividing svn-gilroy-regular-normal-charade-14px">
                Dividing a Dog's diet may seem simple at first, but there are
                some rules you should know that your dog can easily absorb the
                nutrients in the diet. For those who are just starting to raise
                dogs, especially new born puppies with relatively weak
                resistance.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-col-1">
          <div className="button-m button">
            <div className="click-here valign-text-bottom svn-gilroy-medium-prussian-blue-14px">
              View More!!!
            </div>
            <img
              className="arrow-chevron-right_md-4"
              src="../assets/svg/arrow---chevron-right-md.svg"
              alt="arrow"
            />
          </div>
          <div className="card">
            <div className="frame-7-1">
              <img
                className="image-3"
                src="../assets/images/image-3-3@2x.png"
                alt="image-3"
              />
            </div>
            <div className="frame-22">
              <div className="frame-20">
                <div className="text-intro valign-text-bottom svn-gilroy-bold-baby-powder-10px pet">
                  Pet Knowledge
                </div>
              </div>
              <div className="frame-21">
                <p className="text-intro-why-dog svn-gilroy-bold-swamp-16px">
                  Why Dogs Bite and Destroy Furniture and How to Prevent It
                  Effectively
                </p>
                <p className="text-intro-dog-bite svn-gilroy-regular-normal-charade-14px">
                  Dog bites are common during development. However, no one wants
                  to see their furniture or important items being bitten by a
                  dog.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Home;
