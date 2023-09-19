import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SideDrawer from "./SideDrawer"

const Navbar = ({ router = {}, products = [] }) => {
  const [drawer, setDrawer] = useState(false)
  const [searchForm, setSearchForm] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const { pathname } = router

  const layOutCls = ""
  const logo = require("@src/assets/images/logo.png").default
  if (pathname === "/digital-marketing") {
    layOutCls = "marketing-navbar"
    logo = require("@src/assets/images/logo2.png").default
  }

  const classOne = collapsed
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show"
  const classTwo = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right"

  const toggleNavbar = () => {
    setCollapsed(!collapsed)
  }

  const handleDrawer = () => {
    setDrawer(!drawer)
  }

  const handleSearchForm = () => {
    setSearchForm(!searchForm)
  }

  useEffect(() => {
    const elementId = document.getElementById("navbar")
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky")
      } else {
        elementId.classList.remove("is-sticky")
      }
    })
    window.scrollTo(0, 0)
    return () => {
      setIsMounted(true)
    }
  }, [])

  return (
    <>
      <header id="header">
        <div id="navbar" className={`crake-nav ${layOutCls}`}>
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link to="/saas">
                <a className="navbar-brand">
                  <img src={logo} alt="logo" />
                </a>
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav nav ms-auto">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Home
                    </a>
                    <ul className="dropdown_menu">
                      <li>
                        <Link activeClassName="active" href="/saas">
                          <a>SaaS Landing</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/app">
                          <a>App Landing</a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          activeClassName="active"
                          href="/digital-marketing"
                        >
                          <a>Digital Marketing</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/product-landing">
                          <a>Product Landing</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/software-landing">
                          <a>Software Landing</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/book-landing">
                          <a>Book Landing</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/agency">
                          <a>Startup Agency</a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          activeClassName="active"
                          href="/payment-processing"
                        >
                          <a>Payment Processing</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/#"
                      className="nav-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Pages
                    </a>
                    <ul className="dropdown_menu">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/#"
                          onClick={(e) => e.preventDefault()}
                        >
                          About
                        </a>
                        <ul className="dropdown_menu">
                          <li>
                            <Link activeClassName="active" href="/about-one">
                              <a>About Us 1</a>
                            </Link>
                          </li>
                          <li>
                            <Link activeClassName="active" href="/about-two">
                              <a>About Us 2</a>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <Link activeClassName="active" href="/features">
                          <a>Features</a>
                        </Link>
                      </li>

                      <li>
                        <Link activeClassName="active" href="/services">
                          <a>Services</a>
                        </Link>
                      </li>

                      <li>
                        <Link activeClassName="active" href="/gallery">
                          <a>Gallery</a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Team
                        </a>
                        <ul className="dropdown_menu">
                          <li>
                            <Link activeClassName="active" href="/team-one">
                              <a>Team 1</a>
                            </Link>
                          </li>
                          <li>
                            <Link activeClassName="active" href="/team-two">
                              <a>Team 2</a>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Pricing
                        </a>
                        <ul className="dropdown_menu">
                          <li>
                            <Link activeClassName="active" href="/pricing-one">
                              <a>Pricing 1</a>
                            </Link>
                          </li>
                          <li>
                            <Link activeClassName="active" href="/pricing-two">
                              <a>Pricing 2</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              activeClassName="active"
                              href="/pricing-three"
                            >
                              <a>Pricing 3</a>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Portfolio
                        </a>
                        <ul className="dropdown_menu">
                          <li>
                            <Link
                              activeClassName="active"
                              href="/portfolio-one"
                            >
                              <a>Portfolio 2 Columns</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              activeClassName="active"
                              href="/portfolio-two"
                            >
                              <a>Portfolio 3 Columns</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              activeClassName="active"
                              href="/portfolio-three"
                            >
                              <a>Portfolio 4 Columns Wide</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              activeClassName="active"
                              href="/project-details"
                            >
                              <a>Portfolio Details</a>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Shop
                        </a>
                        <ul className="dropdown_menu">
                          <li>
                            <Link activeClassName="active" href="/shop-one">
                              <a>Shop 1</a>
                            </Link>
                          </li>
                          <li>
                            <Link activeClassName="active" href="/shop-two">
                              <a>Shop 2</a>
                            </Link>
                          </li>
                          <li>
                            <Link activeClassName="active" href="/shop-details">
                              <a>Shop Details</a>
                            </Link>
                          </li>
                          <li>
                            <Link activeClassName="active" href="/cart">
                              <a>Cart</a>
                            </Link>
                          </li>
                          <li>
                            <Link activeClassName="active" href="/checkout">
                              <a>Checkout</a>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Blog
                        </a>
                        <ul className="dropdown_menu">
                          <li>
                            <Link
                              activeClassName="active"
                              href="/blog/blog-one"
                            >
                              <a>Blog 1</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              activeClassName="active"
                              href="/blog/blog-two"
                            >
                              <a>Blog 2</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              activeClassName="active"
                              href="/blog/blog-details"
                            >
                              <a>Blog Details</a>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <Link activeClassName="active" href="/login">
                          <a>Login</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/signup">
                          <a>Sign Up</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/coming-soon">
                          <a>Coming Soon</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/error">
                          <a>404 Error</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/faq">
                          <a>FAQ</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Portfolio
                    </a>
                    <ul className="dropdown_menu">
                      <li>
                        <Link activeClassName="active" href="/portfolio-one">
                          <a>Portfolio 2 Columns</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/portfolio-two">
                          <a>Portfolio 3 Columns</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/portfolio-three">
                          <a>Portfolio 4 Columns Wide</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/project-details">
                          <a>Portfolio Details</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Blog
                    </a>
                    <ul className="dropdown_menu">
                      <li>
                        <Link activeClassName="active" href="/blog-one">
                          <a>Blog 1</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/blog-two">
                          <a>Blog 2</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/blog-details">
                          <a>Blog Details</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Shop
                    </a>
                    <ul className="dropdown_menu">
                      <li>
                        <Link activeClassName="active" href="/shop-one">
                          <a>Shop 1</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/shop-two">
                          <a>Shop 2</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/shop-details">
                          <a>Shop Details</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/cart">
                          <a>Cart</a>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" href="/checkout">
                          <a>Checkout</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link activeClassName="active" href="/contact">
                      <a className="nav-link">Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="ms-auto others-option">
                <ul className="navbar-nav">
                  <li className="nav-item cart-wrapper">
                    <Link activeClassName="active" href="/cart">
                      <a>
                        <i className="icofont-shopping-cart cart-icon"></i>

                        <span>{products.length}</span>
                      </a>
                    </Link>
                  </li>

                  <li className="header-search-box">
                    <Link activeClassName="active" href="/#">
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          handleSearchForm()
                        }}
                        title="Search"
                      >
                        <i className="icofont-search-2"></i>
                      </a>
                    </Link>
                  </li>

                  <li onClick={handleDrawer}>
                    <div className="side-menu">
                      <span className="bar-1"></span>
                      <span className="bar-2"></span>
                      <span className="bar-3"></span>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {drawer ? <SideDrawer onClick={handleDrawer} /> : ""}
    </>
  )
}

export default Navbar
