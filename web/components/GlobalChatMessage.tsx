import UserMessage from "./UserMessage";
import AiMessage from "./AiMessage";
import { Message } from "@ai-sdk/react";

interface GlobalChatMessageProps {
	message: Message;
}

export function GlobalChatMessage({ message }: GlobalChatMessageProps) {
	if (message.role === "user") {
		return <UserMessage message={message} />;
	} else {
		return <AiMessage message={message} />;
	}
}
