/**
 * Skill API – GET list and POST new skill to /resume/skill
 *
 * POST body format:
 * { "name": "JavaScript", "proficiency": "2-4 years", "logo": "example-logo.png" }
 *
 * POST response: { "id": 1 } (position in the list)
 */
const BASE_URL = process.env.REACT_APP_API_URL || "";

export async function getSkills() {
  const res = await fetch(`${BASE_URL}/resume/skill`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to load skills");
  return res.json();
}

/**
 * POST a new skill to /resume/skill.
 * @param {Object} skill - { name, proficiency, logo }
 * @returns {Promise<{ id: number }>}
 */
export async function addSkill(skill) {
  const res = await fetch(`${BASE_URL}/resume/skill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(skill),
  });
  if (!res.ok) throw new Error("Failed to add skill");
  return res.json();
}
