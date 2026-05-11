import { AnimatePresence, motion } from 'framer-motion';

import Navigation from './Navigation.tsx';
import { Tabs, useCurrentTab } from './Store.ts';

export default function App() {
	const currentTab = useCurrentTab();
	const TabComponent = Tabs[currentTab];
  
	const pageVariants = {
		initial: { opacity: 0, y: 100 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -100 },
	};
  
	return (
		<main className="min-h-screen">
			<Navigation />
			<AnimatePresence mode="wait">
				<motion.main
					key={currentTab}
					variants={pageVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.2 }}
				>
					<div className="py-4">
						<TabComponent />
					</div>
				</motion.main>
			</AnimatePresence>
		</main>
	);
}

export function HomePage() {return (<>Home</>);}
export function AboutPage() {return (<>Profile</>);}