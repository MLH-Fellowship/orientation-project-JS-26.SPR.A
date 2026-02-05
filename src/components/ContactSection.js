import { useState, useEffect } from "react";
import { getContact, addContact, updateContact } from "../api/contact";
import { validateContact } from "../utils/contactValidation";

const initialForm = { name: "", phone: "", email: "" };

function ContactSection() {
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getContact()
      .then((data) => {
        if (!cancelled && data && (data.name || data.phone || data.email)) {
          setContact(data);
          setForm({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
          });
        }
      })
      .catch(() => {
        if (!cancelled) setContact(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateContact(form);
    if (validation) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setApiError(null);
    setLoading(true);
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
    };
    const promise = contact ? updateContact(payload) : addContact(payload);
    promise
      .then((data) => {
        setContact(data || payload);
        setForm(data || payload);
        setIsEditing(false);
      })
      .catch((err) => setApiError(err.message || "Request failed"))
      .finally(() => setLoading(false));
  };

  const startEdit = () => {
    setForm(
      contact
        ? {
            name: contact.name || "",
            phone: contact.phone || "",
            email: contact.email || "",
          }
        : initialForm
    );
    setErrors({});
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setForm(contact ? { ...contact } : initialForm);
    setErrors({});
    setIsEditing(false);
  };

  const showForm = isEditing || !contact;

  return (
    <div className="resumeSection">
      <h2>Contact</h2>
      {apiError && (
        <p className="contactError" role="alert">
          {apiError}
        </p>
      )}
      {loading && <p className="contactLoading">Loading…</p>}
      {showForm ? (
        <form onSubmit={handleSubmit} className="contactForm" noValidate>
          <div className="contactField">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <span id="contact-name-error" className="contactFieldError">
                {errors.name}
              </span>
            )}
          </div>
          <div className="contactField">
            <label htmlFor="contact-phone">
              Phone (international with country code)
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +1 555 123 4567"
              aria-invalid={!!errors.phone}
              aria-describedby={
                errors.phone ? "contact-phone-error" : undefined
              }
            />
            {errors.phone && (
              <span id="contact-phone-error" className="contactFieldError">
                {errors.phone}
              </span>
            )}
          </div>
          <div className="contactField">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
            />
            {errors.email && (
              <span id="contact-email-error" className="contactFieldError">
                {errors.email}
              </span>
            )}
          </div>
          <div className="contactActions">
            <button type="submit" disabled={loading}>
              {contact ? "Update contact" : "Add contact"}
            </button>
            {contact && (
              <button type="button" onClick={cancelEdit} disabled={loading}>
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <>
          <div className="contactDisplay">
            <p>
              <strong>Name:</strong> {contact.name}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
          </div>
          <button type="button" onClick={startEdit}>
            Update contact
          </button>
        </>
      )}
    </div>
  );
}

export default ContactSection;
