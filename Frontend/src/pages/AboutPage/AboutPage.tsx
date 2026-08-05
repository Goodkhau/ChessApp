import _ from "lodash";
import ReactMarkdown from "react-markdown";
import Little_Blue from "./components/Little_Blue.md?raw";
import guide from "./components/markdown-guide.md?raw";

const Markdowns = [
	{ title: "Guide", file: guide },
	{ title: "Little Blue", file: Little_Blue },
];

export default function AboutPage() {
	return (
		<section className="h-screen w-full flex flex-col items-center gap-2 py-24">
			{_.map(Markdowns, ({ title, file }) => (
				<details className="max-w-[100vw] p-2 prose rounded-xl">
					<summary className="p-4 w-[80vw] bg-slate-800/90 rounded-t-xl">{title}</summary>
					<div className="p-6 w-[80vw] overflow-clip text-white/60 bg-slate-800">
						<ReactMarkdown>{file}</ReactMarkdown>
					</div>
				</details>
			))}
		</section>
	);
}