import { useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { useInterval } from "../hooks/useInterval";

const features = [
	{
		title: "Neural Network Engine",
		description: "Advanced deep learning models trained on millions of grandmaster games, capable of evaluating positions with superhuman precision.",
		icon: "⚡",
	},
	{
		title: "Real-Time Analysis",
		description: "Instant position evaluation with multi-variation trees, showing the best continuations and tactical opportunities in milliseconds.",
		icon: "🔍",
	},
	{
		title: "Adaptive Learning",
		description: "The AI continuously improves by analyzing your playing style, adapting its strategy to exploit weaknesses and challenge strengths.",
		icon: "🧠",
	},
	{
		title: "Tournament Integration",
		description: "Seamlessly integrates with major online platforms, providing post-game analysis and opening preparation for competitive players.",
		icon: "🏆",
	},
];

export default function Features() {
	const [scrollProgress, setScrollProgress] = useState(0);
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});

	useInterval(() => setScrollProgress(scrollYProgress.get()), 50);

	return (
		<section className="max-w-7xl mx-auto h-1000 py-32 px-6" ref={ref}>
			<div className="sticky text-7xl top-0 z-100 text-white">{scrollProgress}</div>
			<div className="sticky z-99 top-0 h-screen flex flex-col items-center justify-center">
				<div className="text-center mb-20">
					<h2 className="text-5xl font-bold mb-6">
						Uncompromising <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Performance</span>
					</h2>
					<p className="text-xl text-white/60 max-w-2xl mx-auto">
						Every millisecond matters. Every variation counts. Built for those who accept nothing less than perfection.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{features.map((feature, i) => (
						<div key={i}
							className="group p-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 rounded-lg transition-all duration-500 hover:scale-[1.02]">
							<div className="text-4xl mb-4">{feature.icon}</div>
							<h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
								{feature.title}
							</h3>
							<p className="text-white/60 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}