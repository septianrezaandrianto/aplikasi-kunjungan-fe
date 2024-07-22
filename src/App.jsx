import AppAdmin from "./components/admin/AppAdmin";
import Home from "./components/guest/Home";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import PrivateRoute from './components/admin/PrivateRoute'; // Import komponen PrivateRoute

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={
          <PrivateRoute>
            <AppAdmin />
          </PrivateRoute>
        } />
      </Routes>
  );
}

export default App;
