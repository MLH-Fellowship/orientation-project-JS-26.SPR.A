export const validateContact = (contact) => {
  const errors = {};

  if (!contact.name || contact.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!contact.email || contact.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = "Email is invalid";
  }

  if (!contact.phone || contact.phone.trim() === "") {
    errors.phone = "Phone is required";
  } else if (!/^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(contact.phone.replace(/\D/g, ""))) {
    errors.phone = "Phone must be a valid 10-digit number";
  }

  return errors;
};
