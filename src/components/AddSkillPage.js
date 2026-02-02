import { useState } from "react";
import { addSkill } from "../api/skill";

const initialForm = { name: "", proficiency: "", logo: "" };

function AddSkillPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [lastAddedId, setLastAddedId] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    setLastAddedId(null);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.proficiency.trim()) next.proficiency = "Proficiency is required";
    if (!form.logo.trim()) next.logo = "Logo (URL) is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError(null);
    setLastAddedId(null);
    if (!validate()) return;

    setLoading(true);
    const payload = {
      name: form.name.trim(),
      proficiency: form.proficiency.trim(),
      logo: form.logo.trim(),
    };
    addSkill(payload)
      .then((data) => {
        const id = data?.id != null ? data.id : null;
        setLastAddedId(id);
        setForm(initialForm);
        alert(id != null ? `Skill added at position ${id}` : "Skill added.");
      })
      .catch((err) => {
        const msg = err.message || "Request failed";
        setApiError(msg);
        alert(msg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="resumeSection addSkillPage">
      <h2>Add a new Skill</h2>
      {apiError && (
        <p className="addSkillError" role="alert">
          {apiError}
        </p>
      )}
      {lastAddedId != null && (
        <p className="addSkillSuccess" role="status">
          Skill added at position {lastAddedId}
        </p>
      )}
      <form onSubmit={handleSubmit} className="addSkillForm" noValidate>
        <div className="addSkillField">
          <label htmlFor="skill-name">Name</label>
          <input
            id="skill-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. JavaScript"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "skill-name-error" : undefined}
          />
          {errors.name && (
            <span id="skill-name-error" className="addSkillFieldError">
              {errors.name}
            </span>
          )}
        </div>
        <div className="addSkillField">
          <label htmlFor="skill-proficiency">Proficiency</label>
          <input
            id="skill-proficiency"
            name="proficiency"
            type="text"
            value={form.proficiency}
            onChange={handleChange}
            placeholder="e.g. 2-4 years"
            aria-invalid={!!errors.proficiency}
            aria-describedby={
              errors.proficiency ? "skill-proficiency-error" : undefined
            }
          />
          {errors.proficiency && (
            <span id="skill-proficiency-error" className="addSkillFieldError">
              {errors.proficiency}
            </span>
          )}
        </div>
        <div className="addSkillField">
          <label htmlFor="skill-logo">Logo (URL to image)</label>
          <input
            id="skill-logo"
            name="logo"
            type="text"
            value={form.logo}
            onChange={handleChange}
            placeholder="e.g. example-logo.png or https://..."
            aria-invalid={!!errors.logo}
            aria-describedby={errors.logo ? "skill-logo-error" : undefined}
          />
          {errors.logo && (
            <span id="skill-logo-error" className="addSkillFieldError">
              {errors.logo}
            </span>
          )}
        </div>
        <div className="addSkillActions">
          <button type="submit" disabled={loading}>
            {loading ? "Adding…" : "Add Skill"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSkillPage;
