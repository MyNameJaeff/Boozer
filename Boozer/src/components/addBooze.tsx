import { type FormEvent, useState } from "react";

interface Booze {
	volume: number;
	percent: number;
	name: string;
	brand: string;
	imageUrl: string;
	notes?: string;
}
interface AddBoozeProps {
	setSavedBooze: (booze: Booze[]) => void; // Define the props correctly
}

export default function AddBooze({ setSavedBooze }: AddBoozeProps) {
	const [volume, setAmount] = useState(""); // State for the volume of the booze
	const [percent, setPrice] = useState(""); // State for the percent of the booze
	const [name, setName] = useState(""); // State for the name of the booze
	const [brand, setType] = useState(""); // State for the brand of the booze
	const [imageUrl, setImageUrl] = useState(""); // State for the image URL of the booze
	const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the popup

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const booze: Booze = {
				volume: Number(volume),
				percent: Number(percent),
				name,
				brand,
				imageUrl,
				notes: "",
			};

			if (imageUrl === "") {
				booze.imageUrl =
					"https://media.wired.com/photos/5926ba4f8d4ebc5ab806b486/master/w_2560%2Cc_limit/Booze-152406106.jpg";
			}

			// Save the booze to localStorage
			const savedBooze = JSON.parse(localStorage.getItem("savedBooze") || "[]");
			localStorage.setItem(
				"savedBooze",
				JSON.stringify([...savedBooze, booze]),
			);
			setSavedBooze([...savedBooze, booze]);

			// Reset input fields
			setAmount("");
			setPrice("");
			setName("");
			setType("");
			setImageUrl("");
			setIsOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="addBooze">
			<button
				className="circle-button addBoozebutton"
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span className="plus-sign">+</span>
			</button>

			{isOpen && (
				<div className="addForm">
					<button
						className="close-button"
						type="button"
						onClick={() => setIsOpen(false)}
					>
						<span className="plus-sign">✖</span>
					</button>
					<h1>Add Booze</h1>
					<form onSubmit={handleSubmit}>
						<label>
							Volume (ml):
							<input
								placeholder="Ex. 700, 750, etc."
								required
								type="text"
								value={volume}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</label>
						<label>
							Percent (%):
							<input
								placeholder="Ex. 40, 50, etc."
								required
								type="text"
								value={percent}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</label>
						<label>
							Name:
							<input
								placeholder="Ex. Absolut Vodka, etc."
								required
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label>
							Brand:
							<input
								placeholder="Ex. Absolut, Bacardi, etc."
								required
								type="text"
								value={brand}
								onChange={(e) => setType(e.target.value)}
							/>
						</label>
						<label>
							Image URL:
							<input
								placeholder="Not required, but recommended"
								type="text"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							/>
						</label>
						<button type="submit">ADD</button>
					</form>
				</div>
			)}
		</div>
	);
}
