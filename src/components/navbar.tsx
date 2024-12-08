import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import { useState, useEffect } from "react";

interface Booze {
	volume: number;
	percent: number;
	name: string;
	brand: string;
	notes?: string;
}

export default function Navbar() {
	const promptText = `Fill in all blank data exept notes, split each data into it's own array but keep it in one text-area. Give me data in the form of: "booze": [{"name": "", "brand": "", "volume": , "percent": , "notes": "", "imageUrl": ""}], "extra": [{"name": "", "amount": "", "notes": "", "imageUrl": ""}]

Booze:  

Extra: `;
	const navigate = useNavigate();
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [dropdown2Visible, setDropdown2Visible] = useState(false);
	const [dropOutVisible, setDropOutVisible] = useState(false);
	const [dropdownContent, setDropdownContent] = useState("");

	const [replaceData, setReplaceData] = useState("");

	// Fetch from localStorage when the component mounts
	useEffect(() => {
		if (localStorage.getItem("savedBooze") === null) {
			localStorage.setItem("savedBooze", JSON.stringify([]));
		}

		const savedPrompt = localStorage.getItem("gptPrompt");
		if (savedPrompt === null) {
			const defaultPrompt =
				"Give me 5 random recipes (only ingredients and instructions formatted in a good way) in metric using this data, try to make them as diffrent as possible:";
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

	const copyToClipboard = () => {
		const textarea = document.createElement("textarea");
		textarea.value = promptText;
		textarea.setAttribute("readonly", "");
		textarea.style.position = "absolute";
		textarea.style.left = "-9999px";
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);

		alert("Prompt copied to clipboard!");
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

			{location.pathname === "/inventory" && (
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

					{dropdown2Visible && (
						<div className="dropdown2">
							<p>Copy this prompt, then write your data after each `:`</p>
							<textarea
								readOnly
								value={promptText}
								style={{
									width: "100%",
									height: "100px",
									padding: "8px",
									marginBottom: "8px",
								}}
							/>
							<button
								type="button"
								onClick={copyToClipboard}
								className="clipboard-button"
							>
								Copy Text
							</button>{" "}
							<p>Paste your response below and press the send button</p>
							<textarea
								value={replaceData}
								onChange={(e) => setReplaceData(e.target.value)}
								placeholder="Paste your JSON response here..."
								style={{
									width: "100%",
									height: "150px",
									border: "1px solid #ccc",
									padding: "8px",
								}}
							/>
							<input
								type="submit"
								className="send-button"
								value="Send"
								onClick={() => {
									// Example JSON data
									const data = JSON.parse(replaceData);

									// Save "booze" data
									try {
										const savedBooze = JSON.parse(
											localStorage.getItem("savedBooze") || "[]",
										);
										const updatedBooze = [...savedBooze, ...data.booze];
										localStorage.setItem(
											"savedBooze",
											JSON.stringify(updatedBooze),
										);
										//setSavedBooze(updatedBooze); // Assuming you have a state hook
									} catch (error) {
										console.error("Error saving booze data:", error);
									}

									// Save "extra" data
									try {
										const savedExtras = JSON.parse(
											localStorage.getItem("savedExtras") || "[]",
										);
										const updatedExtras = [...savedExtras, ...data.extra];
										localStorage.setItem(
											"savedExtras",
											JSON.stringify(updatedExtras),
										);
										//setSavedExtras(updatedExtras); // Assuming you have a state hook
									} catch (error) {
										console.error("Error saving extra data:", error);
									}

									// Reload the page
									window.location.reload();
								}}
							/>
						</div>
					)}

					<button
						className="copy-button"
						type="button"
						onClick={() => {
							const boozeDataNoImages = JSON.parse(
								localStorage.getItem("savedBooze") || "[]",
							).map((booze: Booze) => {
								return `* ${booze.name} ${booze.brand} ${booze.volume}ml ${booze.percent}% \nnotes: ${booze.notes || ""}\n\n`;
							});

							const extrasDataNoImages = JSON.parse(
								localStorage.getItem("savedExtras") || "[]",
							).map(
								(extra: { name: string; amount: string; notes?: string }) => {
									return `* ${extra.name} ${extra.amount} \nnotes: ${extra.notes || ""}\n\n`;
								},
							);

							navigator.clipboard.writeText(
								`${dropdownContent}\n${boozeDataNoImages.join("")} I also have these extras: \n${extrasDataNoImages.join("")}`,
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
							// Prompt the user before deleting
							if (
								!window.confirm(
									"Are you sure you want to clear your inventory?",
								)
							) {
								return;
							}

							localStorage.setItem("savedBooze", JSON.stringify([]));
							localStorage.setItem("savedExtras", JSON.stringify([]));
						}}
					>
						Clear
					</button>
					<button
						className="copy-button add-button"
						type="button"
						onClick={() => {
							setDropdown2Visible(!dropdown2Visible);
						}}
					>
						Add
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
						onClick={() => navigate("/inventory")}
						onKeyUp={(e) => e.key === "Enter" && navigate("/inventory")}
						className={`nav-button ${
							location.pathname === "/inventory" ? "active" : ""
						}`}
					>
						Inventory
					</button>

					<button
						type="button"
						onClick={() => navigate("/recipes")}
						onKeyUp={(e) => e.key === "Enter" && navigate("/recipes")}
						className={`nav-button ${
							location.pathname === "/recipes" ? "active" : ""
						}`}
					>
						Recipes
					</button>

					<button
						type="button"
						onClick={() => navigate("/about")}
						onKeyUp={(e) => e.key === "Enter" && navigate("/about")}
						className={`nav-button ${
							location.pathname === "/about" ? "active" : ""
						}`}
					>
						About
					</button>
				</div>
			)}
		</nav>
	);
}
