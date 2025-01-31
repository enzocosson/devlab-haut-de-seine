import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "@/pages/LoginPage/RegisterPage.jsx";
import Profil from "./pages/Profil/Profil.jsx";

import Formulaire from "./pages/Formulaire/Formulaire";
import Confirmation from "./pages/Confirmation/Confirmation";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Transition from "./components/Transition/Transition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Transition key="homePage">
              <HomePage />
            </Transition>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            location.pathname === "/dashboard" ? (
              <Transition key="dashboard">
                <Dashboard />
              </Transition>
            ) : (
              <Dashboard />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/formulaire"
          element={
            <Transition key="formulaire">
              <Formulaire />
            </Transition>
          }
        />

        <Route
          path="/confirmation"
          element={
            <Transition key="confirmation">
              <Confirmation />
            </Transition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
