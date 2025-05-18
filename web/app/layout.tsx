import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
	display: "swap",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export const metadata: Metadata = {
	title: "AI Chatbot with Search Tool",
	description: "AI Chatbot with Search Tool",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${dmSans.className} antialiased bg-background min-h-screen flex flex-col`}>{children}</body>
		</html>
	);
}
