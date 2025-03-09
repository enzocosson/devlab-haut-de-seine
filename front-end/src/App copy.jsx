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


  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/login") || location.pathname.startsWith("/register");

  return (
    <div className={styles.main}>
      {!isDashboard && <Header />}
      <AnimatedRoutes /> 
    </div>
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
