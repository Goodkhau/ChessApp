import AboutPage from "./AboutPage/AboutPage.tsx";
import ChessPage from "./ChessAI/ChessPage.tsx";
import ChessAIHomepage from "./Homepage/index.tsx";

export const Pages = {
	Home: {
		route: "/",
		element: <ChessAIHomepage />,
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