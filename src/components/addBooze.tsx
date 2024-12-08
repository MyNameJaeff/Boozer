import { type FormEvent, useState } from "react";

interface Booze {
	volume: number;
	percent: number;
	name: string;
	brand: string;
	imageUrl: string;
	notes?: string;
}

interface Extras {
	name: string;
	amount: string;
	notes?: string;
	imageUrl: string;
}

interface AddBoozeProps {
	setSavedBooze: (booze: Booze[]) => void;
	setSavedExtras: (extras: Extras[]) => void;
}
export default function AddBooze({
	setSavedBooze,
	setSavedExtras,
}: AddBoozeProps) {
	const [volume, setVolume] = useState("");
	const [percent, setPercent] = useState("");
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [amount, setAmount] = useState("");

	const [isOpen, setIsOpen] = useState(false);
	const [selectedType, setSelectedType] = useState<"booze" | "extra" | "">("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (selectedType === "booze") {
			try {
				const booze: Booze = {
					volume: Number(volume),
					percent: Number(percent),
					name,
					brand,
					imageUrl: imageUrl || "https://via.placeholder.com/150?text=No+Image",
					notes: "",
				};

				const savedBooze = JSON.parse(
					localStorage.getItem("savedBooze") || "[]",
				);
				localStorage.setItem(
					"savedBooze",
					JSON.stringify([...savedBooze, booze]),
				);
				setSavedBooze([...savedBooze, booze]);
			} catch (error) {
				console.error(error);
			}
		} else if (selectedType === "extra") {
			try {
				const extra: Extras = {
					name,
					amount,
					imageUrl: imageUrl || "https://via.placeholder.com/150?text=No+Image",
					notes: "",
				};
				console.log("Extra saved:", extra);
				const savedExtras = JSON.parse(
					localStorage.getItem("savedExtras") || "[]",
				);
				localStorage.setItem(
					"savedExtras",
					JSON.stringify([...savedExtras, extra]),
				);
				setSavedExtras([...savedExtras, extra]);
			} catch (error) {
				console.error(error);
			}
		}

		setVolume("");
		setPercent("");
		setName("");
		setBrand("");
		setImageUrl("");
		setAmount("");
		setSelectedType("");
		setIsOpen(false);
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
					<h1>Add Item</h1>
					<div className="selectTypeButtonDiv">
						<button
							type="button"
							className="selectTypeButton"
							onClick={() => setSelectedType("booze")}
						>
							Booze
						</button>
						<button
							type="button"
							className="selectTypeButton"
							onClick={() => setSelectedType("extra")}
						>
							Extra
						</button>
					</div>

					{selectedType && (
						<form onSubmit={handleSubmit}>
							{selectedType === "booze" && (
								<>
									<label>
										Volume (ml):
										<input
											placeholder="Ex. 700, 750, etc."
											required
											type="text"
											value={volume}
											onChange={(e) => setVolume(e.target.value)}
										/>
									</label>
									<label>
										Percent (%):
										<input
											placeholder="Ex. 40, 50, etc."
											required
											type="text"
											value={percent}
											onChange={(e) => setPercent(e.target.value)}
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
											onChange={(e) => setBrand(e.target.value)}
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
								</>
							)}

							{selectedType === "extra" && (
								<>
									<label>
										Name:
										<input
											placeholder="Extra item name"
											required
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</label>
									<label>
										Amount:
										<input
											placeholder="Quantity (ex. 1000ml, 1kg, etc.)"
											required
											type="text"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
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
								</>
							)}

							<button type="submit">ADD</button>
						</form>
					)}
				</div>
			)}
		</div>
	);
}
