import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

import { useScrollStore } from "../../../stores/ScollStore.ts";
import { calculateProgress } from "../utilities/progressHelperFunctions.ts";
import NeuralNetworkComponent from "./NeuralNetwork.tsx";

const MINOR = 64; // px between minor grid lines
const MAJOR = MINOR * 4; // px between major grid lines (every 4th line, brighter)
const PARALLAX_FACTOR = 0.4; // 0 = static, 1 = moves with content. Lower = subtler.
 
const MINOR_LINE = "rgba(51, 65, 85, 0.25)"; // slate-500 @ low opacity
const MAJOR_LINE = "rgba(51, 65, 85, 0.25)"; // slate-400 @ low opacity
 
export function ScrollGridBackground(): React.ReactElement {
	const gridRef = useRef<HTMLDivElement | null>(null);
	const rafId = useRef<number | null>(null);
	const reducedMotion = useRef<boolean>(false);
 
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		reducedMotion.current = mq.matches;
		const onPreferenceChange = (): void => {
			reducedMotion.current = mq.matches;
		};
		mq.addEventListener("change", onPreferenceChange);
 
		const paint = (): void => {
			rafId.current = null;
			const node = gridRef.current;
			if (!node) return;
			const offset = reducedMotion.current ? 0 : window.scrollY * PARALLAX_FACTOR;
			const minorY = -(offset % MINOR);
			const majorY = -(offset % MAJOR);
			// four background-position pairs, one per layered gradient below
			node.style.backgroundPosition = `0 ${minorY}px, 0 ${minorY}px, 0 ${majorY}px, 0 ${majorY}px`;
		};
 
		const onScroll = (): void => {
			if (rafId.current === null) rafId.current = requestAnimationFrame(paint);
		};
 
		paint();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			mq.removeEventListener("change", onPreferenceChange);
			if (rafId.current !== null) cancelAnimationFrame(rafId.current);
		};
	}, []);
 
	return (
		<div
			ref={gridRef}
			aria-hidden="true"
			className="fixed inset-0 -z-10 bg-slate-900"
			style={{
				backgroundImage: `
          linear-gradient(${MINOR_LINE} 1px, transparent 1px),
          linear-gradient(90deg, ${MINOR_LINE} 1px, transparent 1px),
          linear-gradient(${MAJOR_LINE} 1px, transparent 1px),
          linear-gradient(90deg, ${MAJOR_LINE} 1px, transparent 1px)
        `,
				backgroundSize: `${MINOR}px ${MINOR}px, ${MINOR}px ${MINOR}px, ${MAJOR}px ${MAJOR}px, ${MAJOR}px ${MAJOR}px`,
			}}
		/>
	);
}


export default function Features() {
	const { scrollProgress, setScrollProgress } = useScrollStore();
	const ref = useRef(null);
	
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setScrollProgress(latest);
	});

	const width = `${calculateProgress({ progress: scrollProgress, startPadding: 0.15 }) * 100}%`;

	return (
		<section className="max-w-7xl mx-auto h-[10000px] py-32 px-6" ref={ref}>
			<ScrollGridBackground />
			<motion.div className={`sticky z-10 top-0 h-screen flex flex-col items-center justify-center gap-4
				transition-transform ease-in duration-200
				${(scrollProgress > 0.11) ? (scrollProgress > 0.99 ? "-translate-y-240" : "translate-y-0") : "translate-y-240"}`
			}>
				<div className="flex justify-between gap-4">
					<div className="flex flex-col justify-center p-4 bg-linear-to-br from-slate-950/80 via-slate-950/95 to-slate-950/80 rounded-4xl">
						<h2 className="text-xl text-center text-slate-300">Neural Network</h2>
					</div>
					<NeuralNetworkComponent className="bg-linear-to-br from-slate-950/70 via-slate-950/90 to-slate-950/70 rounded-4xl" progress={scrollProgress} />
				</div>
				<motion.div className="relative h-4 bg-linear-to-r from-amber-400 via-orange-500 to-red-500 w-full rounded-4xl"
					style={{ width }}
				/>
			</motion.div>
		</section>
	);
}