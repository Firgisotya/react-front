import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Kelas from "./Pages/Kelas/Kelas";

function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* route loggedIn */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kelas" element={<Kelas />} />
            <Route path="/jurusan" element={<h1>Settings</h1>} />
            <Route path="/siswa" element={<h1>Settings</h1>} />
          </Route>

        </Routes>
      </Router>
    
  )
}

export default App
