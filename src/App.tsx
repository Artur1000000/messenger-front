import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import "./App.css";
import DashboardPage from "./Pages/Dashboard";
import { Layout } from "./Components/Layout";
import { useAppSelector } from "./hook";

function App() {
  const { userName, id } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(userName && id){
      return navigate("/dashboard")
    }
    navigate("/login")
  }, [userName, id, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
