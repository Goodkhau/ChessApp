import { AnimatePresence, motion } from 'framer-motion';

import Navigation from './Navigation.tsx';
import { useStore } from './Store.ts';
import ChessPage from './tabs/ChessAI/ModelName/ChessPage.tsx';

export default function App2() {
	const currentPage = useStore((state) => state.currentPage);
  
	const pageVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};
  
	return (
		<main className="min-h-screen">
			<Navigation />
      
			<AnimatePresence mode="wait">
				<motion.main
					key={currentPage}
					variants={pageVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.2 }}
				>
					{currentPage === 'home' && <HomePage />}
					{currentPage === 'dashboard' && <ChessPage />}
					{currentPage === 'settings' && <SettingsPage />}
					{currentPage === 'profile' && <ProfilePage />}
				</motion.main>
			</AnimatePresence>
		</main>
	);
}

function HomePage() {return (<>Home</>);}
function SettingsPage() {return (<>Settings</>);}
function ProfilePage() {return (<>Profile</>);}