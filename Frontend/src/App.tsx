import _ from "lodash";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navigation from './components/Navigation.tsx';
import { Pages } from "./pages/index.tsx";

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
	return (
		<main className="min-h-screen overflow-hidden">
			<Navigation />
			<Routes location={location} key={location.pathname}>
				{_.map(PageKeys, key => 
					<Route
						path={Pages[key].route}
						element={Pages[key].element} 
					/>)}
			</Routes>
		</main>
	);
}