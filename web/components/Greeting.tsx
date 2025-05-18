"use client";
import React from "react";

interface GreetingCardProps {
	name: string;
}

const Greeting = ({ name }: GreetingCardProps) => {
	return (
		<p className="text-lg font-bold tracking-tight sm:text-2xl">
			Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, {name}!
		</p>
	);
};

export default Greeting;
