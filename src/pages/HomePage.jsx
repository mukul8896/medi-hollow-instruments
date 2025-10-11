import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ProductQueryForm from "../components/ProductQueryForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Homepage.css";

const companyGalleryImages = [
  "/assets/images/flash2.jpg",
  "/assets/images/flash3.jpg",
  "/assets/images/flash4.jpg",
  "/assets/images/flash5.jpg"
];

function HomePage({ productsData }) {
  const [queryProduct, setQueryProduct] = useState(null);
  const [sliderKey, setSliderKey] = useState(0);
  const sliderRef = useRef(null);

  // Force slider refresh on component mount/navigation
  useEffect(() => {
    setSliderKey(prev => prev + 1);
    
    // Small delay to ensure slider initializes properly
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getAllProducts = () => {
    const allProducts = [];
    Object.keys(productsData).forEach((category) => {
      Object.keys(productsData[category]).forEach((subcategory) => {
        productsData[category][subcategory].forEach((product) => {
          allProducts.push({
            ...product,
            category,
            subcategory,
          });
        });
      });
    });
    return allProducts;
  };

  const allProducts = getAllProducts();
  const featuredProducts = allProducts.filter((p) => p.featured);

  // Enhanced professional slider settings with fixes
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div className="hero-section">
          <div className="container">

            {/* Enhanced Company Summary Section */}
            <section className="company-summary-wrapper">
              <div className="company-summary">
                <span className="mb-5 section-badge badge-text">
                  WELCOME - Medi Hollow Instruments
                </span>
                
                <div className="row align-items-center g-3">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="content-wrapper">
                      <div className="icon-text-group mb-4">
                        <div className="icon-wrapper">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                          </svg>
                        </div>
                        <p className="lead-text">
                          We at <strong>Medi Hollow Instruments</strong> are proud to serve the medical industry with quality products manufactured to the highest standards. Our extensive experience and commitment to innovation make us a trusted partner for hospitals and clinics nationwide.
                        </p>
                      </div>
                      
                      <div className="icon-text-group">
                        <div className="icon-wrapper">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
                          </svg>
                        </div>
                        <p className="secondary-text">
                          With a <strong>certified quality management system</strong> and a passion for excellence, we deliver surgical instruments and medical devices that professionals rely on every day.
                        </p>
                      </div>

                      <div className="stats-row mt-4">
                        <div className="stat-item">
                          <h3 className="stat-number">20+</h3>
                          <p className="stat-label">Years Experience</p>
                        </div>
                        <div className="stat-item">
                          <h3 className="stat-number">100+</h3>
                          <p className="stat-label">Products</p>
                        </div>
                        <div className="stat-item">
                          <h3 className="stat-number">500+</h3>
                          <p className="stat-label">Happy Clients</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                        <Slider {...sliderSettings}>
                          {companyGalleryImages.map((img, index) => (
                            <div key={index} className="text-center">
                                <img
                                  src={img}
                                  alt={img}
                                  style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "100%",
                                    background: "#fff"
                                  }}
                                />
                              </div>
                          ))}
                        </Slider>
                  </div>
                </div>
              </div>
            </section>
            {/* Featured Products Section */}
            {featuredProducts.length > 0 && (
              <section className="featured-products-section mb-2">
                <div className="section-header text-center mb-5">
                  <h2 className="section-title">Featured Products</h2>
                  <p className="section-subtitle">Discover our most popular medical</p>
                </div>
                <div className="row">
                  {featuredProducts.slice(0, 6).map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                      <Card
                        product={product}
                        onQuickQuery={(p) => setQueryProduct(p)}
                        showViewProduct={true}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Products by Category Section */}
            {/* {Object.keys(productsData).map((category) => (
              <div key={category} className="category-section mb-5">
                <h2 className="category-title mb-4">{category}</h2>
                {Object.keys(productsData[category]).map((subcategory) => (
                  <div key={subcategory} className="subcategory-section mb-5">
                    <h4 className="subcategory-title mb-3">{subcategory}</h4>
                    <div className="row">
                      {productsData[category][subcategory]
                        .slice(0, 3)
                        .map((product) => (
                          <div key={product.id} className="col-md-4 mb-4">
                            <Card
                              product={product}
                              onQuickQuery={(p) => setQueryProduct(p)}
                              showViewProduct={true}
                            />
                          </div>
                        ))}
                      {productsData[category][subcategory].length > 3 && (
                        <div className="col-12 text-center mt-3">
                          <Link
                            to={`/category/${category}/${subcategory}`}
                            className="btn btn-outline-primary btn-lg"
                          >
                            View All {subcategory} Products ({productsData[category][subcategory].length})
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Query Form Modal */}
      <ProductQueryForm
        show={!!queryProduct}
        onClose={() => setQueryProduct(null)}
        product={queryProduct}
      />
    </>
  );
}

export default HomePage;
