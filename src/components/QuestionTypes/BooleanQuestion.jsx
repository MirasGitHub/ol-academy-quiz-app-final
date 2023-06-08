import React from "react";

const BooleanQuestion = ({
	selected,
	BooleanOptions,
	handleCheck,
	handleSelect,
}) => {
	return (
		<div className="questions">
			{BooleanOptions.map((option, index) => (
				<button
					key={index}
					onClick={() => {
						handleCheck(option);
					}}
					disabled={selected}
					value={option.value ? option.value : null}
					className={`btn btn-${selected && handleSelect(option)}`}
				>
					{option.name ? option.name : option}
				</button>
			))}
		</div>
	);
};

export default BooleanQuestion;
