import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import "../styles/TopHeader.css";

function TopHeader({ address, contact }) {
  const socials = [
    { href: "https://www.linkedin.com/company/elite-surgical", label: "LinkedIn", Icon: FaLinkedinIn },
    { href: "https://x.com/EliteSurgical", label: "X", Icon: FaTwitter },
    { href: "https://facebook.com/EliteSurgical", label: "Facebook", Icon: FaFacebookF },
    { href: "https://instagram.com/EliteSurgical", label: "Instagram", Icon: FaInstagram },
  ];

  return (
    <div className="top-header">
      <div className="container th-inner">
        <div className="th-left">
          <FaMapMarkerAlt className="me-2 text-danger" size={12} />
          <span className="truncate">{address}</span>
        </div>

        <div className="th-center">
          <FaPhoneAlt className="me-1 opacity-75" size={12} />
          <a href={`tel:${contact.phone}`} className="th-link me-3">{contact.phone}</a>
          <FaEnvelope className="me-1 opacity-75" size={12} />
          <a href={`mailto:${contact.email}`} className="th-link">{contact.email}</a>
        </div>

        <div className="th-right">
          {socials.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="th-soc">
              <Icon size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
