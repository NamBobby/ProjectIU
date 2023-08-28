import React from 'react'
import './index.scss'
import PropTypes from 'prop-types'

const CustomLabel = ({children, type, className = ''}) => {
    return (
        <label className={`${className} label__${type}`}>{children}</label>
    )
}

CustomLabel.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    className: PropTypes.string
}

CustomLabel.defautProps = {
    className: ''
}

export default CustomLabel