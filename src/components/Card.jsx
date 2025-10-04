import React from "react";
import { Link } from "react-router-dom";

// Base URL for public assets in Vite
const PUBLIC_URL = import.meta.env.BASE_URL || '';

function Card({ product, onQuickQuery, showViewProduct = true }) {
  // Get image source with Vite public path and fallback
  const getImageSrc = (product) => {
    if (product.images) {
      if (product.images[0].startsWith('http')) {
        return product.images[0];
      }
      if (product.images[0].startsWith('/assets')) {
        return product.images[0];
      }
      return `${PUBLIC_URL}${product.images[0]}`;
    }
    // Try local default first
    return `${PUBLIC_URL}/assets/images/default-image.jpg`;
  };


  // Handler to show placeholder if image fails to load
  const handleImageError = (e) => {
    console.log(`INFO : card Image load error for product ${product.name}.Using default`);
  };

  return (
    <div className="card h-100 shadow-sm border-light product-card">
      <div className="image-container">
        <img
          src={getImageSrc(product)}
          className="card-img-top"
          alt={product.name}
          onError={handleImageError}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark mb-2">{product.name}</h5>
        <p className="text-muted small mb-2">
          {product.category} - {product.subcategory}
        </p>
        {product.featured && (
          <span className="badge-featured">Featured</span>
        )}
        <div className="mt-auto pt-3">
          <div className="d-flex gap-2 card-button-group">
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
      </div>
    </div>
  );
}

export default Card;