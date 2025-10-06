import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  const socials = [
    { href: "https://www.linkedin.com/company/elite-surgical", label: "LinkedIn", Icon: FaLinkedinIn },
    { href: "https://x.com/EliteSurgical", label: "X", Icon: FaTwitter },
    { href: "https://facebook.com/EliteSurgical", label: "Facebook", Icon: FaFacebookF },
    { href: "https://instagram.com/EliteSurgical", label: "Instagram", Icon: FaInstagram },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <h3 className="cta-title">Looking for reliable surgical instruments?</h3>
          <Link to="/contact" className="cta-button">Request a Quote</Link>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="footer-brand">
                <img
                  src="/assets/images/logo.jpg"
                  alt="Medi Hollow Instruments"
                  className="footer-logo"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <h4 className="brand-name">Medi Hollow Instruments</h4>
              </div>
              <p className="brand-blurb">
                Manufacturer and supplier of premium medical and surgical equipment,
                engineered for consistent performance and long‑term reliability.
              </p>
              <div className="socials">
                {socials.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="soc-link">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="col-6 col-md-2">
              <h6 className="footer-head">Company</h6>
              <ul className="footer-list">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/">Home</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-3">
              <h6 className="footer-head">Products</h6>
              <ul className="footer-list">
                <li><Link to="/product/163">Bed Pan</Link></li>
                <li><Link to="/product/1">Gallipot</Link></li>
                <li><Link to="/product/343">Forceps</Link></li>
                <li><Link to="/product/1">All Products</Link></li>
              </ul>
            </div>

            <div className="col-12 col-md-3">
              <h6 className="footer-head">Contact</h6>
              <ul className="footer-contact">
                <li>
                  <FaMapMarkerAlt className="me-2 text-muted" />
                  <span>Plot No-58, Block C, Wazir Pur Industrial Area, Delhi-110054, India</span>
                </li>
                <li>
                  <FaPhoneAlt className="me-2 text-muted" />
                  <a href="tel:+919650511154">+91 9650511154</a> <span className="mx-1">|</span> <a href="tel:+918826876070">+91 8826876070</a>
                </li>
                <li>
                  <FaEnvelope className="me-2 text-muted" />
                  <a href="mailto:mukul.sharma8896@gmail.com">mukul.sharma8896@gmail.com</a>
                </li>
                <li>
                  <span className="contact-label">Hours:</span> Mon–Sat, 9:30 AM – 6:30 PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p className="mb-0">© {year} Elite Surgical. All rights reserved.</p>
          <ul className="bottom-links">
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
