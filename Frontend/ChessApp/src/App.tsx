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
		<RouterProvider router={createBrowserRouter(routes)} />
	);
}