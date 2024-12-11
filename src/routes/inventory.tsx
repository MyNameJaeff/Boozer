import React, { useState, useEffect } from "react";
import BoozeCard from "../components/boozeCard";
import ExtraCard from "../components/extraCard"; // Import ExtraCard
import Navbar from "../components/navbar";
import AddBooze from "../components/addBooze";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
	databaseURL:
		"https://boozer-base-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

	const getUserData = React.useCallback(async () => {
		if (
			localStorage.getItem("username") === null ||
			localStorage.getItem("username") === ""
		) {
			return;
		}
		const userId = "user1";
		const userData = ref(database, `users/${userId}`);

		onValue(userData, (snapshot) => {
			const data = snapshot.val();
			const booze = data.booze;
			const extra = data.extra;
			const recepies = data.recepies;
			console.log(booze, extra, recepies);
			setSavedBooze(booze);
			setSavedExtras(extra);
		});
	}, []);

	const setUserBooze = React.useCallback((booze: Booze[]) => {
		if (
			localStorage.getItem("username") === null ||
			localStorage.getItem("username") === ""
		) {
			return;
		}
		const userId = "user1";
		const userBooze = ref(database, `users/${userId}/booze`);

		set(userBooze, booze);
	}, []);

	const setUserExtras = React.useCallback((extra: Extras[]) => {
		if (
			localStorage.getItem("username") === null ||
			localStorage.getItem("username") === ""
		) {
			return;
		}
		const userId = "user1";
		const userExtras = ref(database, `users/${userId}/extra`);

		set(userExtras, extra);
	}, []);

	// Fetch from localStorage when the component mounts
	React.useEffect(() => {
		getUserData();
	}, [getUserData]);

	React.useEffect(() => {
		setUserBooze(
			JSON.parse(localStorage.getItem("savedBooze") || "[]") as Booze[],
		);
	}, [setUserBooze]);

	React.useEffect(() => {
		setUserExtras(
			JSON.parse(localStorage.getItem("savedExtras") || "[]") as Extras[],
		);
	}, [setUserExtras]);

	// Save to localStorage when the savedBooze state changes
	useEffect(() => {
		localStorage.setItem("savedBooze", JSON.stringify(savedBooze));
	}, [savedBooze]);

	useEffect(() => {
		localStorage.setItem("savedExtras", JSON.stringify(savedExtras));
	}, [savedExtras]);

	return (
		<>
			<Navbar setSavedBooze={setSavedBooze} setSavedExtras={setSavedExtras} />
			<main>
				<div className="inventoryNav">
					<a href="#boozeList">Booze</a>
					<a href="#extrasList">Extras</a>
				</div>

				<AddBooze
					setSavedBooze={setSavedBooze}
					setSavedExtras={setSavedExtras}
				/>
				<h2 id="boozeList">Booze</h2>
				<div className="boozeList">
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

				<h2 id="extrasList">Extras</h2>
				<div className="extrasList">
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
