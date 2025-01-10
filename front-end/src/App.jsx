import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.scss";
import { AppContextProvider } from "./Context";
import Header from "./components/Header/Header";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);



import HomePage from "./pages/HomePage/HomePage";
import Transition from "./components/Transition/Transition";
import Dashboard from "./pages/Dashboard/Dashboard";  
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "@/pages/LoginPage/RegisterPage.jsx";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/login") || location.pathname.startsWith("/register");

  return (
    <div className={styles.main}>
      {!isDashboard && <Header />}
      <AnimatedRoutes /> 
    </div>
      <div className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router> 
      <AppContextProvider>
        <App /> 
      </AppContextProvider>
    </Router>
  );
}
