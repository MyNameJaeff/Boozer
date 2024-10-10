import React from "react";

export default function BoozeCard({
	booze,
	index,
	setSavedBooze,
}: {
	booze: {
		volume: number;
		percent: number;
		name: string;
		brand: string;
		imageUrl?: string;
		notes?: string;
	};
	index: number;
	setSavedBooze: (
		booze: {
			volume: number;
			percent: number;
			name: string;
			brand: string;
			imageUrl?: string;
			notes?: string;
		}[],
	) => void; // Add this to update the savedBooze state
}) {
	const [notes, setNotes] = React.useState(booze.notes || ""); // Initialize with existing notes

	// Update local storage whenever notes change
	const updateNotes = (newNotes: string) => {
		setNotes(newNotes);
		booze.notes = newNotes; // Update the local booze object notes
		const savedBooze = JSON.parse(localStorage.getItem("savedBooze") || "[]");
		savedBooze[index].notes = newNotes; // Update the notes in the local storage array
		localStorage.setItem("savedBooze", JSON.stringify(savedBooze)); // Save updated array back to local storage
		setSavedBooze(savedBooze); // Update the state in parent component if needed
	};

	return (
		<div className="boozeCard">
			<img
				src={
					booze.imageUrl ||
					"https://media.wired.com/photos/5926ba4f8d4ebc5ab806b486/master/w_2560%2Cc_limit/Booze-152406106.jpg"
				}
				alt={booze.name}
				className="booze-image"
			/>
			<div className="line" />
			<h2 className="boozeName">{booze.name}</h2>
			<p className="boozeVolume">
				{booze.volume} ml, {booze.percent}%
			</p>
			<p className="boozeBrand">
				<i>{booze.brand}</i>
			</p>
			<textarea
				className="boozeNotes"
				placeholder="Add notes here"
				value={notes} // Control the textarea value
				onChange={(e) => updateNotes(e.target.value)} // Call updateNotes function on change
				spellCheck={false}
			/>
		</div>
	);
}
