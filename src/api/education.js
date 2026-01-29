/**
 * Education API – GET list and POST new education to /resume/education
 *
 * POST body format:
 * {
 *   "course": "Engineering",
 *   "school": "NYU",
 *   "start_date": "October 2022",
 *   "end_date": "August 2024",
 *   "grade": "86%",
 *   "logo": "example-logo.png"
 * }
 *
 * POST response: { "id": 1 } (position in the list)
 */
const BASE_URL = process.env.REACT_APP_API_URL || "";

export async function getEducation() {
  const res = await fetch(`${BASE_URL}/resume/education`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to load education");
  return res.json();
}

/**
 * POST a new education entry to /resume/education.
 * @param {Object} education - { course, school, start_date, end_date, grade, logo }
 * @returns {Promise<{ id: number }>}
 */
export async function addEducation(education) {
  const res = await fetch(`${BASE_URL}/resume/education`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(education),
  });
  if (!res.ok) throw new Error("Failed to add education");
  return res.json();
}
