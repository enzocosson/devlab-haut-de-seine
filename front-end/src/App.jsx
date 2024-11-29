import { Route, BrowserRouter as Router, Routes, Navigate, useLocation } from "react-router-dom";
import styles from "./App.module.scss";
import { AppContextProvider } from "./Context";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Transition from "./components/Transition/Transition";
import Dashboard from "./pages/Dashboard/Dashboard";  
import GivePage from "./pages/GivePage/GivePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilPage/ProfilPage";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/login") || location.pathname.startsWith("/register");

  return (
    <>
      <Transition />
      {!isDashboard && <Header />}
      <div className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AppContextProvider>
      <Router>
        <AppContent />
      </Router>
    </AppContextProvider>
  );
}

export default App;
