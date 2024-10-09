import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";

export default function Navbar() {
	const navigate = useNavigate(); // Use useNavigate for navigation
	if (localStorage.getItem("savedBooze") === null) {
		localStorage.setItem("savedBooze", JSON.stringify([]));
	}
	return (
		<nav className="navbar">
			<h1
				onClick={() => navigate("/")}
				onKeyUp={(e) => e.key === "Enter" && navigate("/")}
				tabIndex={0}
				// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <I want text to be button>
				role="button"
			>
				Boozer
			</h1>
			{
				// If the user is on the spritskap page, show the copy button in the middle of the navbar
				location.pathname === "/spritskap" && (
					<div className="boozeButtons">
						<button
							className="copy-button"
							type="button"
							onClick={() => {
								const dataNoImages = JSON.parse(
									localStorage.getItem("savedBooze") || "[]",
								).map(
									(booze: {
										name: string;
										brand: string;
										volume: number;
										percent: number;
										notes?: string;
									}) => {
										return `* ${booze.name} ${booze.brand} ${booze.volume}ml ${booze.percent}% \nnotes: ${booze.notes}\n\n`;
									},
								);
								navigator.clipboard.writeText(
									`Give me 5 recepies (only ingredients and instructions formatted in a good way) in metric using this data: \n${dataNoImages || ""}`,
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
							onClick={() =>
								localStorage.setItem("savedBooze", JSON.stringify([]))
							}
						>
							Clear
						</button>
					</div>
				)
			}
			<img src={logo} alt="logo" />
		</nav>
	);
}
