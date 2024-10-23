import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import { useState, useEffect } from "react";
import axios from "axios";

interface Booze {
	volume: number;
	percent: number;
	name: string;
	brand: string;
	notes?: string;
}

export default function Navbar() {
	const navigate = useNavigate();
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [dropOutVisible, setDropOutVisible] = useState(false);
	const [dropdownContent, setDropdownContent] = useState("");

	// Fetch from localStorage when the component mounts
	useEffect(() => {
		if (localStorage.getItem("savedBooze") === null) {
			localStorage.setItem("savedBooze", JSON.stringify([]));
		}

		const savedPrompt = localStorage.getItem("gptPrompt");
		if (savedPrompt === null) {
			const defaultPrompt =
				"Give me 5 recipes (only ingredients and instructions formatted in a good way) in metric using this data:";
			localStorage.setItem("gptPrompt", JSON.stringify(defaultPrompt));
			setDropdownContent(defaultPrompt);
		} else {
			setDropdownContent(JSON.parse(savedPrompt));
		}
	}, []);

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const toggleDropOut = () => {
		setDropOutVisible(!dropOutVisible);
	};

	const handlePostRequest = async () => {
		const logMessage = "Test";
		sendPostRequest(logMessage);
	}

	// Function to send a POST request to the server
	const sendPostRequest = async (logMessage: string) => {
		try {
			const response = await axios.post('https://localhost:7130/api/stringlogger/logstring', logMessage, {
				headers: {
					'Content-Type': 'application/json', // Set Content-Type
				},
			});
			console.log(response.data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<nav className="navbar">
			<h1
				onClick={() => navigate("/")}
				onKeyUp={(e) => e.key === "Enter" && navigate("/")}
				className="pressable"
			>
				Boozer
			</h1>

			<button type="button" onClick={handlePostRequest} className="menu-toggle">
				POST
			</button>

			{location.pathname === "/spritskap" && (
				<div className="boozeButtons">
					<button
						type="button"
						className="menu-toggle copy-button"
						onClick={toggleDropdown}
						onKeyUp={(e) => e.key === "Enter" && toggleDropdown()}
					>
						Prompt
					</button>

					{dropdownVisible && (
						<div className="dropdown">
							<textarea
								value={dropdownContent}
								onChange={(e) => {
									const newContent = e.target.value;
									localStorage.setItem("gptPrompt", JSON.stringify(newContent));
									setDropdownContent(newContent);
								}}
							/>
						</div>
					)}

					<button
						className="copy-button"
						type="button"
						onClick={() => {
							const dataNoImages = JSON.parse(
								localStorage.getItem("savedBooze") || "[]",
							).map((booze: Booze) => {
								return `* ${booze.name} ${booze.brand} ${booze.volume}ml ${
									booze.percent
								}% \nnotes: ${booze.notes || ""}\n\n`;
							});
							navigator.clipboard.writeText(
								`${dropdownContent}\n${dataNoImages.join("")}`,
							);
						}}
					>
						Copy
					</button>

					<a
						href="https://chat.openai.com/"
						target="_blank"
						className="chatgpt-button"
						rel="noreferrer"
					>
						<img
							src="https://openai.com/favicon.ico"
							alt="ChatGPT Logo"
							className="chatgpt-logo"
						/>
					</a>

					<button
						className="copy-button clear-button"
						type="button"
						onClick={() => {
							localStorage.setItem("savedBooze", JSON.stringify([]));
						}}
					>
						Clear
					</button>
				</div>
			)}

			<div
				className="pressable navbar-logo"
				style={{ backgroundImage: `url(${logo})` }}
				onClick={() => toggleDropOut()}
				onKeyUp={(e) => e.key === "Enter" && toggleDropOut()}
			/>

			{dropOutVisible && (
				<div className="navMenu">
					<div
						className="navMenuClose pressable"
						onClick={() => toggleDropOut()}
						onKeyUp={(e) => e.key === "Enter" && toggleDropOut()}
					>
						<h2>X</h2>
					</div>

					<button
						type="button"
						onClick={() => navigate("/")}
						onKeyUp={(e) => e.key === "Enter" && navigate("/")}
						className={`nav-button ${
							location.pathname === "/" ? "active" : ""
						}`}
					>
						Home
					</button>

					<button
						type="button"
						onClick={() => navigate("/spritskap")}
						onKeyUp={(e) => e.key === "Enter" && navigate("/spritskap")}
						className={`nav-button ${
							location.pathname === "/spritskap" ? "active" : ""
						}`}
					>
						SpritSkåp
					</button>
				</div>
			)}
		</nav>
	);
}
