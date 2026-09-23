import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import api from "../api/client";

function Signup() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (!status) {
      setError("Please choose your student status.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register/", {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
        student_status: status,
      });

      navigate("/login");
    } catch (err) {
      const data = err.response?.data;

      if (data) {
        const messages = Object.entries(data)
          .map(([field, value]) => {
            const message = Array.isArray(value)
              ? value.join(" ")
              : value;

            return `${field}: ${message}`;
          })
          .join("\n");

        setError(messages);
      } else {
        setError(
          "Unable to create your account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container signup-container">

        <Link to="/" className="auth-logo">
          NeuroMatrix <span>Pathways</span>
        </Link>

        <div className="auth-card">

          <div className="auth-header">
            <h1>Create your account</h1>

            <p>
              Start your NeuroMatrix Pathways journey.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error.split("\n").map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          )}

          <form onSubmit={handleSignup}>

            <div className="form-row">

              <div className="form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="status-section">

              <label className="status-label">
                Choose your status as a student
              </label>

              <div className="status-grid">

                {[
                  { value: "8th", label: "8th" },
                  { value: "9th", label: "9th" },
                  { value: "10th", label: "10th" },
                  { value: "11th", label: "11th" },
                  { value: "12th", label: "12th" },
                  {
                    value: "pursuing-ug",
                    label: "Pursuing UG",
                  },
                  {
                    value: "completed-ug",
                    label: "Completed UG",
                  },
                ].map((option) => (

                  <button
                    type="button"
                    key={option.value}
                    className={
                      status === option.value
                        ? "status-option active"
                        : "status-option"
                    }
                    onClick={() =>
                      setStatus(option.value)
                    }
                  >
                    <span>{option.label}</span>

                    {status === option.value && (
                      <span className="status-check">
                        ✓
                      </span>
                    )}
                  </button>

                ))}

              </div>
            </div>

            <label className="terms">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the Terms of Service and
                Privacy Policy.
              </span>

            </label>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}

              <Link to="/login">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;