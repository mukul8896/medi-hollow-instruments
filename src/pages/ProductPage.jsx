import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Product.css";
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

  // Find the product in the nested structure
  const findProduct = () => {
    for (const category of Object.keys(productsData)) {
      for (const subcategory of Object.keys(productsData[category])) {
        const product = productsData[category][subcategory].find(
          (p) => p.id === parseInt(productId)
        );    if (product) {
          return { ...product, category, subcategory };
        }
      }
    }
    return null;
  };

  const product = findProduct();
 useEffect(() => {
    if (product) {
      setOpenCategory(product.category);
      setOpenSubcategories(prev => ({
        ...prev,
        [product.subcategory]: true
      }));
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h2>Product not found</h2>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const maxProductNameLength = getMaxProductNameLength(productsData);
  const sidebarWidth = Math.min(
    Math.max(250, maxProductNameLength * 10 + 100),
    400
  );

  const relatedProducts =
    productsData[product.category][product.subcategory].filter(
      (p) => p.id !== product.id
    );

  const toggleSubcategory = (subcategory) => {
    setOpenSubcategories(prev => ({
      ...prev,
      [subcategory]: !prev[subcategory]
    }));
  };

  return (
    <>
      <div
        className="main-flex-layout"
        style={{ display: "flex", gap: "10px", marginTop: "5px" }}
      >
        {/* Sidebar */}
        <div className="sidebar-pro" style={{ width: `${sidebarWidth}px` }}>
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
                    <div key={subcategory} className="mb-2">
                      <button
                        className="sidebar-subcat-name-btn"
                        onClick={() => toggleSubcategory(subcategory)}
                      >
                        <span className="sidebar-subcat-name-text">{subcategory}</span>
                        <span className="sidebar-subcat-arrow">
                          {openSubcategories[subcategory] ? "▲" : "▼"}
                        </span>
                      </button>
                      {openSubcategories[subcategory] && (
                        <ul className="sidebar-product-list with-vertical-bar">
                          {productsData[category][subcategory].map((item) => (
                            <li
                              key={item.id}
                              className={`sidebar-product-item ${
                                item.id === product.id ? "active-product" : ""
                              }`}
                            >
                              <span className="sidebar-product-bullet">
                                {item.id === product.id ? (
                                  <span className="sidebar-product-bullet-current" />
                                ) : (
                                  <span className="sidebar-product-bullet-normal" />
                                )}
                              </span>
                              <Link
                                to={`/product/${item.id}`}
                                className={
                                  item.id === product.id ? "active-link" : ""
                                }
                                style={{ flex: 1 }}
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

        {/* Product Details */}
        <div className="product-details-flex" style={{ flex: 1, minWidth: 0 }}>
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
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h1 className="mb-0">{product.name}</h1>
              <button
                className="btn btn-info fw-semibold"
                style={{
                  borderRadius: "8px",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px hsla(190, 90%, 50%, 0.20)",
                  letterSpacing: "0.3px"
                }}
                onClick={() => setQueryProduct(product)}
              >
                Quick Query
              </button>
            </div>

            {/* Image Slider */}
            <div className="mb-4">
              {product.images && product.images.length > 0 ? (
                <Slider {...settings} className="rounded">
                  {product.images.map((img, index) => (
                    <div key={index} className="text-center">
                      <div className="slider-image-container">
                        <img
                          src={img}
                          alt={product.name}
                          className="img-fluid rounded"
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                            background: "#fff"
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src="https://via.placeholder.com/600x400?text=No+Image+Available"
                  alt="Placeholder"
                  className="img-fluid rounded mx-auto d-block"
                />
              )}
            </div>

            {/* Description */}
            {product.description && (
              <>
                <h4>Description</h4>
                <p className="text-muted">{product.description}</p>
              </>
            )}

            {/* Sizes Table */}
            {product.sizes && product.sizes.length > 0 && (
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

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-5">
                <h4>Related Products in {product.subcategory}</h4>
                <div className="row">
                  {relatedProducts.slice(0, 3).map((relatedProduct) => (
                    <div key={relatedProduct.id} className="col-md-4">
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

      {/* Query Form Modal via Portal */}
      <ProductQueryForm
        show={!!queryProduct}
        onClose={() => setQueryProduct(null)}
        product={queryProduct}
      />
    </>
  );
}

/* Custom Arrows */
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: 100 }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 100 }}
      onClick={onClick}
    />
  );
};

export default ProductPage;