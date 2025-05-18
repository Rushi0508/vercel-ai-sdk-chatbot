import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, Paperclip, Send, Mic, X } from "lucide-react";
import { useRef, useState, JSX } from "react";
import { toast } from "sonner";

interface GlobalChatInputProps {
	onSubmit: (file?: File) => void;
	isLoading?: boolean;
	disabled?: boolean;
	message: string;
	setMessage: (message: string) => void;
	maxFileSize?: number; // in bytes
}

export function GlobalChatInput({
	onSubmit,
	isLoading,
	disabled,
	message,
	setMessage,
	maxFileSize = 30 * 1024 * 1024, // 3MB default
}: GlobalChatInputProps): JSX.Element {
	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const validateFileSize = (file: File): boolean => {
		if (file.size > maxFileSize) {
			toast.error(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`);
			return false;
		}
		return true;
	};

	const handleSubmit = () => {
		if (!message.trim() && !file) return;

		onSubmit(file || undefined);

		// Clear the input fields after submission
		setFile(null);

		// Reset the textarea height
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
		}
	};

	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newMessage = e.target.value;
		setMessage(newMessage);
		adjustTextareaHeight();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			if (validateFileSize(selectedFile)) {
				setFile(selectedFile);
				e.target.value = "";
			}
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const droppedFile = e.dataTransfer.files[0];
			if (validateFileSize(droppedFile)) {
				setFile(droppedFile);
			}
		}
	};

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
		}
	};

	const isAudioFile = (file: File) => file.type.startsWith("audio/");

	return (
		<div className="sticky bottom-0 w-full self-center bg-background p-4 pt-2">
			<div className="mx-auto w-full max-w-3xl">
				{file && (
					<div className="mb-2 flex items-center gap-2">
						<div
							className={cn(
								"flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
								isAudioFile(file) ? "bg-primary/90 text-primary-foreground" : "bg-muted/50 text-foreground"
							)}
						>
							{isAudioFile(file) ? (
								<>
									<Mic className="h-4 w-4" />
									<span className="truncate">{file.name}</span>
								</>
							) : (
								<span className="truncate">{file.name}</span>
							)}
							<span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)}KB</span>
							<button onClick={() => setFile(null)} className="text-muted-foreground hover:text-foreground">
								<X className="h-4 w-4" />
							</button>
						</div>
					</div>
				)}
				<div
					className={cn(
						"relative rounded-xl border bg-background shadow-sm",
						isDragging && "border-primary ring-2 ring-primary/20"
					)}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<Textarea
						ref={textareaRef}
						value={message}
						onChange={handleMessageChange}
						placeholder="Message..."
						className="max-h-[200px] min-h-[60px] w-full resize-none border-0 bg-transparent px-4 py-[1.3rem] focus-visible:ring-0"
						disabled={disabled || isLoading}
					/>
					<div className="absolute bottom-2 right-2 flex items-center gap-2">
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleFileChange}
							className="hidden"
							accept="audio/*,image/*,video/*,.pdf,.doc,.docx,.txt"
							disabled={disabled || isLoading}
						/>
						<Button
							size="icon"
							variant="ghost"
							className="h-8 w-8 rounded-lg hover:bg-muted"
							onClick={() => fileInputRef.current?.click()}
							disabled={disabled || isLoading}
						>
							<Paperclip className="h-5 w-5" />
						</Button>
						<Button
							size="icon"
							className="h-8 w-8 rounded-lg bg-primary"
							onClick={handleSubmit}
							disabled={disabled || isLoading || (!message.trim() && !file)}
						>
							{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
						</Button>
					</div>
					{isDragging && (
						<div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/10 backdrop-blur-sm">
							<div className="text-center">
								<Paperclip className="mx-auto h-8 w-8 text-primary" />
								<p className="mt-2 text-sm font-medium">Drop files here</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
