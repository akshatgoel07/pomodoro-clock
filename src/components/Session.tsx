import React from "react";
const Session: React.FC<Props> = ({ sessionLength, incSessionLength, decSessionLength }) => {
	// const SessionLenInMin = moment.duration(SessionLength,'s').Minutes;
	const sessionLenInMin = sessionLength / 60;
	return (
		<div>
			<p id="session-label">Session</p>
			<p id="session-length">{sessionLenInMin}</p>
			<button id="session-decrement" onClick={decSessionLength}>
				{" "}
				-{" "}
			</button>
			<button id="session-increment" onClick={incSessionLength}>
				{" "}
				+{" "}
			</button>
		</div>
	);
};

type Props = {
	sessionLength: number;
	incSessionLength: () => void;
	decSessionLength: () => void;
};

export default Session;
