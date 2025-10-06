import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/ProductQueryForm.css";

function ProductQueryForm({ show, onClose, product }) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    productName: product?.name || "",
    contactNumber: "",
    email: "",
    query: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false); // ✅ new state

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (show) {
      setForm({
        productName: product?.name || "",
        contactNumber: "",
        email: "",
        query: "",
      });
      setSent(false);
      setError("");
    }
  }, [show, product]);

  // ✅ Validation logic - checks if all fields are valid
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid =
      form.contactNumber.trim().length > 0 &&
      emailRegex.test(form.email.trim()) &&
      form.query.trim().length > 0;
    setIsValid(valid);
  }, [form]);

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

    try {
      const resp = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`);
      setSent(true);
    } catch (err) {
      console.error("send email error:", err);
      setError("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const text = `Query about product '${form.productName}':
    Name: ${form.contactNumber}
    Email: ${form.email}
    Query: ${form.query}`;
    const url = `https://wa.me/WHATSAPP_NUMBER?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return ReactDOM.createPortal(
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.55)", zIndex: 9999 }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Query</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => { setSent(false); setError(""); onClose(); }}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Product</label>
                  <input type="text" className="form-control bg-light" value={form.productName} readOnly />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Contact Number</label>
                  <input
                    name="contactNumber"
                    type="tel"
                    inputMode="tel"
                    className="form-control"
                    value={form.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Email Address</label>
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
                    rows={5}
                    value={form.query}
                    onChange={handleChange}
                    required
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
                    disabled={!isValid || loading}  // ✅ only enabled when valid
                  >
                    {loading ? "Sending..." : "Submit Query"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => { setSent(false); setError(""); onClose(); }}
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
                      style={{ padding: 0 }}
                    >
                      Send via WhatsApp
                    </button>
                  </small>
                </div>
              </form>
            ) : (
              <div className="alert alert-success mb-0" role="alert">
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
