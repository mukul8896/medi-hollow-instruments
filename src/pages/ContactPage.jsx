import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import siteConfig from "../siteConfig.json"; 

function ContactPage() {
  const { address, contact, socialLinks } = siteConfig;
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">Contact Us</h1>
      
      <div className="row">
        {/* Contact Form */}
        <div className="col-md-6">
          <div className="p-4 shadow-lg">
            <h3 className="text-center mb-3">Send Your Query</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100">Send Message</button>
            </form>
          </div>
        </div>

        {/* Contact Details */}
        <div className="col-md-6">
          <div className="p-4 shadow-lg">
            <h3 className="text-center mb-3">Our Contact Details</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex align-items-center">
                <FaMapMarkerAlt className="text-danger me-3" size={24} />
                <span>{address}</span>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaPhone className="text-success me-3" size={24} />
                <span>{contact.phone}</span>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaEnvelope className="text-primary me-3" size={24} />
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
