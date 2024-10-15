import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "react-toastify/dist/ReactToastify.css";
import "sass";
import "./index.scss";

import App from "./App.jsx";
import AddJob from "./page/AddJob.jsx";
import Home from "./page/Home.jsx";
import Job from "./page/Job.jsx";
import Jobs from "./page/Jobs.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import UpdateJob from "./page/UpdateJob.jsx";
import ProtectRoute from "./utils/ProtectRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<Job />} />

          {/* Protect the /admin/addjobs route */}
          <Route
            path="/admin/addjobs"
            element={
              <ProtectRoute roleRequired="admin">
                <AddJob />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/updatejob/:id"
            element={
              <ProtectRoute roleRequired="admin">
                <UpdateJob />
              </ProtectRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
