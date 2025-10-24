import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "../styles/Product.css";
import "../styles/Sidebar.css";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ProductQueryForm from "../components/ProductQueryForm";

function getMaxProductNameLength(productsData) {
  let maxLength = 0;
  Object.values(productsData).forEach((category) =>
    Object.values(category).forEach((subcategory) =>
      subcategory.forEach((product) => {
        if (product.name && product.name.length > maxLength) {
          maxLength = product.name.length;
        }
      })
    )
  );
  return maxLength;
}

function ProductPage({ productsData }) {
  const { productId } = useParams();
  const [queryProduct, setQueryProduct] = useState(null);
  const [openCategory, setOpenCategory] = useState("");
  const [openSubcategories, setOpenSubcategories] = useState({});
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const findProduct = () => {
    for (const category of Object.keys(productsData)) {
      for (const subcategory of Object.keys(productsData[category])) {
        const product = productsData[category][subcategory].find(
          (p) => p.id === parseInt(productId)
        );
        if (product) return { ...product, category, subcategory };
      }
    }
    return null;
  };

  const product = findProduct();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (product) {
      setOpenCategory(product.category);
      setOpenSubcategories((prev) => ({
        ...prev,
        [product.subcategory]: true,
      }));
      setCurrentImageIndex(0);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h2>Product not found</h2>
      </div>
    );
  }

  const desktopSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  const sidebarWidth = Math.min(
    Math.max(250, getMaxProductNameLength(productsData) * 10 + 100),
    380
  );

  const relatedProducts =
    productsData[product.category][product.subcategory].filter(
      (p) => p.id !== product.id
    );

  const toggleSubcategory = (subcategory) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [subcategory]: !prev[subcategory],
    }));
  };

  const handleNextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % product.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  return (
    <div className="container product-page-container">
      {/* Mobile toggle */}
      {!isDesktop && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-primary fw-semibold"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            style={{ borderRadius: "8px" }}
          >
            {isSidebarVisible ? "Hide Product List ▲" : "Show Product List ▼"}
          </button>
        </div>
      )}

      <div className="main-flex-layout flex-lg-row flex-column">
        {/* Sidebar */}
        {(isDesktop || isSidebarVisible) && (
          <div
            className="sidebar-pro"
            style={{
              width: isDesktop ? `${sidebarWidth}px` : "100%",
            }}
          >
            <h4 className="sidebar-title">All Products</h4>
            {Object.keys(productsData).map((category) => (
              <div key={category} className="mb-2">
                <button
                  className={`sidebar-category-btn ${
                    openCategory === category ? "active" : ""
                  }`}
                  onClick={() =>
                    setOpenCategory(openCategory === category ? "" : category)
                  }
                >
                  {category}
                  <span className="float-end">
                    {openCategory === category ? "▲" : "▼"}
                  </span>
                </button>
                {openCategory === category && (
                  <div className="sidebar-subcat-list">
                    {Object.keys(productsData[category]).map((subcategory) => (
                      <div key={subcategory}>
                        <button
                          className="sidebar-subcat-name-btn"
                          onClick={() => toggleSubcategory(subcategory)}
                        >
                          {subcategory}
                          <span>
                            {openSubcategories[subcategory] ? "▲" : "▼"}
                          </span>
                        </button>
                        {openSubcategories[subcategory] && (
                          <ul className="sidebar-product-list with-vertical-bar">
                            {productsData[category][subcategory].map((item) => (
                              <li
                                key={item.id}
                                className={`sidebar-product-item ${
                                  item.id === product.id
                                    ? "active-product"
                                    : ""
                                }`}
                              >
                                <Link
                                  to={`/product/${item.id}`}
                                  onClick={() =>
                                    !isDesktop && setIsSidebarVisible(false)
                                  }
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Product Details */}
        <div className="product-details-flex mt-4 mt-lg-0">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">{product.category}</li>
              <li className="breadcrumb-item">{product.subcategory}</li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="shadow-lg p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
              <h1 className="mb-3 mb-md-0">{product.name}</h1>
              <button
                className="btn btn-info fw-semibold"
                style={{
                  borderRadius: "8px",
                  padding: "8px 20px",
                  fontSize: "1rem",
                  color: "#fff",
                  backgroundColor: "hsla(204, 90%, 50%, 1.00)",
                  border: "1px solid hsla(199, 90%, 40%, 1.00)",
                }}
                onClick={() => setQueryProduct(product)}
              >
                Quick Query
              </button>
            </div>

            {/* Image Display - Desktop uses Slick, Mobile uses simple slider */}
            <div className="mb-4">
              {product.images && product.images.length > 0 ? (
                <>
                  {/* Desktop: Slick Slider */}
                  {isDesktop && (
                    <Slider {...desktopSettings}>
                      {product.images.map((img, index) => (
                        <div key={index}>
                          <div className="slider-image-container">
                            <img
                              src={img}
                              alt={`${product.name} - Image ${index + 1}`}
                              className="product-slider-img"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )}

                  {/* Mobile: Simple Image Gallery */}
                  {!isDesktop && (
                    <div className="mobile-image-gallery">
                      <div className="slider-image-container">
                        <img
                          src={product.images[currentImageIndex]}
                          alt={`${product.name} - Image ${currentImageIndex + 1}`}
                          className="product-slider-img"
                        />
                      </div>
                      {product.images.length > 1 && (
                        <div className="mobile-gallery-controls">
                          <button
                            className="gallery-btn gallery-prev"
                            onClick={handlePrevImage}
                            aria-label="Previous image"
                          >
                            ‹
                          </button>
                          <span className="gallery-indicator">
                            {currentImageIndex + 1} / {product.images.length}
                          </span>
                          <button
                            className="gallery-btn gallery-next"
                            onClick={handleNextImage}
                            aria-label="Next image"
                          >
                            ›
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="slider-image-container">
                  <img
                    src="https://via.placeholder.com/600x400?text=No+Image+Available"
                    alt="Placeholder"
                    className="product-slider-img"
                  />
                </div>
              )}
            </div>
            
            {product.note && (
              <>
                <h4>Note</h4>
                <p className="text-muted">{product.note}</p>
              </>
            )}

            {product.description && (
              <>
                <h5>Description</h5>
                <p className="text-muted">{product.description}</p>
              </>
            )}

            {product.sizes?.length > 0 && (
              <>
                <h4 className="mt-4">Available Sizes</h4>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Model</th>
                        {product.sizes[0].capacity && <th>Capacity</th>}
                        <th>Dimensions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizes.map((size, index) => (
                        <tr key={index}>
                          <td>{size.name}</td>
                          {size.capacity && <td>{size.capacity}</td>}
                          <td>{size.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {relatedProducts.length > 0 && (
              <div className="mt-5">
                <h4>Related Products in {product.subcategory}</h4>
                <div className="row">
                  {relatedProducts.slice(0, 3).map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      className="col-md-6 col-lg-5 mb-3"
                    >
                      <Card
                        product={relatedProduct}
                        onQuickQuery={(p) => setQueryProduct(p)}
                        showViewProduct={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductQueryForm
        show={!!queryProduct}
        onClose={() => setQueryProduct(null)}
        product={queryProduct}
      />
    </div>
  );
}

export default ProductPage;