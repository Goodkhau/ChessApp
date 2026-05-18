import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';

const stats = [
	{ value: "2.8M", label: "Games Analyzed" },
	{ value: "99.4%", label: "Accuracy Rate" },
	{ value: "3200+", label: "ELO Rating" },
	{ value: "<0.1s", label: "Move Time" },
];

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
	const [gamePosition, setGamePosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	useEffect(() => {
		const positions = [
			"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
			"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR",
			"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR",
			"rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
		];

		let index = 0;
		const interval = setInterval(() => {
			index = (index + 1) % positions.length;
			setGamePosition(positions[index]);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<section className="min-h-screen max-w-7xl w-full mx-auto py-20 
				grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
					<div className="inline-block px-4 py-1 my-4 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs tracking-widest">
							NEURAL NETWORK INTELLIGENCE
					</div>
					
					<h1 className="text-7xl font-bold leading-[0.95] tracking-tight">
						The Future of
						<br />
						<span className="bg-linear-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
							Strategic AI
						</span>
					</h1>

					<p className="text-xl text-white/60 leading-relaxed max-w-xl">
						Sentinel harnesses cutting-edge neural networks to master the infinite complexity of chess.
						Built for grandmasters, researchers, and those who demand absolute precision.
					</p>

					<div className="flex gap-4">
						<button className="px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold rounded transition-all transform hover:scale-105">
							Request Demo
						</button>
						<button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded transition-all">
							View Research
						</button>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-4 gap-6 pt-8 border-t border-white/10">
						{stats.map((stat, i) => (
							<div key={i} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
								style={{ transitionDelay: `${600 + i * 100}ms` }}>
								<div className="text-2xl font-bold bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
									{stat.value}
								</div>
								<div className="text-xs text-white/40 uppercase tracking-wider mt-1">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Chess Board */}
				<div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
					<div className="relative">
						<div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-2xl" />
						<div className="relative border-2 border-white/10 rounded-lg overflow-hidden shadow-2xl">
							<Chessboard
								position={gamePosition}
								boardWidth={500}
								customDarkSquareStyle={{ backgroundColor: '#1a1a1a' }}
								customLightSquareStyle={{ backgroundColor: '#2a2a2a' }}
								arePiecesDraggable={false}
							/>
						</div>
						<div className="absolute -bottom-4 -right-4 px-4 py-2 bg-black/80 backdrop-blur border border-amber-500/30 rounded text-xs text-amber-400">
							Live Analysis: +2.4
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-32 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-20">
						<h2 className="text-5xl font-bold mb-6">
							Uncompromising <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Performance</span>
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
					<div className="p-12 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur">
						<h2 className="text-5xl font-bold mb-6">
							Ready to <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Evolve</span>?
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
							<button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold rounded transition-all transform hover:scale-105">
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
