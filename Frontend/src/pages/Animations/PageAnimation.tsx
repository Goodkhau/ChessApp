import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
    children: React.ReactNode,
}

export default function PageTransition({ children }: PageTransitionProps) {
	const location = useLocation();

	const pageVariants = {
		initial: { opacity: 1, x: -1280 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 1, x: 1280 },
	};

	return (
		<motion.main
			key={location.pathname}
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.3 }}
		>
			{children}
		</motion.main>
	);
}