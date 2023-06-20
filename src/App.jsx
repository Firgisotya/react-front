import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Kelas from "./Pages/Kelas/Kelas";
import Jurusan from "./Pages/Jurusan/Jurusan";
import Siswa from "./Pages/Siswa/Siswa";

function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* route loggedIn */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kelas" element={<Kelas />} />
            <Route path="/jurusan" element={<Jurusan />} />
            <Route path="/siswa" element={<Siswa />} />
          </Route>

        </Routes>
      </Router>
    
  )
}

export default App
