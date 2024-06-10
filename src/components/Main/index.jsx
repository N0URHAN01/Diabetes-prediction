import { useState } from "react";
import axios from "axios"; // Import axios
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const url = "https://inti0x1-diabetes-api.onrender.com/auth/logout"; // Endpoint for user logout
			await axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); // Send logout request with token in headers
			localStorage.removeItem("token"); // Remove token from localStorage
			navigate("/login"); // Redirect to login page
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.error);
			}
		}
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			{error && <div className={styles.error_msg}>{error}</div>}
		</div>
	);
};

export default Main;
