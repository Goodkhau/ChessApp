import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { usePageStore } from "../../../stores/PageStore";

const stats = [
	{ value: "2.8M", label: "Games Analyzed" },
	{ value: "99.4%", label: "Accuracy Rate" },
	{ value: "3200+", label: "ELO Rating" },
	{ value: "<0.1s", label: "Move Time" },
];

export default function Title() {
	const [gamePosition, setGamePosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
	const { isVisible } = usePageStore();
	
	return (
		<section className="min-h-screen max-w-7xl w-full mx-auto py-20 
			grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
		>
			<div className={`space-y-8 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-10 -translate-x-8'}`}>
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
					<button className="px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 text-black font-semibold rounded 
						hover:scale-105 hover:from-amber-400 hover:to-orange-500">
						Request Demo
					</button>
					<button className="px-8 py-4 bg-white/5 border border-white/20 rounded transition-all 
						hover:scale-105 hover:bg-white/10">
						View Research
					</button>
				</div>

				<table className="grid grid-cols-4 gap-6 pt-8 border-t border-white/10">
					{stats.map((stat, i) => (
						<div key={i} className={`flex flex-col items-start 
							transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-10 translate-y-4'}`}
						style={{ transitionDelay: `${300 + i * 100}ms` }}>
							<td className="text-2xl font-bold bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
								{stat.value}
							</td>
							<th className="text-xs text-white/40 uppercase tracking-wider mt-1">
								{stat.label}
							</th>
						</div>
					))}
				</table>
			</div>

			<div className={`transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-10 translate-x-8'}`}>
				<div className="absolute -inset-4 bg-linear-to-r from-amber-500/20 to-orange-500/20 blur-2xl" />
				<div className="relative border-2 border-white/10 rounded-lg overflow-hidden shadow-2xl">
					<Chessboard options={{ position: gamePosition }} />
				</div>
				<div className="absolute -bottom-4 -right-4 px-4 py-2 bg-black/80 backdrop-blur border border-amber-500/30 rounded text-xs text-amber-400">
					Example Game
				</div>
			</div>
		</section>
	);
}