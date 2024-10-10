import { useState, useEffect } from "react";
import BoozeCard from "../components/boozeCard";
import Navbar from "../components/navbar";
import AddBooze from "../components/addBooze";

interface Booze {
	volume: number;
	percent: number;
	name: string;
	brand: string;
	notes?: string;
}

export default function SpritSkåp() {
	const [savedBooze, setSavedBooze] = useState<Booze[]>(() => {
		return JSON.parse(localStorage.getItem("savedBooze") || "[]");
	});

	useEffect(() => {
		localStorage.setItem("savedBooze", JSON.stringify(savedBooze));
	}, [savedBooze]);

	return (
		<>
			<Navbar />
			<AddBooze setSavedBooze={setSavedBooze} />
			<div className="boozeList">
				{savedBooze.map((booze, index) => (
					<BoozeCard
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						booze={booze}
						index={index}
						setSavedBooze={setSavedBooze}
					/>
				))}
			</div>
		</>
	);
}
