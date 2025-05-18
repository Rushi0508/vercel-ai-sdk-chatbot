import { cn } from "@/lib/utils";
import { Message } from "@ai-sdk/react";
import React from "react";
import CustomMarkdown from "./CustomMarkdown";
import AttachmentView from "./AttachmentView";
import { format } from "date-fns";
import { toolComponents } from "./tools";
import { Bot } from "lucide-react";

type PagsMessageProps = {
	message: Message;
};

const AiMessage = ({ message }: PagsMessageProps) => {
	return (
		<div className="flex max-w-full justify-start gap-3 items-start">
			<Bot className="size-7 text-muted-foreground" />
			<div className={cn("flex flex-1 flex-col gap-1", "items-start")}>
				<div className={"w-full"}>
					{message.parts?.map((part, index) => {
						const { type } = part;
						if (type === "reasoning") {
							return <CustomMarkdown key={index} message={part.reasoning} className="text-primary-foreground" />;
						}
						if (type === "text") {
							return <CustomMarkdown key={index} message={part.text} className="text-primary-foreground" />;
						}
						if (type === "tool-invocation") {
							const { toolName } = part.toolInvocation;
							if (toolName in toolComponents) {
								const ToolComponent = toolComponents[toolName as keyof typeof toolComponents];
								return <ToolComponent key={index} tool={part.toolInvocation} />;
							}
							return null;
						}
					})}
					<AttachmentView attachments={message.experimental_attachments} />
				</div>
				<span className={cn("text-xs", "text-muted-foreground")}>
					{format(new Date(message.createdAt || new Date()), "h:mm a")}
				</span>
			</div>
		</div>
	);
};

export default AiMessage;
