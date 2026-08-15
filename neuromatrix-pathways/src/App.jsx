import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AssessmentIntro from "./pages/AssessmentIntro";
import Assessment from "./pages/Assessment";
import AssessmentCompleted from "./pages/AssessmentCompleted";
import Report from "./pages/Report";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/assessment"
          element={<AssessmentIntro />}
        />

        <Route
          path="/assessment/questions"
          element={<Assessment />}
        />

        <Route
          path="/assessment/completed"
          element={<AssessmentCompleted />}
        />

        <Route
          path="/report"
          element={<Report />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;