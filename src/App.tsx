import { TimerReset } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "#components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#components/ui/card";

const storedElapsedTime = localStorage.getItem("elapsedTime");
if (!storedElapsedTime) localStorage.setItem("elapsedTime", "0");

function App() {
	// Hooks
	const [isClockRunning, setIsClockRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(Number(storedElapsedTime));
	const startTime = useRef(0);
	useEffect(() => {
		if (!isClockRunning) return;

		const intervalId = setInterval(() => {
			const currentTime = Date.now() - startTime.current;
			setElapsedTime(currentTime);
		}, 10);

		return () => clearInterval(intervalId);
	}, [isClockRunning]);

	// Functions

	function handleTimer() {
		if (startTime.current === 0) startTime.current = Date.now() - elapsedTime;
		setIsClockRunning((c) => !c);
	}

	function handleReset() {
		if (elapsedTime === 0 && !isClockRunning) return;

		setElapsedTime(0);
		setIsClockRunning(false);
		startTime.current = 0;
	}

	function formatTime() {
		const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
		const min = Math.floor((elapsedTime / (1000 * 60)) % 60);
		const sec = Math.floor((elapsedTime / 1000) % 60);
		const milSec = Math.floor(elapsedTime % 1000);

		const pad = (n: number) => String(n).padStart(2, "0");
		return `${pad(hours)}:${pad(min)}:${pad(sec)}:${pad(milSec)}`;
	}

	localStorage.setItem("elapsedTime", elapsedTime.toString());

	return (
		<section className="w-11/12 mx-auto h-svh flex flex-col items-center justify-center">
			<Card className="w-full max-w-170">
				<CardHeader>
					<CardTitle>Stopwatch</CardTitle>
				</CardHeader>

				<CardContent className="overflow-x-auto overflow-y-hidden">
					<span className="max-sm:text-4xl text-7xl">{formatTime()}</span>
				</CardContent>

				<CardFooter className="max-md:flex-col gap-2">
					<Button
						onClick={handleTimer}
						variant={isClockRunning ? "secondary" : "default"}
						size="lg"
						className="max-md:w-full w-10/12 text-lg"
					>
						{isClockRunning ? "Pause" : "Start"}
					</Button>
					<Button
						onClick={handleReset}
						variant="destructive"
						size="lg"
						className="max-md:w-full w-2/12 text-lg"
					>
						<TimerReset /> Reset
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}

export default App;
