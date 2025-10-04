import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Location icon
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Phone & Email icons

function TopHeader({ address, contact }) {
  return (
    <div className="top-header bg-dark text-white py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaMapMarkerAlt className="text-danger me-2" size={20} />
          <span>{address}</span>
        </div>
        <div className="d-flex align-items-center">
          <FaPhoneAlt className="me-2" size={16} />
          <a href={`tel:${contact.phone}`} className="text-white text-decoration-none me-3">
            {contact.phone}
          </a>
          <FaEnvelope className="me-2" size={16} />
          <a href={`mailto:${contact.email}`} className="text-white text-decoration-none">
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;

