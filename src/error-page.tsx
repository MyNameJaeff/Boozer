import { useRouteError } from "react-router-dom";
import Navbar from "./components/navbar";

interface Error {
	statusText?: string;
	message?: string;
}

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<Navbar />
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{(error as Error).statusText || (error as Error).message}</i>
			</p>
		</div>
	);
}
