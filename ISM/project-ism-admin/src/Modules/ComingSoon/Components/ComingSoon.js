import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wowjs') : null;

const ComingSoon = () => {
  const { t } = useTranslation();
  useEffect(() => {
    new WOW.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 20,
      mobile: true,
      live: true,
    }).init();
  }, []);

  return (
    <section className="comingsoon-area ptb-100">
      <div className="comingsoon-inner-area">
        <div className="container">
          <div className="wrapComing">
            <div className="wrapComingImage">
              <img
                data-wow-offset="150"
                data-wow-delay="0.5s"
                className="wow zoomIn coming-img coming-elephant"
                src={
                  require('@Modules/ComingSoon/assets/svg/elephant.svg').default
                }
                alt="image feature"
              />
            </div>
            <div className="wrapComingTitle">
              <img
                data-wow-offset="150"
                data-wow-delay="0.5s"
                className="wow zoomIn coming-img coming-sieutrinho"
                src={
                  require('@Modules/ComingSoon/assets/svg/sieutrinho.svg')
                    .default
                }
                alt="image feature"
              />
              <img
                data-wow-offset="150"
                data-wow-delay="0.5s"
                className="wow fadeInUp coming-img coming-hocduong"
                src={
                  require('@Modules/ComingSoon/assets/svg/hocduong.svg').default
                }
                alt="image feature"
              />
            </div>
            <div className="wrapComingSubtitle">
              <img
                data-wow-offset="150"
                data-wow-delay="0.5s"
                className="wow bounceInLeft coming-img coming-subtitle"
                src={
                  require('@Modules/ComingSoon/assets/svg/subtitle.svg').default
                }
                alt="image feature"
              />
            </div>
          </div>
          <div className="wow flipInX contentComing">
            {t('ComingSoon:comingSoon', { date: '30/9/2021' })}
          </div>
        </div>
      </div>
      <div className="box-wrap-elephants">
        <div className="wrap-elephants">
          <div className="wrap-elephants-img">
            <img
              data-wow-delay="0.2s"
              className="wow slideInLeft elephants-img"
              src={require('@Modules/Home/assets/images/elephants.png').default}
              alt="elephants-down"
            />
            <div className="wrap-book">
              <img
                data-wow-offset="200"
                data-wow-delay="0.4s"
                className="wow zoomInDown wrap-book-img"
                src={require('@Modules/Home/assets/images/book.png').default}
                alt="elephants-down"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="box-wrap-elephants-ball">
        <div className="wrap-elephants-ball">
          <div
            data-wow-offset="300"
            data-wow-delay="0.2s"
            className="wow slideInRight wrap-elephants-ball-img"
          >
            <img
              className="wrap-ball-img-elephants"
              src={
                require('@Modules/Home/assets/images/elephants-2.png').default
              }
              alt="elephants-down"
            />
            <div className="wrap-ball">
              <img
                className="wrap-ball-img"
                src={require('@Modules/Home/assets/images/ball.png').default}
                alt="ball"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
