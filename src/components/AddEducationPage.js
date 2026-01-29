import { useState } from "react";
import { addEducation } from "../api/education";

const initialForm = {
  course: "",
  school: "",
  start_date: "",
  end_date: "",
  grade: "",
  logo: "",
};

function AddEducationPage() {
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
    if (!form.course.trim()) next.course = "Course is required";
    if (!form.school.trim()) next.school = "School is required";
    if (!form.start_date.trim()) next.start_date = "Start date is required";
    if (!form.end_date.trim()) next.end_date = "End date is required";
    if (!form.grade.trim()) next.grade = "Grade is required";
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
      course: form.course.trim(),
      school: form.school.trim(),
      start_date: form.start_date.trim(),
      end_date: form.end_date.trim(),
      grade: form.grade.trim(),
      logo: form.logo.trim(),
    };
    addEducation(payload)
      .then((data) => {
        setLastAddedId(data?.id != null ? data.id : null);
        setForm(initialForm);
      })
      .catch((err) => setApiError(err.message || "Request failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="resumeSection addEducationPage">
      <h2>Add a new Education</h2>
      {apiError && (
        <p className="addEducationError" role="alert">
          {apiError}
        </p>
      )}
      {lastAddedId != null && (
        <p className="addEducationSuccess" role="status">
          Education added at position {lastAddedId}
        </p>
      )}
      <form onSubmit={handleSubmit} className="addEducationForm" noValidate>
        <div className="addEducationField">
          <label htmlFor="education-course">Course</label>
          <input
            id="education-course"
            name="course"
            type="text"
            value={form.course}
            onChange={handleChange}
            placeholder="e.g. Engineering"
            aria-invalid={!!errors.course}
            aria-describedby={
              errors.course ? "education-course-error" : undefined
            }
          />
          {errors.course && (
            <span
              id="education-course-error"
              className="addEducationFieldError"
            >
              {errors.course}
            </span>
          )}
        </div>
        <div className="addEducationField">
          <label htmlFor="education-school">School</label>
          <input
            id="education-school"
            name="school"
            type="text"
            value={form.school}
            onChange={handleChange}
            placeholder="e.g. NYU"
            aria-invalid={!!errors.school}
            aria-describedby={
              errors.school ? "education-school-error" : undefined
            }
          />
          {errors.school && (
            <span
              id="education-school-error"
              className="addEducationFieldError"
            >
              {errors.school}
            </span>
          )}
        </div>
        <div className="addEducationField">
          <label htmlFor="education-start_date">Start date</label>
          <input
            id="education-start_date"
            name="start_date"
            type="text"
            value={form.start_date}
            onChange={handleChange}
            placeholder="e.g. October 2022"
            aria-invalid={!!errors.start_date}
            aria-describedby={
              errors.start_date ? "education-start_date-error" : undefined
            }
          />
          {errors.start_date && (
            <span
              id="education-start_date-error"
              className="addEducationFieldError"
            >
              {errors.start_date}
            </span>
          )}
        </div>
        <div className="addEducationField">
          <label htmlFor="education-end_date">End date</label>
          <input
            id="education-end_date"
            name="end_date"
            type="text"
            value={form.end_date}
            onChange={handleChange}
            placeholder="e.g. August 2024"
            aria-invalid={!!errors.end_date}
            aria-describedby={
              errors.end_date ? "education-end_date-error" : undefined
            }
          />
          {errors.end_date && (
            <span
              id="education-end_date-error"
              className="addEducationFieldError"
            >
              {errors.end_date}
            </span>
          )}
        </div>
        <div className="addEducationField">
          <label htmlFor="education-grade">Grade</label>
          <input
            id="education-grade"
            name="grade"
            type="text"
            value={form.grade}
            onChange={handleChange}
            placeholder="e.g. 86%"
            aria-invalid={!!errors.grade}
            aria-describedby={
              errors.grade ? "education-grade-error" : undefined
            }
          />
          {errors.grade && (
            <span id="education-grade-error" className="addEducationFieldError">
              {errors.grade}
            </span>
          )}
        </div>
        <div className="addEducationField">
          <label htmlFor="education-logo">Logo (URL to image)</label>
          <input
            id="education-logo"
            name="logo"
            type="text"
            value={form.logo}
            onChange={handleChange}
            placeholder="e.g. example-logo.png or https://..."
            aria-invalid={!!errors.logo}
            aria-describedby={errors.logo ? "education-logo-error" : undefined}
          />
          {errors.logo && (
            <span id="education-logo-error" className="addEducationFieldError">
              {errors.logo}
            </span>
          )}
        </div>
        <div className="addEducationActions">
          <button type="submit" disabled={loading}>
            {loading ? "Adding…" : "Add Education"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEducationPage;
