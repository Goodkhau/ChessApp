import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";

import { useScrollStore } from "../../../stores/ScollStore.ts";
import { calculateProgress } from "../utilities/progressHelperFunctions.ts";
import NeuralNetworkComponent from "./NeuralNetwork.tsx";

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
			<motion.div className={`sticky z-10 top-0 h-screen flex flex-col items-center justify-center gap-4
				transition-transform ease-in duration-200
				${(scrollProgress > 0.11) ? (scrollProgress > 0.99 ? "-translate-y-240" : "translate-y-0") : "translate-y-240"}`
			}>
				<div className="flex justify-between gap-4">
					<div className="flex flex-col justify-center p-4 bg-slate-950 rounded-4xl">
						<h2 className="text-xl text-center text-slate-300">Neural Network</h2>
					</div>
					<NeuralNetworkComponent className="bg-slate-950 rounded-4xl" progress={scrollProgress} />
				</div>
				<motion.div className="relative h-4 bg-linear-to-r from-amber-400 via-orange-500 to-red-500 w-full rounded-4xl"
					style={{ width }}
				/>
			</motion.div>
		</section>
	);
}