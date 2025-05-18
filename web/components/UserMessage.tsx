import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@ai-sdk/react";
import React from "react";
import CustomMarkdown from "./CustomMarkdown";
import AttachmentView from "./AttachmentView";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface UserMessageProps {
	message: Message;
}

const UserMessage = ({ message }: UserMessageProps) => {
	return (
		<div className="flex w-full justify-end gap-3 items-start">
			<div className={cn("flex flex-col gap-1", "items-end")}>
				<div className={"w-full rounded-2xl bg-primary px-4 py-2"}>
					<CustomMarkdown message={message.content} className="prose-invert dark:prose text-primary-foreground" />
					<AttachmentView attachments={message.experimental_attachments} />
				</div>
				<span className={cn("text-xs", "text-muted-foreground")}>
					{format(new Date(message.createdAt || new Date()), "h:mm a")}
				</span>
			</div>
			<Avatar className="h-8 w-8 rounded-md">
				<AvatarImage className="rounded-md" src={""} />
				<AvatarFallback className="rounded-md text-sm">{"U"}</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default UserMessage;
