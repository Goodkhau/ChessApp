import ReactMarkdown from "react-markdown";
import content from "./components/markdown-guide.md?raw";

export default function AboutPage() {
	console.log(content);
	return (
		<section className="h-screen w-screen flex items-center justify-center gap-10">
			<details className="w-150 p-4 prose relative">
				<div className="p-4 absolute text-white/60">
					<ReactMarkdown>
						{content}
					</ReactMarkdown>
				</div>
			</details>
		</section>
	);
}