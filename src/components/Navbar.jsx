import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

function Navbar() {
  const location = useLocation();
  const [products, setProducts] = useState({});
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState(null);
  const dropdownRef = useRef(null);
  const megaMenuRef = useRef(null);

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error loading products:", err));
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target)
      ) {
        setCategoryDropdownOpen(false);
        setMegaMenuCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mouse leave for both dropdown and mega menu
  const handleMouseLeaveAll = () => {
    setCategoryDropdownOpen(false);
    setMegaMenuCategory(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top navbar-custom">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav fs-5">
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === "/" ? "active fw-bold text-white" : "text-light"}`} to="/">
                Home
              </Link>
            </li>

            {/* Category Dropdown as Horizontal Row */}
            <li
              className="nav-item dropdown"
              ref={dropdownRef}
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={handleMouseLeaveAll}
              style={{ position: "relative" }}
            >
              <span
                className={`nav-link dropdown-toggle ${location.pathname.startsWith("/product/") ? "fw-bold text-white" : "text-light"}`}
                style={{ cursor: "pointer" }}
              >
                Our Products
              </span>
              {categoryDropdownOpen && (
                <div className="category-row-dropdown">
                  {Object.keys(products).map((category) => (
                    <div
                      key={category}
                      className={`category-row-item${megaMenuCategory === category ? " active" : ""}`}
                      onMouseEnter={() => setMegaMenuCategory(category)}
                      onMouseLeave={() => setMegaMenuCategory(null)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
              {/* Mega Menu below the category row */}
              {categoryDropdownOpen && megaMenuCategory && (
                <div
                  className="mega-menu"
                  ref={megaMenuRef}
                  onMouseEnter={() => setMegaMenuCategory(megaMenuCategory)}
                  onMouseLeave={() => setMegaMenuCategory(null)}
                >
                  <div className="mega-menu-content">
                    {Object.keys(products[megaMenuCategory]).map((subcategory) => (
                      <div className="mega-menu-column" key={subcategory}>
                        <div className="mega-menu-subcategory">{subcategory}</div>
                        <ul className="mega-menu-products">
                          {products[megaMenuCategory][subcategory].map((product) => (
                            <li key={product.id}>
                              <Link
                                to={`/product/${product.id}`}
                                className="mega-menu-product-link"
                                onClick={() => {
                                  setCategoryDropdownOpen(false);
                                  setMegaMenuCategory(null);
                                }}
                              >
                                {product.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === "/product-idea" ? "active fw-bold text-white" : "text-light"}`} to="/product-idea">
                Submit Product Idea
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === "/contact" ? "active fw-bold text-white" : "text-light"}`} to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${location.pathname === "/about" ? "active fw-bold text-white" : "text-light"}`} to="/about">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;