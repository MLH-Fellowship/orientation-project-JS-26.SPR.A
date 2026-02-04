/**
 * Contact validation – international phone (country code required) and email.
 */

// Phone must start with + and a valid country code (1–4 digits, no leading zero), then number
const PHONE_REGEX = /^\+[1-9]\d{0,3}[\s\-]?[\d\s\-]{6,}$/;

export function validatePhone(value) {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length < 8) return "Phone number is too short";
  if (!PHONE_REGEX.test(value.trim())) {
    return "Use international format: +[country code] then number (e.g. +1 555 123 4567)";
  }
  return null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
  if (!value || !value.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address";
  return null;
}

export function validateName(value) {
  if (!value || !value.trim()) return "Name is required";
  return null;
}

export function validateContact({ name, phone, email }) {
  const errors = {};
  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;
  const phoneErr = validatePhone(phone);
  if (phoneErr) errors.phone = phoneErr;
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  return Object.keys(errors).length ? errors : null;
}
