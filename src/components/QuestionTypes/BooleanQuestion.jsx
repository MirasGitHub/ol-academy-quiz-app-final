import React from "react";

const BooleanQuestion = ({
	selected,
	BOOLEAN_QUESTIONS_OPTIONS,
	handleCheck,
	handleSelect,
}) => {
	return (
		<div className="questions">
			{BOOLEAN_QUESTIONS_OPTIONS.map((option, index) => (
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
