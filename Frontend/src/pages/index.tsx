import AboutPage from "./AboutPage/AboutPage.tsx";
import ChessPage from "./ChessAI/ChessPage.tsx";
import ChessAIHomepage from "./Homepage/index.tsx";

export const Pages = {
	Home: {
		index: 0,
		route: "/",
		element: <ChessAIHomepage />,
	},
	ChessAI: {
		index: 1,
		route: "/ChessAI",
		element: <ChessPage />,
	},
	About: {
		index: 2,
		route: "/About",
		element: <AboutPage />,
	},
};