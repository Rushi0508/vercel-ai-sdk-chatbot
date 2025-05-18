import { useEffect, useRef } from "react";
import { GlobalChatMessage } from "./GlobalChatMessage";
import { Message, UseChatHelpers } from "@ai-sdk/react";
import MessageLoading from "./MessageLoading";
import ErrorMessage from "./ErrorMessage";
import Greeting from "./Greeting";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GlobalChatMessagesProps {
	messages: Message[];
	status: UseChatHelpers["status"];
	error?: Error;
}

const GlobalChatMessages = ({ messages, status, error }: GlobalChatMessagesProps) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	if (messages.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center">
				<Greeting name="User" />
			</div>
		);
	}

	return (
		<ScrollArea className="mx-auto mt-5 w-full flex-1 overflow-y-auto pr-4 pt-4 md:mt-0">
			<div className="mx-auto flex min-w-0 max-w-3xl flex-col gap-4">
				{messages.map((message, index) => (
					<GlobalChatMessage key={message.id || index} message={message} />
				))}
				{status === "submitted" && messages.length > 0 && messages[messages.length - 1].role === "user" && (
					<MessageLoading />
				)}
				{status === "error" && <ErrorMessage error={error?.message ?? "An error occurred"} />}
			</div>
			<div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] shrink-0" />
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default GlobalChatMessages;
