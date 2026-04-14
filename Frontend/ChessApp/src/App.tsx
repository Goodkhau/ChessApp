import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChessPage from "./pages/ChessAI/ModelName/ChessPage.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";

const routes = [
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/ChessAI/:ModelName",
		element: <ChessPage />,
	},
];

export default function App() {
	return (
		<main className="flex flex-col items-center pt-20 h-min-screen">
			<RouterProvider router={createBrowserRouter(routes)} />
		</main>
	);
}