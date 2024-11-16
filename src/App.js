import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { PokemonBattleProvider } from "./context/PokemonBattleContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PokemonBattleProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<DashboardPage />} />
            </Routes>
          </div>
        </PokemonBattleProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
