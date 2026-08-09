import _ from "lodash";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Little_Blue from "./components/Little_Blue.md?raw";
import guide from "./components/markdown-guide.md?raw";

interface MarkDownListProps {
	title: string,
	file: string,
}

const Markdowns = [
	{ title: "Guide", file: guide },
	{ title: "Little Blue", file: Little_Blue },
];

function MarkDownList({ title, file }: MarkDownListProps) {
	const [isOpen, setIsOpen] = useState(false);
	console.log(isOpen);
	return (
		<div className="max-w-[100vw] p-2 prose">
			<button className={`
				p-4 w-[80vw] bg-slate-950/50 pointer
				transition-all ease-in-out duration-0
				${isOpen ? 'rounded-t-xl rounded-b-none' : 'delay-500 rounded-xl'}
			`}
			onClick={() => setIsOpen(!isOpen)}
			>{title}</button>
			<div className={`
					grid w-[80vw] overflow-clip text-white/60 bg-slate-950/70 rounded-b-xl
					transition-all ease-in-out duration-500 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
				`}>
				<div className="overflow-hidden min-h-0">
					<div className="p-6">
						<ReactMarkdown
							components={{
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								h1: ({ node, ...props }) => <h1 className="text-4xl text-white/80 font-bold mb-4" {...props} />,
							}}
						>{file}</ReactMarkdown>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function AboutPage() {
	return (
		<section className="h-screen w-full flex flex-col items-center gap-2 py-24">
			{_.map(Markdowns, ({ title, file }) => (
				<MarkDownList title={title} file={file} />
			))}
		</section>
	);
}