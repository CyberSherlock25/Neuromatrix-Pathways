import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ================= PUBLIC PAGES =================

import Home from "./pages/Home";
import About from "./pages/About";
import WhyCounselling from "./pages/WhyCounselling";
import Insights from "./pages/Insights";
import Services from "./pages/Services";
import Contact from "./pages/Contact";


// ================= AUTH PAGES =================

import Login from "./pages/Login";
import Signup from "./pages/Signup";


// ================= STUDENT PAGES =================

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AssessmentIntro from "./pages/AssessmentIntro";
import Assessment from "./pages/Assessment";
import AssessmentCompleted from "./pages/AssessmentCompleted";
import Report from "./pages/Report";


// ================= ROUTE PROTECTION =================

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";


// ================= AUTH CONTEXT =================

import { AuthProvider } from "./context/AuthContext";


// ================= ADMIN PAGES =================

import AdminDashboard from "./pages/AdminDashboard";
import AdminAssessments from "./pages/AdminAssessments";
import AdminQuestionBank from "./pages/AdminQuestionBank";


function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* =====================================================
              PUBLIC WEBSITE
              ===================================================== */}

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />


          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />


          {/* Why Counselling */}
          <Route
            path="/why-counselling"
            element={<WhyCounselling />}
          />


          {/* Insights */}
          <Route
            path="/insights"
            element={<Insights />}
          />


          {/* Services */}
          <Route
            path="/services"
            element={<Services />}
          />


          {/* Contact */}
          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* =====================================================
              AUTHENTICATION
              ===================================================== */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />


          {/* =====================================================
              STUDENT / PROTECTED ROUTES
              ===================================================== */}

          {/* Student Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* Student Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />


          {/* Assessment Introduction */}
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <AssessmentIntro />
              </ProtectedRoute>
            }
          />


          {/* Assessment Questions */}
          <Route
            path="/assessment/questions"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />


          {/* Assessment Completed */}
          <Route
            path="/assessment/completed"
            element={
              <ProtectedRoute>
                <AssessmentCompleted />
              </ProtectedRoute>
            }
          />


          {/* Student Report */}
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />


          {/* =====================================================
              ADMIN ROUTES
              ===================================================== */}

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />


          {/* Admin Assessments */}
          <Route
            path="/admin/assessments"
            element={
              <AdminRoute>
                <AdminAssessments />
              </AdminRoute>
            }
          />


          {/* Admin Question Bank */}
          <Route
            path="/admin/questions"
            element={
              <AdminRoute>
                <AdminQuestionBank />
              </AdminRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;