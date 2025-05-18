import { cn } from "@/lib/utils";
import React from "react";
import { Message } from "@ai-sdk/react";

interface AttachmentViewProps {
	attachments: Message["experimental_attachments"];
}

const AttachmentView = ({ attachments }: AttachmentViewProps) => {
	if (!attachments?.length) return null;
	return (
		<div className="mt-2 flex flex-col gap-2">
			{attachments.map((attachment, index) => (
				<div
					key={index}
					className={cn(
						"flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
						"bg-primary-foreground/10 text-primary-foreground"
					)}
				>
					<a href={attachment.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
						<span className="truncate">{attachment.name}</span>
					</a>
				</div>
			))}
		</div>
	);
};

export default AttachmentView;
