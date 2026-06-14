import { useScroll } from "framer-motion";
import { useRef } from "react";

import { usePageStore } from "../../../stores/PageStore.ts";
import { useScrollStore } from "../../../stores/ScollStore.ts";
import { useInterval } from "../hooks/useInterval";
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
	}, 100);

	return (
		<section className="max-w-7xl mx-auto h-2500 py-32 px-6" ref={ref}>
			<div className="sticky text-7xl top-0 z-100 text-white">{scrollProgress}</div>
			<div className={`sticky z-10 top-0 h-screen flex flex-col items-center justify-center
				transition-transform ease-in duration-400 ${scrollProgress > 0.1 ? "translate-y-0" : "translate-y-320"}
			`}>
				<NeuralNetworkComponent progress={scrollProgress} />
			</div>
		</section>
	);
}