import AboutPage from "./AboutPage/AboutPage.tsx";
import ChessPage from "./ChessAI/ChessPage.tsx";
import HomePage from "./Homepage/Homepage.tsx";

export const Pages = {
	Home: {
		route: "/",
		element: <HomePage />,
	},
	ChessAI: {
		route: "/ChessAI",
		element: <ChessPage />,
	},
	About: {
		route: "/About",
		element: <AboutPage />,
	},
};