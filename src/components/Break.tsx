import React from "react";

const Break: React.FC<Props> = ({
	breakLength,
	incBreakLength,
	decBreakLength,
}) => {
	// const breakLenInMin = moment.duration(breakLength,'s').Minutes;
	const breakLenInMin = breakLength / 60;
	return (
		<div>
			<p id="break-label">Break</p>
			<p id="break-length">{breakLenInMin}</p>
			<button id="break-decrement" onClick={decBreakLength}>
				{" "}
				-{" "}
			</button>
			<button id="break-increment" onClick={incBreakLength}>
				{" "}
				+{" "}
			</button>
			{/* {console.log("ak")} */}
		</div>
	);
};
type Props = {
	breakLength: number;
	incBreakLength: () => void;
	decBreakLength: () => void;
};
export default Break;
