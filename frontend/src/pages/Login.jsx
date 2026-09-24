import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import "../App.css";

import { useAuth } from "../context/AuthContext";


function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
          const loggedInUser = await login(
            formData.username,
            formData.password
          );

          if (loggedInUser.is_staff) {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
     } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        setError(
          "Invalid username or password."
        );
      } else {
        setError(
          "Unable to login. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page">

      <div className="auth-container">

        <Link
          to="/"
          className="auth-logo"
        >
          NeuroMatrix{" "}
          <span>Pathways</span>
        </Link>


        <div className="auth-card">

          <div className="auth-header">

            <h1>
              Welcome back
            </h1>

            <p>
              Login to continue your
              NeuroMatrix journey.
            </p>

          </div>


          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label>
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-options">

              <label className="remember">

                <input
                  type="checkbox"
                />

                Remember me

              </label>


              <button
                type="button"
                className="forgot-btn"
              >
                Forgot password?
              </button>

            </div>


            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>


          <div className="auth-footer">

            <p>

              Don't have an account?{" "}

              <Link to="/signup">
                Create an account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;