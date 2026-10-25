import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import WhyCounselling from "./pages/WhyCounselling";
import Insights from "./pages/Insights";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AssessmentIntro from "./pages/AssessmentIntro";
import Assessment from "./pages/Assessment";
import AssessmentCompleted from "./pages/AssessmentCompleted";
import Report from "./pages/Report";

import AdminDashboard from "./pages/AdminDashboard";
import AdminAssessments from "./pages/AdminAssessments";
import AdminQuestionBank from "./pages/AdminQuestionBank";
import AdminDimensions from "./pages/AdminDimensions";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-counselling" element={<WhyCounselling />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated user pages */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/assessment"
            element={<ProtectedRoute><AssessmentIntro /></ProtectedRoute>}
          />
          <Route
            path="/assessment/questions"
            element={<ProtectedRoute><Assessment /></ProtectedRoute>}
          />
          <Route
            path="/assessment/completed"
            element={<ProtectedRoute><AssessmentCompleted /></ProtectedRoute>}
          />
          <Route
            path="/report"
            element={<ProtectedRoute><Report /></ProtectedRoute>}
          />

          {/* Admin pages */}
          <Route
            path="/admin"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />
          <Route
            path="/admin/assessments"
            element={<AdminRoute><AdminAssessments /></AdminRoute>}
          />
          <Route
            path="/admin/questions"
            element={<AdminRoute><AdminQuestionBank /></AdminRoute>}
          />
          <Route
            path="/admin/dimensions"
            element={<AdminRoute><AdminDimensions /></AdminRoute>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
