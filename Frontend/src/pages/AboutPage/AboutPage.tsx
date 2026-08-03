import ReactMarkdown from "react-markdown";
import content from "./components/markdown-guide.md?raw";

export default function AboutPage() {
	return (
		<section className="h-screen w-screen flex justify-center gap-10 my-24">
			<details className="max-w-[100vw] p-2 prose relative rounded-xl">
				<summary className="p-4 w-[80vw] bg-slate-800/90 rounded-t-xl">Little Blue</summary>
				<div className="p-6 absolute w-[80vw] text-white/60 bg-slate-800">
					<ReactMarkdown>
						{content}
					</ReactMarkdown>
				</div>
			</details>
		</section>
	);
}