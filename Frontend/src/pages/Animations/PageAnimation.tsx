import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { useCurrentIndex, usePreviousIndex } from '../../stores/PageStore';

interface PageTransitionProps {
    children: React.ReactNode,
}

export default function PageTransition({ children }: PageTransitionProps) {
	const location = useLocation();

	const current = useCurrentIndex();
	const previous = usePreviousIndex();

	const pageVariants = {
		initial: { opacity: 1, x: (current - previous)  * 1280 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 1, x: (previous - current) * 1280 },
	};

	return (
		<motion.main
			key={location.pathname}
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.15 }}
		>
			{children}
		</motion.main>
	);
}