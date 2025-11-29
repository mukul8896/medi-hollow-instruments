import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

const PUBLIC_URL = import.meta.env.BASE_URL || '';

function Card({ product, onQuickQuery, showViewProduct = true }) {
  const getImageSrc = (product) => {
    if (product.images) {
      if (product.images[0].startsWith('http')) return product.images[0];
      if (product.images[0].startsWith('/assets')) return product.images[0];
      return `${PUBLIC_URL}${product.images[0]}`;
    }
    return `${PUBLIC_URL}/assets/images/default-image.jpg`;
  };

  const handleImageError = (e) => {
    console.log(`INFO: Image load error for product ${product.name}. Using default`);
  };

  return (
    <div className="card h-100 shadow-sm border-light product-card">
      {/* Entire clickable area wrapped in Link */}
      <Link 
        to={`/product/${product.id}`} 
        className="card-link-wrapper text-decoration-none text-dark"
      >
        <div className="image-container">
          <img
            src={getImageSrc(product)}
            className="card-img-top"
            alt={product.name}
            onError={handleImageError}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{product.name}</h5>
          <p className="text-muted small mb-2">
            {product.category} - {product.subcategory}
          </p>
          {product.featured && (
            <span className="badge-featured">Featured</span>
          )}
        </div>
      </Link>

      {/* Buttons outside Link to prevent accidental navigation */}
      <div className="card-footer bg-transparent border-0 mt-auto pt-2 d-flex gap-2 card-button-group">
        {showViewProduct && (
          <Link 
            to={`/product/${product.id}`} 
            className="btn-card-primary"
          >
            View Product
          </Link>
        )}
        <button 
          onClick={() => onQuickQuery(product)} 
          className="btn-card-secondary"
        >
          Quick Query
        </button>
      </div>
    </div>
  );
}

export default Card;
