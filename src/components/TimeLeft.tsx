import moment from "moment";
// import momentDurationFormatSetup from "moment-duration-format";
import React, { useEffect, useState } from "react";
//@ts-ignore
momentDurationFormatSetup(moment);
const TimeLeft: React.FC<Props> = ({
	timeLeft,
	handleStartStopCLick,
	timeLabel,
	startStopButtonLabel,
}) => {
	// const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
	const formattedTimeLeft = timeLeft;
	return (
		<div>
			<p className="timer-label">{timeLabel}</p>
			<p className="time-left">{formattedTimeLeft}</p>
			<button onClick={handleStartStopCLick}>
				{startStopButtonLabel}
			</button>
		</div>
	);
};

type Props = {
	handleStartStopCLick: () => void;
	startStopButtonLabel: string 
	timeLeft: number
	timeLabel: string
}
export default TimeLeft;
