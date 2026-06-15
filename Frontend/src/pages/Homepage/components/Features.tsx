import { useScroll } from "framer-motion";
import { useRef } from "react";

import { usePageStore } from "../../../stores/PageStore.ts";
import { useScrollStore } from "../../../stores/ScollStore.ts";
import { useInterval } from "../hooks/useInterval";
import { calculateProgress } from "../utilities/progressHelperFunctions.ts";
import NeuralNetworkComponent from "./NeuralNetwork.tsx";

export default function Features() {
	const { scrollProgress, setScrollProgress } = useScrollStore();
	const { currentPage } = usePageStore();
	const ref = useRef(null);
	
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});

	useInterval(() => {
		if (currentPage === "Home")
			setScrollProgress(scrollYProgress.get());
	}, 20);

	return (
		<section className="max-w-7xl mx-auto h-2500 py-32 px-6" ref={ref}>
			<div className={`sticky z-10 top-0 h-screen flex flex-col items-center justify-center
				transition-transform ease-in duration-200
				${(scrollProgress > 0.1) ? (scrollProgress > 0.99 ? "-translate-y-240" : "translate-y-0") : "translate-y-240"}`
			}>
				<div className="flex justify-between bg-slate-900 rounded-4xl">
					<div className="flex flex-col justify-center p-4">
						<h2 className="text-xl text-center text-slate-300">Neural Network</h2>
					</div>
					<NeuralNetworkComponent className="bg-slate-800 rounded-4xl" progress={scrollProgress} />
				</div>
				<div className="relative mt-4 h-4 bg-slate-800 w-full rounded-4xl"
					style={{ width: `${calculateProgress({ progress: scrollProgress, startPadding: 0.15 }) * 100}%` }}
				/>
			</div>
		</section>
	);
}