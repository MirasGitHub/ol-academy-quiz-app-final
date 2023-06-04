const SingleQuestion = ({
	selected,
	handleSelect,
	handleCheck,
	quizQuestions,
	currentQuestion,
}) => {
	return (
		<div className="questions">
			{quizQuestions[currentQuestion].options.map((option, index) => (
				<div key={index} className="options">
					<button
						className={`btn btn-${selected && handleSelect(option)}`}
						onClick={() => handleCheck(option)}
						disabled={selected}
					>
						{option}
					</button>
				</div>
			))}
		</div>
	);
};

export default SingleQuestion;
