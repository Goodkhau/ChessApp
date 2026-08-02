import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { usePageStoreActions } from "../../stores/PageStore.ts";
import { Pages } from "../index.tsx";
import Features from "./components/Features.tsx";
import Title from "./components/Title.tsx";

export default function ChessAIHomepage() {
	const { setIsVisible, updatePage } = usePageStoreActions();
	const { About } = Pages;

	useEffect(() => {
		setIsVisible(true);
	}, [setIsVisible]);

	return (
		<>
			<Title />
			<Features />
			<section className="my-32 p-12 max-w-4xl mx-auto text-center bg-linear-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur">
				<h2 className="text-5xl font-bold mb-6">
					Ready to <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Play?</span>
				</h2>
				<p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
					Join to keep and record history of your games or play as a 
					<NavLink
						to={About.route}
						onClick={() => updatePage("About")}
					> Guest</NavLink>
					.
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
			</section>
			<footer className="py-12 px-6 border-t border-white/10 max-w-7xl mx-auto flex justify-between items-center">
				<div className="text-white/40 text-sm">
					© 2024 Sentinel Chess AI. All rights reserved.
				</div>
				<div className="flex gap-6 text-sm text-white/40">
					<a href="#" className="hover:text-white transition-colors">Privacy</a>
					<a href="#" className="hover:text-white transition-colors">Terms</a>
					<a href="#" className="hover:text-white transition-colors">Contact</a>
				</div>
			</footer>
		</>
	);
}
