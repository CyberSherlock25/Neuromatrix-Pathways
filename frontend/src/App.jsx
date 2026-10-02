import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* ================= PUBLIC PAGES ================= */

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* ================= STUDENT PAGES ================= */

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AssessmentIntro from "./pages/AssessmentIntro";
import Assessment from "./pages/Assessment";
import AssessmentCompleted from "./pages/AssessmentCompleted";
import Report from "./pages/Report";

/* ================= ADMIN PAGES ================= */

import AdminDashboard from "./pages/AdminDashboard";
import AdminAssessments from "./pages/AdminAssessments";
import AdminQuestionBank from "./pages/AdminQuestionBank";

/* ================= ROUTE PROTECTION ================= */

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

/* ================= AUTH ================= */

import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          {/* =====================================================
              PUBLIC
              ===================================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />


          {/* =====================================================
              STUDENT
              ===================================================== */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />


          {/* =====================================================
              ASSESSMENT
              ===================================================== */}

          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <AssessmentIntro />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assessment/questions"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assessment/completed"
            element={
              <ProtectedRoute>
                <AssessmentCompleted />
              </ProtectedRoute>
            }
          />


          {/* =====================================================
              REPORT
              ===================================================== */}

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />


          {/* =====================================================
              ADMIN
              ===================================================== */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/assessments"
            element={
              <AdminRoute>
                <AdminAssessments />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/questions"
            element={
              <AdminRoute>
                <AdminQuestionBank />
              </AdminRoute>
            }
          />


          {/* =====================================================
              FALLBACK
              ===================================================== */}

          <Route
            path="*"
            element={<Home />}
          />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;