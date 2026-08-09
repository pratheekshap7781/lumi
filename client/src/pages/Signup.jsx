import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  gender: "",
  dateOfBirth: "",
  country: "",
  contactNumber: "",
};

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (Object.values(form).some((value) => !value.trim())) {
      return "Please fill in every field.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await signup(form);
      navigate("/meet-lumi");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <h1 className="text-2xl font-semibold mb-1">Create your Lumi account</h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
          Let's get your learning journey started.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            hint="At least 8 characters"
          />

          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 bg-transparent"
              style={{ borderColor: "var(--color-text-muted)" }}
            >
              <option value="">Select...</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <Field
            label="Date of birth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
          />
          <Field label="Country" name="country" value={form.country} onChange={handleChange} />
          <Field
            label="Contact number"
            name="contactNumber"
            type="tel"
            value={form.contactNumber}
            onChange={handleChange}
          />

          {error && (
            <p className="text-sm rounded-lg px-3 py-2" style={{ color: "#dc2626", backgroundColor: "#fee2e2" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg py-2.5 font-medium text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm mt-6 text-center" style={{ color: "var(--color-text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" className="font-medium" style={{ color: "var(--color-accent)" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", hint }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border px-3 py-2 bg-transparent"
        style={{ borderColor: "var(--color-text-muted)" }}
      />
      {hint && (
        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
