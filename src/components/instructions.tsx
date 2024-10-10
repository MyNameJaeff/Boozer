import InstructionCard from "./instructionCard";

export default function Instructions() {
	return (
		<div className="instructionCards">
			<InstructionCard
				text="Create your inventory."
				imageUrl="instruction1_Image"
				redirectUrl="/inventory"
			/>
			<InstructionCard
				text="Manage what you own"
				imageUrl="instruction1_Image"
				redirectUrl="/inventory"
			/>
			<InstructionCard
				text="Get recepies based on what you own"
				imageUrl="ChatGPT_Chat_Image"
				redirectUrl="/spritskap"
			/>
		</div>
	);
}
