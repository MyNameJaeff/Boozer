import { useState } from "react";

export default function ExtraCard({
	extra,
	index,
	setSavedExtras,
}: {
	extra: {
		name: string;
		amount: string;
		notes?: string;
		imageUrl?: string;
	};
	index: number;
	setSavedExtras: (
		extras: { name: string; amount: string; imageUrl?: string }[],
	) => void;
}) {
	const [isEditing, setIsEditing] = useState(false);

	const [notes, setNotes] = useState(extra.notes || ""); // Initialize with existing notes
	const [name, setName] = useState(extra.name);
	const [amount, setAmount] = useState(extra.amount);
	const [imageUrl, setImageUrl] = useState(extra.imageUrl || "");

	const updateNotes = (newNotes: string) => {
		setNotes(newNotes);
		extra.notes = newNotes; // Update the local booze object notes
		const savedExtras = JSON.parse(localStorage.getItem("savedExtras") || "[]");
		savedExtras[index].notes = newNotes; // Update the notes in the local storage array
		localStorage.setItem("savedExtras", JSON.stringify(savedExtras)); // Save updated array back to local storage
		setSavedExtras(savedExtras); // Update the state in parent component if needed
	};

	return (
		<div className="extraCard">
			{isEditing && (
				<form className="editForm">
					<label>
						Name:
						<input
							placeholder="Ex. Coca-cola, Sprite, etc."
							required
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<label>
						Amount:
						<input
							placeholder="Ex. 1000ml, 1kg, etc."
							required
							type="text"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</label>
					<label>
						Image:
						<input
							placeholder="Ex. Absolut, Bacardi, etc."
							required
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

								const savedExtras = JSON.parse(
									localStorage.getItem("savedExtras") || "[]",
								);
								savedExtras[index] = {
									name,
									amount,
									notes,
									imageUrl,
								};
								localStorage.setItem(
									"savedExtras",
									JSON.stringify(savedExtras),
								);
								setSavedExtras(savedExtras);
								setIsEditing(false);
							}}
						/>
						<input
							type="button"
							value="Delete"
							className="deleteButton"
							onClick={() => {
								// Prompt the user before deleting
								if (!window.confirm("Are you sure you want to delete this?")) {
									return;
								}

								const savedExtras = JSON.parse(
									localStorage.getItem("savedExtras") || "[]",
								);
								savedExtras.splice(index, 1);
								localStorage.setItem(
									"savedExtras",
									JSON.stringify(savedExtras),
								);
								setSavedExtras(savedExtras);
								setIsEditing(false);
							}}
						/>
					</div>
				</form>
			)}

			{!isEditing && (
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
					{
						!extra.imageUrl && (
							<a href={`https://www.google.com/search?tbm=isch&q=${extra.name.split(" ").join("+")}&tbs=ic:trans`} target="_blank" className="booze-image">
								<p
									style={{
										marginTop: "25%",
										textAlign: "center",
										color: "white",
										fontSize: "1em",
										fontWeight: "bold",
									}}
								>No image found. Click to search</p>
							</a>
						)
					}

					{
						extra.imageUrl && (
							<img
								src={extra.imageUrl}
								alt={extra.name}
								className="extra-image"
							/>
						)
					}
					<div className="line" />
					<h2 className="extraName">{extra.name}</h2>
					<p className="extraAmount">{extra.amount}</p>
					<textarea
						className="boozeNotes"
						placeholder="Add notes here"
						value={notes} // Control the textarea value
						onChange={(e) => updateNotes(e.target.value)} // Call updateNotes function on change
						spellCheck={false}
					/>
				</>
			)}
		</div>
	);
}
