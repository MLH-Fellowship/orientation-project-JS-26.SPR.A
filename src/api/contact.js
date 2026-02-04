/**
 * Contact API – add/update contact info via /resume/contact
 * Configure base URL to point at your Flask backend when deployed.
 */
const BASE_URL = process.env.REACT_APP_API_URL || "";

export async function getContact() {
  const res = await fetch(`${BASE_URL}/resume/user`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to load contact");
  return res.json();
}

export async function addContact(contact) {
  const res = await fetch(`${BASE_URL}/resume/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Failed to add contact");
  return res.json();
}

export async function updateContact(contact) {
  const res = await fetch(`${BASE_URL}/resume/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return res.json();
}
