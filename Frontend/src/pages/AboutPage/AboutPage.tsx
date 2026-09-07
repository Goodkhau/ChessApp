/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Little_Blue from "./components/Little_Blue.md?raw";
import UI_Design from "./components/UI_Design.md?raw";

interface MarkDownListProps {
	title: string,
	file: string,
}

const Markdowns = [
	{ title: "Little Blue", file: Little_Blue },
	{ title: "UI Design", file: UI_Design },
];

const markdownComponents: Components = {
	h1: ({ node, ...props }) => (
		<h1 className="text-4xl text-white/80 font-bold mb-4" {...props} />
	),
	h2: ({ node, ...props }) => (
		<h2
			className="text-2xl text-white/80 font-semibold mt-8 mb-3 pb-2 border-b border-white/10 first:mt-0"
			{...props}
		/>
	),
	h3: ({ node, ...props }) => (
		<h3 className="text-lg text-white/75 font-semibold mt-6 mb-2" {...props} />
	),
	p: ({ node, ...props }) => (
		<p className="text-white/60 leading-relaxed mb-4" {...props} />
	),
	strong: ({ node, ...props }) => (
		<strong className="text-white/85 font-semibold" {...props} />
	),
	em: ({ node, ...props }) => (
		<em className="text-white/70 italic" {...props} />
	),
	a: ({ node, ...props }) => (
		<a
			className="text-sky-400 underline underline-offset-2 decoration-sky-400/40 hover:text-sky-300 hover:decoration-sky-300/60 transition-colors"
			target="_blank"
			rel="noreferrer"
			{...props}
		/>
	),
	ul: ({ node, ...props }) => (
		<ul className="list-disc marker:text-sky-400/70 pl-5 mb-4 space-y-1.5 text-white/60" {...props} />
	),
	ol: ({ node, ...props }) => (
		<ol className="list-decimal marker:text-sky-400/70 pl-5 mb-4 space-y-1.5 text-white/60" {...props} />
	),
	li: ({ node, ...props }) => (
		<li className="leading-relaxed pl-1" {...props} />
	),
	blockquote: ({ node, ...props }) => (
		<blockquote
			className="border-l-2 border-sky-400/40 pl-4 my-4 italic text-white/50"
			{...props}
		/>
	),
	hr: ({ node, ...props }) => (
		<hr className="border-white/10 my-8" {...props} />
	),
	code: ({ className, children, ...props }) => {
		const isInline = !className;
		if (isInline) {
			return (
				<code
					className="bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded text-[0.85em] font-mono"
					{...props}
				>
					{children}
				</code>
			);
		}
		return (
			<code className={`font-mono text-sm leading-relaxed ${className ?? ""}`} {...props}>
				{children}
			</code>
		);
	},
	pre: ({ node, ...props }) => (
		<pre
			className="bg-slate-900/80 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4 text-white/70"
			{...props}
		/>
	),
	table: ({ node, ...props }) => (
		<div className="overflow-x-auto mb-4 rounded-lg border border-white/10">
			<table className="w-full border-collapse text-sm" {...props} />
		</div>
	),
	thead: ({ node, ...props }) => (
		<thead className="bg-white/5" {...props} />
	),
	th: ({ node, ...props }) => (
		<th className="text-left font-semibold text-white/80 px-3 py-2 border-b border-white/10" {...props} />
	),
	td: ({ node, ...props }) => (
		<td className="text-white/60 px-3 py-2 border-t border-white/10" {...props} />
	),
};

function MarkDownList({ title, file }: MarkDownListProps) {
	const [isOpen, setIsOpen] = useState(false);
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
						<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
							{file}
						</ReactMarkdown>
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
