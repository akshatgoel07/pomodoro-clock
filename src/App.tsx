import React from "react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";
import { useState, useEffect, useRef } from "react";
function App() {
	const audioElement = useRef<HTMLAudioElement>(null);
	const [currentSessionType, currentSessionTypeSet] = useState("Session");
	const [intervalId, setIntervalId] = useState<number | null>(null);
	// lifting state up
	const [breakLength, setBreakLength] = useState(300);
	const incBreakLength = () => {
		const newBreakLength = breakLength + 60;
		if (newBreakLength <= 60 * 60) {
			setBreakLength(newBreakLength);
		}
	};
	const decBreakLength = () => {
		const newBreakLength = breakLength - 60;
		if (newBreakLength < 0) setBreakLength(0);
		else setBreakLength(newBreakLength);
	};

	const [sessionLength, setSessionLength] = useState(60 * 25);
	const incSessionLength = () => {
		const newSessionLength = sessionLength + 60;
		if (sessionLength < 60 * 60) setSessionLength(newSessionLength);
	};
	const decSessionLength = () => {
		const newSessionLength = sessionLength - 60;
		if (newSessionLength > 0) {
			setSessionLength(newSessionLength);
		}
		if (newSessionLength < 0) setSessionLength(0);
	};

	const handleResetButtonClick = () => 
	{
		if(intervalId) clearInterval(intervalId);
		
		setIntervalId(null);
		currentSessionTypeSet("Session");
		setBreakLength(60 * 5);
		setSessionLength(60 * 25);
		setTimeLeft(60 * 25);
	};
	const isStarted = intervalId !== null;

	const handleStartStopCLick = () => {
		// audioElement.current.load();
		if (isStarted) {
			clearInterval(intervalId);
			setIntervalId(null);
		} else {
			const newIntervalId = setInterval(() => {
				setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
					
			}, 10);
			setIntervalId(newIntervalId);
		}
	};

	const [timeLeft, setTimeLeft] = useState(sessionLength);
	useEffect(() => {
		setTimeLeft(sessionLength);
	}, [sessionLength]);
	useEffect(() => {
		if (timeLeft === 0) {
			if (currentSessionType === "Session") {
				currentSessionTypeSet("Break");
				setTimeLeft(breakLength);
			} else if (currentSessionType === "Break") {
				currentSessionTypeSet("Session");
				setTimeLeft(sessionLength);
			}
		}
	}, [timeLeft, currentSessionType, sessionLength, breakLength]);
	return (
		<div className="App">
			<Break
				breakLength={breakLength}
				incBreakLength={incBreakLength}
				decBreakLength={decBreakLength}
			/>
			<TimeLeft
				handleStartStopCLick={handleStartStopCLick}
				timeLabel={currentSessionType}
				startStopButtonLabel={isStarted ? "Stop" : "Start"}
				timeLeft={timeLeft}
			/>
			<Session
				sessionLength={sessionLength}
				incSessionLength={incSessionLength}
				decSessionLength={decSessionLength}
			/>
			<button id="reset" onClick={handleResetButtonClick}>
				Reset
			</button>
			<audio id="beep" ref={audioElement}>
				<source
					src="https://onlineclock.net/audio/options/default.mp3"
					type="audio/mpeg"
				/>
			</audio>
		</div>
	);
}
export default App;
