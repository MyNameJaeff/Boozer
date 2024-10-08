import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Instructions from "../components/instructions";

export default function Root() {
	return (
		<>
			<Navbar />
			<div className="instructionsBox">
				<Instructions />
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
