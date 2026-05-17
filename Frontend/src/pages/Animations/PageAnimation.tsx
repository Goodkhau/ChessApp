import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
    children: React.ReactNode,
}

const pageVariants = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -30 },
};

export default function PageTransition({ children }: PageTransitionProps) {
	const location = useLocation();

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