import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary navigation.
    // Real authentication will be added later.
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <Link to="/" className="auth-logo">
          NeuroMatrix <span>Pathways</span>
        </Link>

        <div className="auth-card">

          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>
              Login to continue your NeuroMatrix journey.
            </p>
          </div>

          <form onSubmit={handleLogin}>

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
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
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
            >
              Login
            </button>

          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?
              {" "}
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