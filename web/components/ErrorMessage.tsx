import { Bot } from "lucide-react";
import React from "react";

const ErrorMessage = ({ error }: { error: string }) => {
	return (
		<div className={`my-5 flex max-w-full gap-3`}>
			<Bot className="size-7 text-muted-foreground" />
			<div className="w-full rounded-md bg-destructive/10 px-4 py-2 text-destructive">{error}</div>
		</div>
	);
};

export default ErrorMessage;
