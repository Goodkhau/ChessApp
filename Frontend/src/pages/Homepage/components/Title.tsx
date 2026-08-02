import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { NavLink } from "react-router-dom";

import { Chess } from "chess.js";
import { Pages } from "../..";
import { usePageStore, usePageStoreActions } from "../../../stores/PageStore";
import { useInterval } from "../hooks/useInterval";

const stats = [
	{ value: "200k", label: "Games Analyzed" },
	{ value: "56h", label: "Training Time" },
	{ value: "~700", label: "ELO Estimate" },
	{ value: "<0.2s", label: "Move Time" },
];
const game = ["Nf3", "c5", "g3", "Nc6", "Bg2", "g6", "d4", "cxd4", "Nxd4", "Bg7", "Nb3", "Nf6", "c4", "O-O", "Nc3", "d6", "Bf4",
	"Be6", "c5", "d5", "O-O", "Qd7", "Qd2", "Rad8", "Rad1", "Bh3", "Bh6", "Bxg2", "Kxg2", "d4", "Bxg7", "Kxg7", "Nb5", "Qd5+",
	"f3", "Qh5", "e4", "a6", "Na3", "h6", "Nc4", "e5", "Nc1", "Qg5", "Nd3", "Rfe8", "b4", "Nh5", "Qxg5", "hxg5",
	"a4", "f6", "b5", "Ne7", "Rb1", "Rd7", "bxa6", "bxa6", "Rb6", "Rc8", "Rxa6", "Nc6", "Rb1", "Nb8", "Ra8"];

export default function Title() {
	const [chessGame, setChessGame] = useState(new Chess);
	const [index, setIndex] = useState(0);
	const [gamePosition, setGamePosition] = useState(chessGame.fen());
	const { isVisible } = usePageStore();
	const { updatePage } = usePageStoreActions();

	const { About, ChessAI } = Pages;

	useInterval(() => {
		if (index >= game.length || game[index] === undefined) {
			setChessGame(new Chess());
			setGamePosition(chessGame.fen());
			setIndex(0);
		}
		else {
			chessGame.move(game[index]);
			setGamePosition(chessGame.fen());
			setIndex(index + 1);
		}
	}, 1000);
	
	return (
		<section className="flex items-center justify-center min-h-screen w-full mx-auto py-20 px-auto bg-slate-800"
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl w-full ">
				<div className={`space-y-8 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-10 -translate-x-8'}`}>
					<div className="inline-block px-4 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs tracking-widest">
						NEURAL NETWORK INTELLIGENCE
					</div>
					
					<h1 className="text-5xl font-bold leading-[0.95] tracking-tight mb-4">
					Tensorflow & Keras API
					Based Deep Learning
						<br />
						<span className="text-7xl bg-linear-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
						Chess AI
						</span>
					</h1>

					<p className="text-xl text-white/60 leading-relaxed max-w-xl">
					Tokenizing chess games represented in standard algebraic notation (SAN) and running them through a deep
					learning neural network, this project aims to quantify semantic meaning behind a logical set of notations.
					</p>

					<div className="flex gap-4">
						<NavLink 
							to={ChessAI.route}
							onClick={() => updatePage("ChessAI")}
							className="px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 text-black/80 font-semibold rounded 
						hover:scale-105 hover:from-amber-400 hover:to-orange-500">
						Demo Models
						</NavLink>
						<NavLink
							to={About.route}
							onClick={() => updatePage("About")}
							className="px-8 py-4 bg-white/5 border border-white/20 rounded transition-all 
						hover:scale-105 hover:bg-white/10">
						Documentation
						</NavLink>
					</div>

					<table className="border-t border-white/10">
						<tbody className="grid grid-cols-4 gap-6 pt-8">
							{stats.map((stat, i) => (
								<tr key={i} className={`flex flex-col items-start 
							transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-10 translate-y-4'}`}
								style={{ transitionDelay: `${300 + i * 100}ms` }}>
									<td className="text-2xl font-bold bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
										{stat.value}
									</td>
									<th className="text-xs text-white/40 uppercase tracking-wider mt-1">
										{stat.label}
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className={`transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-10 translate-x-8'}`}>
					<div className="absolute -inset-4 bg-linear-to-r from-amber-500/20 to-orange-500/20 blur-2xl" />
					<div className="relative border-2 border-white/10 rounded-lg overflow-hidden shadow-2xl">
						<Chessboard options={{ position: gamePosition }} />
					</div>
				</div>
			</div>
		</section>
	);
}