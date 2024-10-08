import { useNavigate } from "react-router-dom";

export default function InstructionCard({
	text,
	imageUrl,
	redirectUrl,
}: { text: string; imageUrl?: string; redirectUrl?: string }) {
	const navigate = useNavigate(); // Use useNavigate for navigation

	return (
		<div
			className="instructionCard"
			onClick={() => redirectUrl && navigate(redirectUrl)}
			onKeyUp={(e) => e.key === "Enter" && redirectUrl && navigate(redirectUrl)}
			tabIndex={0}
			role="button"
		>
			<div className="instructionText">{text}</div>
			<div className={`instructionImageBox ${imageUrl}`} />
		</div>
	);
}
