import React, { useState, useEffect } from "react";
import { FaAward, FaShieldAlt, FaTruckMoving, FaEye, FaBullseye } from "react-icons/fa";

function AboutPage() {
  const [aboutData, setAboutData] = useState({ title: "", description: "" });

  useEffect(() => {
    fetch("/siteConfig.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data.aboutUs))
      .catch((err) => console.error("Error loading siteConfig:", err));
  }, []);

  return (
    <div className="container my-5" style={{ maxWidth: "1500px" }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Title Section */}
          <h1 className="text-center fw-bold text-dark mb-4">
            {aboutData.title || "About Our Company"}
          </h1>

          {/* About Content Card */}
          <div className="shadow-lg border-0">
            <div className="card-body p-5">
              <p className="lead text-dark">
                At <span className="fw-bold">MEDI HOLLOW INSTRUMENTS</span>, we take immense pride in being a trusted name in 
                <span className="fw-bold"> Hospital Holloware and Surgicals products</span>. With a strong commitment to 
                quality, reliability, and quick dispatch, we ensure that healthcare professionals receive 
                the best-in-class equipment for their medical needs. Founded with a vision to deliver high-quality hospital supplies, Elite Surgical
                designes its products meet the rigorous demands and expectation of the healthcare industry.
              </p>

              {/* Vision & Mission Section */}
              <div className="row mt-4">
                {/* Vision Block */}
                <div className="col-md-6">
                  <div className="shadow-sm border-0 h-100">
                    <div className="card-body text-center">
                      <FaEye size={50} className="text-warning mb-2" />
                      <h4 className="fw-bold text-dark">Our Vision</h4>
                      <p className="text-dark">
                        MEDI HOLLOW INSTRUMENTS strives to be the preferred manufacturer & supplier by delivering high-quality, cost-effective products. We prioritize customer needs and never compromise on quality because <span className="fw-bold">"Human Life is Precious"</span>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission Block */}
                <div className="col-md-6">
                  <div className="shadow-sm border-0 h-100">
                    <div className="card-body text-center">
                      <FaBullseye size={50} className="text-danger mb-2" />
                      <h4 className="fw-bold text-dark">Our Mission</h4>
                      <p className="text-dark">
                        Providing the highest quality products and services at the 
                        most competitive prices, creating the best value for our 
                        customers across the globe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitment Section */}
              <h2 className="fw-bold text-dark mt-5 text-center">Our Commitment</h2>
              
              <div className="row text-center mt-4">
                {/* Quality */}
                <div className="col-md-4">
                  <FaAward size={60} className="text-success mb-2" />
                  <h5 className="fw-bold text-dark">Unmatched Quality</h5>
                </div>

                {/* Trust */}
                <div className="col-md-4">
                  <FaShieldAlt size={60} className="text-primary mb-2" />
                  <h5 className="fw-bold text-dark">Reliability & Trust</h5>
                </div>

                {/* Quick Dispatch */}
                <div className="col-md-4">
                  <FaTruckMoving size={60} className="text-danger mb-2" />
                  <h5 className="fw-bold text-dark">Fast & Efficient Delivery</h5>
                </div>
              </div>

              <p className="text-dark mt-4">
                As we continue to expand our presence in the healthcare sector, our mission remains the same – to provide top-notch 
                hospital holloware products that enhance patient care and improve operational efficiency for medical professionals worldwide.
              </p>

              {/* Footer Section */}
              <div className="text-center mt-4">
                <h2 className="fw-bold">
                  MEDI HOLLOW INSTRUMENTS – <span className="text-dark">Precision. Quality. Care.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
