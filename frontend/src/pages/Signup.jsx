import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";

function Signup() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Temporary.
    // Later this will create the actual user profile.
    navigate("/dashboard");
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

          <form onSubmit={handleSignup}>

            <div className="form-row">

              <div className="form-group">
                <label>First Name</label>

                <input
                  type="text"
                  placeholder="First name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
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
                { value: "pursuing-ug", label: "Pursuing UG" },
                { value: "completed-ug", label: "Completed UG" }
                ].map((option) => (

                <button
                    type="button"
                    key={option.value}
                    className={
                    status === option.value
                        ? "status-option active"
                        : "status-option"
                    }
                    onClick={() => setStatus(option.value)}
                >

                    <span>
                    {option.label}
                    </span>

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
              <input type="checkbox" required />

              <span>
                I agree to the Terms of Service and
                Privacy Policy.
              </span>
            </label>

            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
            </button>

          </form>

          <div className="auth-footer">
            <p>
              Already have an account?
              {" "}
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