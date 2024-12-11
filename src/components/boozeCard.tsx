import { useState } from "react";

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
	const [notes, setNotes] = useState(booze.notes || ""); // Initialize with existing notes
	const [isEditing, setIsEditing] = useState(false);

	const [volume, setVolume] = useState(booze.volume.toString());
	const [percent, setPercent] = useState(booze.percent.toString());
	const [name, setName] = useState(booze.name);
	const [brand, setBrand] = useState(booze.brand);
	const [imageUrl, setImageUrl] = useState(booze.imageUrl || "");

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
			{
				// Show the notes textarea only when editing
				isEditing && (
					<form className="editForm">
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
						<div className="submitButtonsEdit">
							<input
								type="submit"
								value="Save"
								className="saveButton"
								onClick={(e) => {
									e.preventDefault();
									const savedBooze = JSON.parse(
										localStorage.getItem("savedBooze") || "[]",
									);
									savedBooze[index] = {
										volume: Number.parseInt(volume, 10),
										percent: Number.parseInt(percent, 10),
										name,
										brand,
										imageUrl,
										notes,
									};
									localStorage.setItem(
										"savedBooze",
										JSON.stringify(savedBooze),
									);
									setSavedBooze(savedBooze);
									setIsEditing(false);
								}}
							/>
							<input
								type="button"
								value="Delete"
								className="deleteButton"
								onClick={() => {
									// Prompt the user before deleting
									if (
										!window.confirm("Are you sure you want to delete this?")
									) {
										return;
									}

									const savedBooze = JSON.parse(
										localStorage.getItem("savedBooze") || "[]",
									);
									savedBooze.splice(index, 1);
									localStorage.setItem(
										"savedBooze",
										JSON.stringify(savedBooze),
									);
									setSavedBooze(savedBooze);
									setIsEditing(false);
								}}
							/>
						</div>
					</form>
				)
			}

			{
				// Show the notes div when not editing
				!isEditing && (
					<>
						<div className="editButtonDiv">
							<button
								type="button"
								className="editButton"
								onClick={() => {
									setIsEditing(!isEditing);
								}}
							>
								<img
									src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/messages-conversation/pen-2-wq05z1jnvxpgincvtyhg0l.png/pen-2-en9y4kfl441o0fxtbruf5.png?_a=DAJFJtWIZAAC"
									alt="Edit"
									className="editButtonImage"
								/>
							</button>
						</div>
						{!booze.imageUrl && (
							<a
								href={`https://www.google.com/search?tbm=isch&q=${booze.name.split(" ").join("+")}&tbs=ic:trans`}
								target="_blank"
								rel="noreferrer"
								className="booze-image"
							>
								<p
									style={{
										marginTop: "25%",
										textAlign: "center",
										color: "white",
										fontSize: "1em",
										fontWeight: "bold",
									}}
								>
									No image found. Click to search
								</p>
							</a>
						)}

						{booze.imageUrl && (
							<img
								src={
									booze.imageUrl ||
									"https://via.placeholder.com/150?text=No+Image"
								}
								alt={booze.name}
								className="booze-image"
							/>
						)}
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
					</>
				)
			}
		</div>
	);
}
