import React from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import LazyLoad from "react-lazyload"

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-item: center;
  flex: 1;
  text-align: center;
  @media only screen and (max-width: 767px) {
    min-height: 200px;
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    min-height: 200px;
  }
`

const loadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 20px solid #eaf0f6;
  border-radius: 50%;
  border-top: 20px solid #e03e0e;
  width: 200px;
  height: 200px;
  animation: ${loadingAnimation} 4s linear infinite;
  margin: auto;
  display: flex;
  align-item: center;

  @media only screen and (max-width: 767px) {
    border: 5px solid #eaf0f6;
    border-top: 5px solid #e03e0e;
    width: 64px;
    height: 64px;
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    border: 5px solid #eaf0f6;
    border-top: 5px solid #e03e0e;
    width: 80px;
    height: 80px;
  }
  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    border: 5px solid #eaf0f6;
    border-top: 5px solid #e03e0e;
    width: 60px;
    height: 60px;
  }
`

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LazyImage = ({ src, alt }) => {
  const refPlaceholder = React.useRef()

  const removePlaceholder = () => {
    refPlaceholder.current.remove()
  }

  return (
    <ImageWrapper>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad>
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </ImageWrapper>
  )
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default LazyImage
