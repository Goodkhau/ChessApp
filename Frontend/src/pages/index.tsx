import { JSX } from "react";
import AboutPage from "./AboutPage/AboutPage.tsx";
import ChessPage from "./ChessAI/ChessPage.tsx";
import ChessAIHomepage from "./Homepage/Homepage.tsx";

export type pageTitles = "Home" | "ChessAI" | "About";

export const Pages: {
	[K in pageTitles]: {
		index: number,
		route: string,
		element: JSX.Element
	}
} = {
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