import PropTypes from "prop-types"
import React from "react"
import classNames from "classnames"
import "./index.scss"

const sizes = {
  sm: 17,
  md: 20,
  lg: 36
}

const CustomIcon = (props) => {
  const {
    size,
    bordered,
    rounded,
    Icon,
    onClick,
    className = "",
    color,
    width,
    height,
    marginRight,
    iconSize,
    style,
    centered
  } = props

  return (
    <span
      style={{
        ...style,
        width: size ? sizes[size] : width,
        height: size ? sizes[size] : height
      }}
      className={classNames({
        [className]: true,
        'flex-center justify-content-center': centered,
        "custom-icon": true,
        "custom-icon-btn": bordered && rounded,
        [`text-${color}`]: color,
        'rounded-circle': rounded,
        'mr-1': marginRight,
        "rounded-circle": rounded,
        bordered
      })}
      onClick={() => typeof onClick === "function" && onClick()}
    >
      <Icon size={iconSize || undefined} />
    </span>
  )
}

CustomIcon.propTypes = {
  Icon: PropTypes.any,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  bordered: PropTypes.bool,
  rounded: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginRight: PropTypes.bool,
  centered: PropTypes.bool,
  style: PropTypes.object,
}

export default CustomIcon
