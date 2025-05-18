import React from "react";
import ShinyText from "./ShinyText";
import { Bot } from "lucide-react";

const MessageLoading = () => {
	return (
		<div className="my-5 flex max-w-full items-center gap-3">
			<Bot className="size-7 text-muted-foreground" />
			<ShinyText text="Pags is thinking..." className="font-medium" />
		</div>
	);
};

export default MessageLoading;
