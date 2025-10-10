import React, { useState, useEffect } from "react";
import { FaAward, FaShieldAlt, FaTruckMoving, FaEye, FaBullseye, FaUsers, FaGlobe, FaMedal } from "react-icons/fa";

function AboutPage() {
  const [aboutData, setAboutData] = useState({ title: "", description: "" });

  useEffect(() => {
    fetch("/siteConfig.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data.aboutUs))
      .catch((err) => console.error("Error loading siteConfig:", err));
  }, []);

  return (
    <div className="bg-light">
      {/* Hero */}
      <section
        className="position-relative text-white about-hero"
        style={{ background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-xl-6 col-lg-9">
              <h1 className="display-5 display-md-4 fw-bold mb-3">
                {aboutData.title || "About Our Company"}
              </h1>
              <p className="lead fs-6 fs-md-5 mb-3">
                Leading the healthcare industry with precision, quality, and commitment to patient care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-5 py-md-5">
        <div className="container">
          {/* Intro */}
          <div className="row justify-content-center mb-4 mb-md-5">
            <div className="col-xl-10">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <div className="row align-items-center g-4">
                  <div className="col-lg-8">
                    <h2 className="h4 h-md-3 fw-bold text-primary mb-2">MEDI HOLLOW INSTRUMENTS</h2>
                    <p className="text-muted mb-3 lh-lg">
                      We are a trusted name in <strong>Hospital Holloware and Surgical products</strong>,
                      committed to quality, reliability, and quick dispatch for healthcare professionals.
                    </p>
                    <p className="text-muted lh-lg mb-0">
                      With a vision for excellence, Elite Surgical designs its products to meet the rigorous expectations of the industry.
                    </p>
                  </div>
                  <div className="col-lg-4 text-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-flex">
                      <FaMedal size={56} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="row g-4 mb-4 mb-md-5">
            <div className="col-lg-6">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 h-100">
                <div className="text-center mb-3">
                  <div className="bg-warning bg-opacity-10 rounded-circle p-3 d-inline-flex mb-2">
                    <FaEye size={34} className="text-warning" />
                  </div>
                  <h3 className="h5 h-md-4 fw-bold text-dark">Our Vision</h3>
                </div>
                <p className="text-muted text-center lh-lg mb-0">
                  To be the preferred manufacturer and supplier of high-quality, cost‑effective products.
                  We never compromise on quality because <span className="fw-bold text-primary">Human Life is Precious</span>.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 h-100">
                <div className="text-center mb-3">
                  <div className="bg-danger bg-opacity-10 rounded-circle p-3 d-inline-flex mb-2">
                    <FaBullseye size={34} className="text-danger" />
                  </div>
                  <h3 className="h5 h-md-4 fw-bold text-dark">Our Mission</h3>
                </div>
                <p className="text-muted text-center lh-lg mb-0">
                  Deliver the highest quality products and services at competitive prices, creating lasting value worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="row justify-content-center mb-4 mb-md-5">
            <div className="col-xl-10">
              <div className="text-center mb-3">
                <h2 className="h5 h-md-4 fw-bold text-dark mb-1">Our Commitment</h2>
                <p className="text-muted mb-0">Built on excellence, trust, and reliability</p>
              </div>
              <div className="row g-3 g-md-4">
                <div className="col-md-4">
                  <div className="bg-white rounded-4 shadow-sm p-4 text-center h-100">
                    <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-flex mb-2">
                      <FaAward size={32} className="text-success" />
                    </div>
                    <h4 className="h6 fw-bold text-dark mb-2">Unmatched Quality</h4>
                    <p className="text-muted small mb-0">Rigorous QC to meet international standards.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-white rounded-4 shadow-sm p-4 text-center h-100">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-2">
                      <FaShieldAlt size={32} className="text-primary" />
                    </div>
                    <h4 className="h6 fw-bold text-dark mb-2">Reliability & Trust</h4>
                    <p className="text-muted small mb-0">Consistent performance trusted by clinicians.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-white rounded-4 shadow-sm p-4 text-center h-100">
                    <div className="bg-warning bg-opacity-10 rounded-circle p-3 d-inline-flex mb-2">
                      <FaTruckMoving size={32} className="text-warning" />
                    </div>
                    <h4 className="h6 fw-bold text-dark mb-2">Fast Delivery</h4>
                    <p className="text-muted small mb-0">Quick dispatch for urgent medical needs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row justify-content-center mb-4 mb-md-5">
            <div className="col-xl-10">
              <div
                className="rounded-4 p-4 p-md-5 text-white text-center"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              >
                <div className="row gy-3">
                  <div className="col-4">
                    <FaUsers size={28} className="mb-1 opacity-75" />
                    <h3 className="h4 h-md-2 fw-bold mb-0">500+</h3>
                    <small>Happy Clients</small>
                  </div>
                  <div className="col-4">
                    <FaGlobe size={28} className="mb-1 opacity-75" />
                    <h3 className="h4 h-md-2 fw-bold mb-0">25+</h3>
                    <small>Countries</small>
                  </div>
                  <div className="col-4">
                    <FaMedal size={28} className="mb-1 opacity-75" />
                    <h3 className="h4 h-md-2 fw-bold mb-0">15+</h3>
                    <small>Years</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing */}
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <div className="text-center">
                  <p className="text-muted lh-lg mb-3">
                    Our mission is to enhance patient care and improve operational efficiency with top‑notch holloware products.
                  </p>
                  <div className="border-top pt-3">
                    <h3 className="h5 h-md-4 fw-bold text-primary mb-1">MEDI HOLLOW INSTRUMENTS</h3>
                    <p className="text-muted fw-medium mb-0">Precision. Quality. Care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
