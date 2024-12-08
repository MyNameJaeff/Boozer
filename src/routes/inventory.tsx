import { useState, useEffect } from "react";
import BoozeCard from "../components/boozeCard";
import ExtraCard from "../components/extraCard"; // Import ExtraCard
import Navbar from "../components/navbar";
import AddBooze from "../components/addBooze";

interface Booze {
	volume: number;
	percent: number;
	name: string;
	brand: string;
	notes?: string;
	imageUrl?: string;
}

interface Extras {
	name: string;
	amount: string;
	notes?: string;
	imageUrl?: string;
}

export default function Inventory() {
	const [savedBooze, setSavedBooze] = useState<Booze[]>(() =>
		JSON.parse(localStorage.getItem("savedBooze") || "[]"),
	);
	const [savedExtras, setSavedExtras] = useState<Extras[]>(() =>
		JSON.parse(localStorage.getItem("savedExtras") || "[]"),
	);

	useEffect(() => {
		localStorage.setItem("savedBooze", JSON.stringify(savedBooze));
	}, [savedBooze]);

	useEffect(() => {
		localStorage.setItem("savedExtras", JSON.stringify(savedExtras));
	}, [savedExtras]);

	return (
		<>
			<Navbar />
			<main>
				<div className="inventoryNav">
					<a href="#boozeList">Booze</a>
					<a href="#extrasList">Extras</a>
				</div>

				<AddBooze
					setSavedBooze={setSavedBooze}
					setSavedExtras={setSavedExtras}
				/>
				<h2>Booze</h2>
				<div className="boozeList" id="boozeList">
					{savedBooze.map((booze, index) => (
						<BoozeCard
							// biome-ignore lint/suspicious/noArrayIndexKey: <I dont care about index>
							key={index}
							booze={booze}
							index={index}
							setSavedBooze={setSavedBooze}
						/>
					))}
				</div>
				<div className="divider" />

				<h2>Extras</h2>
				<div className="extrasList" id="extrasList">
					{savedExtras.map((extra, index) => (
						<ExtraCard
							// biome-ignore lint/suspicious/noArrayIndexKey: <I dont care about index>
							key={index}
							extra={extra}
							index={index}
							setSavedExtras={setSavedExtras}
						/>
					))}
				</div>
			</main>
		</>
	);
}
