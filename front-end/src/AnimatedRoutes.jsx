import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "@/pages/LoginPage/RegisterPage.jsx";
import Formulaire from "./pages/Formulaire/Formulaire";
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
          path="/dashboard"
          element={
            <Transition key="dashboard">
              <Dashboard />
            </Transition>
          }
        />
        <Route
          path="/login"
          element={
            <Transition key="login">
              <LoginPage />
            </Transition>
          }
        />
        <Route
          path="/register"
          element={
            <Transition key="register">
              <RegisterPage />
            </Transition>
          }
        />

        <Route
          path="/formulaire"
          element={
            <Transition key="formulaire">
              <Formulaire />
            </Transition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
