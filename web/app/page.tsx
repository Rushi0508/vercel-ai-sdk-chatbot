"use client";
import { GlobalChatInput } from "../components/GlobalChatInput";
import { toast } from "sonner";
import GlobalChatMessages from "../components/GlobalChatMessages";
import { Message, useChat } from "@ai-sdk/react";
import { Attachment } from "ai";

const fileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
	});
};

interface GlobalChatProps {
	initialMessages: Message[];
}

function GlobalChat({ initialMessages }: GlobalChatProps) {
	const {
		messages,
		status,
		error,
		input,
		setInput,
		handleSubmit: handleChatSubmit,
	} = useChat({
		api: "http://localhost:3001/api/ai/generate-text",
		initialMessages: [],
		sendExtraMessageFields: true,
		experimental_throttle: 100,
		onFinish: (message) => {
			console.log(message);
		},
	});

	const handleSubmit = async (file?: File) => {
		try {
			const additionalData: Record<string, any> = {};

			const options = {
				data: additionalData,
				experimental_attachments: [] as Attachment[],
			};
			if (file) {
				options.experimental_attachments = [
					{
						url: await fileToBase64(file),
						contentType: file.type,
						name: file.name,
					},
				];
			}
			handleChatSubmit(undefined, options);
		} catch (error) {
			console.error("Failed to send message:", error);
			toast.error("Failed to send message. Please try again.");
		}
	};

	return (
		<div className="flex h-full w-full flex-1 flex-col">
			<GlobalChatMessages messages={messages} status={status} error={error} />

			<GlobalChatInput
				onSubmit={handleSubmit}
				isLoading={status === "streaming"}
				message={input}
				setMessage={setInput}
				maxFileSize={1 * 1024 * 1024}
			/>
		</div>
	);
}

export default GlobalChat;
