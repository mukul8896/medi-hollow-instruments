import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import siteConfig from "../siteConfig.json";

function ContactPage() {
  const { address, contact } = siteConfig;

  // Form model matches API: productName, contactNumber, email, query
  const [form, setForm] = useState({
    productName: "General Enquiry", // editable topic
    contactNumber: "",
    email: "",
    query: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  
  // Simple validations
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const topicOk = form.productName.trim().length > 0;
  const phoneOk = form.contactNumber.trim().length > 0;
  const msgOk = form.query.trim().length > 0;
  const isValid = topicOk && phoneOk && emailOk && msgOk;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setSent(false);   // hide previous success when user edits
    setError("");     // clear any previous error
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const resp = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) throw new Error(data.error || `HTTP ${resp.status}`);
      setSent(true);  // show green alert but keep fields editable
    } catch (err) {
      console.error("contact submit error:", err);
      setError("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">Contact Us</h1>

      {/* Top info strip */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div
            className="p-4 rounded-3"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,110,253,.08), rgba(25,135,84,.08))",
              border: "1px solid rgba(0,0,0,.06)",
            }}
          >
            <div className="d-flex flex-wrap align-items-center gap-4">
              <div className="d-flex align-items-center me-auto">
                <FaMapMarkerAlt className="text-danger me-2" size={20} />
                <span className="text-muted">{address}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaPhone className="text-success me-2" size={18} />
                <a href={`tel:${contact.phone[0]}`} className="text-decoration-none">{contact.phone[0]}</a>
              </div>
              <div className="d-flex align-items-center">
                <FaEnvelope className="text-primary me-2" size={18} />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-decoration-none"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form + Details */}
      <div className="row g-4">
        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="p-4 p-md-5 shadow-sm rounded-3 border">
            <h3 className="mb-3">Send Your Query</h3>
            <p className="text-muted mb-4">
              Share the details below and the team will get back shortly.
            </p>

            <form onSubmit={onSubmit} noValidate>
              {/* Query Topic (editable) */}
              <div className="mb-3">
                <label className="form-label">Query Topic</label>
                <input
                  name="productName"
                  type="text"
                  className="form-control"
                  placeholder="e.g., Bulk order for Forceps"
                  value={form.productName}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="mb-3">
                <label className="form-label">Your Contact Number</label>
                <input
                  name="contactNumber"
                  type="tel"
                  inputMode="tel"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={form.contactNumber}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Your Email Address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
                {!emailOk && form.email.length > 0 && (
                  <small className="text-danger">Enter a valid email.</small>
                )}
              </div>

              {/* Message */}
              <div className="mb-3">
                <label className="form-label">Enter Your Query</label>
                <textarea
                  name="query"
                  className="form-control"
                  rows={5}
                  placeholder="How can we help?"
                  value={form.query}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Inline alerts just above the button */}
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              {sent && !error && (
                <div className="alert alert-success mb-3" role="alert">
                  Thank you! The message was sent successfully.
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={!isValid || loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <div className="text-muted small mt-3">
                By submitting, consent is given to be contacted about the enquiry.
              </div>
            </form>
          </div>
        </div>

        {/* Contact Details card */}
        <div className="col-lg-5">
          <div className="p-4 p-md-5 shadow-sm rounded-3 border h-100">
            <h3 className="mb-3">Our Contact Details</h3>
            <ul className="list-unstyled mb-0">
              <li className="d-flex mb-3">
                <FaMapMarkerAlt className="text-danger me-3 mt-1" size={20} />
                <span>{address}</span>
              </li>
              <li className="d-flex mb-3">
                <FaPhone className="text-success me-3 mt-1" size={20} />
                <a href={`tel:${contact.phone[0]}`} className="text-decoration-none">{contact.phone[0]}</a>
              </li>
              <li className="d-flex">
                <FaEnvelope className="text-primary me-3 mt-1" size={20} />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-decoration-none"
                >
                  {contact.email}
                </a>
              </li>
            </ul>

            <hr className="my-4" />
            <div className="small text-muted">
              Mon–Sat, 9:30 AM – 6:30 PM • Expect a response within one business day.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
