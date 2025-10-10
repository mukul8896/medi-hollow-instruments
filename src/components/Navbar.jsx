import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/site-icon.svg";
import "../styles/Navbar.css";
import "../styles/MegaMenu.css";

function Navbar() {
  const location = useLocation();
  const [products, setProducts] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false); // Add this for mobile products dropdown
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        // Set first category as active by default when menu opens
        if (Object.keys(data).length > 0) {
          setActiveCategory(Object.keys(data)[0]);
        }
      })
      .catch(err => console.error("Error loading products:", err));
  }, []);

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Reset to first category for next opening
    if (Object.keys(products).length > 0) {
      setActiveCategory(Object.keys(products)[0]);
    }
  };

  const handleMouseEnter = () => {
    // Only handle hover on desktop
    if (window.innerWidth >= 992) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    // Only handle hover on desktop
    if (window.innerWidth >= 992) {
      timeoutRef.current = setTimeout(() => {
        closeMenu();
      }, 200);
    }
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleProductClick = () => {
    closeMenu();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      closeMenu();
      setIsMobileProductsOpen(false); // Close products dropdown when closing main menu
    }
  };

  const toggleMobileProducts = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.innerWidth < 992) {
      setIsMobileProductsOpen(!isMobileProductsOpen);
      setIsMenuOpen(!isMobileProductsOpen); // Toggle the mega menu visibility
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top navbar-custom">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse justify-content-end ${isMobileMenuOpen ? 'show' : 'collapse'}`} id="navbarNav">
          <ul className="navbar-nav fs-5">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${location.pathname === "/" ? "active fw-bold text-white" : "text-light"}`} 
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* Unified Products Dropdown */}
            <li 
              className="nav-item dropdown mega-menu-wrapper"
              ref={menuRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link dropdown-toggle px-3 ${location.pathname.startsWith("/product/") ? "fw-bold text-white" : "text-light"}`}
                style={{ cursor: "pointer" }}
                onClick={toggleMobileProducts} // Updated to use new handler
              >
                Our Products
                {/* <span className={`ms-1 d-lg-none ${isMobileProductsOpen ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.3s' }}>
                  ▼
                </span> */}
              </span>
              
              {/* Unified Mega Menu - Only show on desktop or when mobile is clicked */}
              {(window.innerWidth >= 992 || isMobileProductsOpen) && (
                <div 
                  className={`mega-menu-container ${isMenuOpen ? 'show' : ''}`}
                  onMouseEnter={handleMenuMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                <div className="mega-menu-inner">
                  {/* Category Sidebar */}
                  <div className="category-sidebar">
                    {Object.keys(products).map((category) => (
                      <div
                        key={category}
                        className={`category-item ${activeCategory === category ? 'active' : ''}`}
                        onMouseEnter={() => handleCategoryClick(category)}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                  
                  {/* Subcategory Content */}
                  <div className="subcategory-content">
                    {activeCategory && products[activeCategory] ? (
                      <div className="subcategory-grid">
                        {Object.entries(products[activeCategory]).map(([subcategory, items]) => (
                          <div key={subcategory} className="subcategory-section">
                            <h3 className="subcategory-title">{subcategory}</h3>
                            <ul className="product-list">
                              {items.map((product) => (
                                <li key={product.id} className="product-item">
                                  <Link
                                    to={`/product/${product.id}`}
                                    className="product-link"
                                    onClick={handleProductClick}
                                  >
                                    {product.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>No products available in this category</p>
                      </div>
                    )}
                  </div>
                </div>
                </div>
              )}
            </li>

            {/* <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${location.pathname === "/product-idea" ? "active fw-bold text-white" : "text-light"}`} 
                to="/product-idea"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Submit Product Idea
              </Link>
            </li> */}
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${location.pathname === "/contact" ? "active fw-bold text-white" : "text-light"}`} 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${location.pathname === "/about" ? "active fw-bold text-white" : "text-light"}`} 
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
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