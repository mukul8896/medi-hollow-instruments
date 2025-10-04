import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import emailjs from "emailjs-com"; // You'll need to install emailjs-com package
import "../styles/ProductQueryForm.css"; // Optional: Separate CSS for styling

function ProductQueryForm({ show, onClose, product }) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    productName: product?.name || "",
    userName: "",
    email: "",
    query: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setForm((f) => ({ ...f, productName: product?.name || "" }));
  }, [product]);

  if (!show || !mounted) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    // Example EmailJS integration
    try {
      // Replace the following with your EmailJS user ID, service ID, and template ID
      const result = await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          product_name: form.productName,
          user_name: form.userName,
          user_email: form.email,
          user_query: form.query,
        },
        "YOUR_USER_ID"
      );
      setSent(true);
      setLoading(false);
    } catch (err) {
      setError("Failed to send. Please try again.");
      setLoading(false);
    }
  };

  // Optional: WhatsApp send fallback link generation
  const openWhatsApp = () => {
    const text = `Query about product '${form.productName}':
Name: ${form.userName}
Email: ${form.email}
Query: ${form.query}`;
    const url = `https://wa.me/WHATSAPP_NUMBER?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return ReactDOM.createPortal(
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">Product Query</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {!sent ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Product</label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    value={form.productName}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Name</label>
                  <input
                    name="userName"
                    type="text"
                    className="form-control"
                    value={form.userName}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Query</label>
                  <textarea
                    name="query"
                    className="form-control"
                    rows={4}
                    value={form.query}
                    onChange={handleChange}
                    required
                    minLength={10}
                  />
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary flex-fill"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Submit Query"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <small>
                    Or{" "}
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={openWhatsApp}
                      disabled={loading}
                      style={{padding: 0}}
                    >
                      Send via WhatsApp
                    </button>
                  </small>
                </div>
              </form>
            ) : (
              <div className="alert alert-success">
                Thank you! Your query has been sent successfully.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProductQueryForm;
