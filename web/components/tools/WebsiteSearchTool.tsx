import React, { memo } from "react";
import { ToolInvocation } from "ai";
import { Check, Info, Loader2 } from "lucide-react";
import ShinyText from "../ShinyText";

interface WebsiteSearchToolProps {
	tool: ToolInvocation;
}

const PureWebsiteSearchTool = ({ tool }: WebsiteSearchToolProps) => {
	if (!tool.args) {
		return null;
	}
	const isLoading = tool.state === "partial-call" || tool.state === "call";
	if (!isLoading) {
		const event = tool.result;
		if (event?.success) {
			return (
				<div className="my-1 flex w-fit items-center gap-1 rounded-md text-sm">
					<Check size={16} className="text-green-500" />
					Searched {tool.args.query}
				</div>
			);
		} else {
			return (
				<div className="my-1 flex w-fit items-center gap-1 rounded-md text-sm">
					<Info size={16} className="text-red-500" />
					Failed to search {tool.args.query}
				</div>
			);
		}
	}
	return (
		<div className="my-1 flex w-fit items-center gap-1 rounded-md text-sm">
			<Loader2 size={16} className="animate-spin" />
			<ShinyText text={`Searching Web for "${tool.args.query}"...`} />
		</div>
	);
};

const WebsiteSearchTool = memo(PureWebsiteSearchTool, (prevProps, nextProps) => {
	if (prevProps.tool.args?.query !== nextProps.tool.args?.query) {
		return false;
	}
	return true;
});
export default WebsiteSearchTool;
