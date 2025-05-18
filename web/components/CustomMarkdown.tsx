import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CustomMarkdown = ({ message, className }: { message: string; className?: string }) => {
	return (
		<div
			className={`prose dark:prose-invert prose-p:my-1 prose-code:before:content-none prose-code:after:content-none max-w-full text-sm ${className}`}
		>
			<Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
		</div>
	);
};

export default CustomMarkdown;
