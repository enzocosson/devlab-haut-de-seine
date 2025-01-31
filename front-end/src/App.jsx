import { useEffect } from "react";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
	Link,
} from "react-router-dom";
import styles from "./App.module.scss";
import { AppContextProvider } from "./Context";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AnimatedRoutes from "./AnimatedRoutes";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "@/pages/LoginPage/RegisterPage.jsx";

function App() {
	const location = useLocation();
	const showHeader =
		location.pathname.startsWith("/login") ||
		location.pathname.startsWith("/register");

	return (
		<div className={styles.main}>
			{/* {!isDashboard && <Header />} */}
			{!showHeader && <Header />}
			<div className={styles.container}>
				<AnimatedRoutes />
			</div>
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
