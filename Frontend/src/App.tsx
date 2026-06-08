import { AnimatePresence } from "framer-motion";
import _ from "lodash";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navigation from './components/Navigation.tsx';
import PageTransition from "./pages/Animations/PageAnimation.tsx";
import { Pages } from "./pages/index.tsx";
import { useScrollStore } from "./stores/ScollStore.ts";

const PageKeys = Object.keys(Pages) as Array<keyof typeof Pages>;

export default function App() {
	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	);
}

function Layout() {
	const location = useLocation();
	const { scrollProgress } = useScrollStore();
	return (
		<main className={`min-h-screen transition-all duration-500
			${scrollProgress > 0.1 && scrollProgress < 1.0 ? "bg-black" : ""}`}
		>
			<Navigation />
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					{_.map(PageKeys, key =>
						<Route
							key={key}
							path={Pages[key].route}
							element={
								<PageTransition>
									{Pages[key].element}
								</PageTransition>
							} 
						/>,
					)}
				</Routes>
			</AnimatePresence>
		</main>
	);
}