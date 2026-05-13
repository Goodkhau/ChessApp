import { AnimatePresence, motion } from 'framer-motion';
import _ from "lodash";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navigation from './Navigation.tsx';
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

	const pageVariants = {
		initial: { opacity: 0, y: 30 },
		animate: { opacity: 1, y: 0 },
	};

	return (
		<>
			<Navigation />
			<AnimatePresence mode="wait">
				<motion.main
					key={location.pathname}
					variants={pageVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.5 }}
				>
					<Routes>
						{_.map(PageKeys, key => <Route path={Pages[key].route} element={Pages[key].element} />)}
					</Routes>
				</motion.main>
			</AnimatePresence>
		</>
	);
}