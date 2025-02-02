import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import GerenciarMercadorias from "./pages/mercadorias";
import Entrada from "./pages/entrada";
import Saida from "./pages/saida";
import ProtectedRoute from "./server/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/mercadorias"
          element={<ProtectedRoute element={<GerenciarMercadorias />} />}
        />
        <Route
          path="/entrada"
          element={<ProtectedRoute element={<Entrada />} />}
        />
        <Route
          path="/saida"
          element={<ProtectedRoute element={<Saida />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
