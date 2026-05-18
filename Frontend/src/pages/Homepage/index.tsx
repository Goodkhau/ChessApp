
import { useEffect } from "react";

import { usePageStoreActions } from "../../stores/PageStore.ts";
import Title from "./components/Title.tsx";

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

export default function ChessAIHomepage() {
	const { setIsVisible } = usePageStoreActions();

	useEffect(() => {
		setIsVisible(true);
	}, [setIsVisible]);

	return (
		<>
			<Title />

			{/* Features Section */}
			<section className="py-32 px-6">
				<div className="max-w-7xl mx-auto">
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

			{/* CTA Section */}
			<section className="py-32 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<div className="p-12 bg-linear-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur">
						<h2 className="text-5xl font-bold mb-6">
							Ready to <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Evolve</span>?
						</h2>
						<p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
							Join the future of chess intelligence. Request access to Sentinel and experience the next generation of strategic AI.
						</p>
						<div className="flex gap-4 justify-center">
							<input
								type="email"
								placeholder="Enter your email"
								className="px-6 py-4 bg-white/5 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-amber-500/50 w-80"
							/>
							<button className="px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold rounded transition-all transform hover:scale-105">
								Get Early Access
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 px-6 border-t border-white/10">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<div className="text-white/40 text-sm">
						© 2024 Sentinel Chess AI. All rights reserved.
					</div>
					<div className="flex gap-6 text-sm text-white/40">
						<a href="#" className="hover:text-white transition-colors">Privacy</a>
						<a href="#" className="hover:text-white transition-colors">Terms</a>
						<a href="#" className="hover:text-white transition-colors">Contact</a>
					</div>
				</div>
			</footer>
		</>
	);
}
