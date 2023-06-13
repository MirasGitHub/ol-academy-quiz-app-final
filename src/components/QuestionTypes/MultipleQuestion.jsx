import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const MultipleQuestion = ({
	quizQuestions,
	currentQuestion,
	setScore,
	setCurrentQuestion,
}) => {
	const [selectedMultiple, setSelectedMultiple] = useState([]);
	const [isAnswered, setIsAnswered] = useState(false);

	useEffect(() => {
		setSelectedMultiple([]);
		setIsAnswered(false);
	}, [currentQuestion]);

	const handleButtonClick = (option) => {
		if (isAnswered) return;

		if (selectedMultiple.includes(option)) {
			setSelectedMultiple(selectedMultiple.filter((item) => item !== option));
		} else {
			setSelectedMultiple([...selectedMultiple, option]);
		}
	};

	useEffect(() => {
		if (selectedMultiple.length === 2) {
			setIsAnswered(true);

			const isCorrect = selectedMultiple.every((option) =>
				quizQuestions[currentQuestion].correct_answer.includes(option)
			);

			if (isCorrect) {
				setScore((prevScore) => prevScore + 1);
			}
		}
	}, [selectedMultiple, currentQuestion, quizQuestions, setScore]);

	const handleNext = () => {
		if (selectedMultiple) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedMultiple();
		}
	};

	const renderButtonClass = (option) => {
		if (isAnswered) {
			const isCorrect =
				quizQuestions[currentQuestion].correct_answer.includes(option);
			const isSelected = selectedMultiple.includes(option);

			if (isSelected && isCorrect) {
				return "btn-success";
			} else if (isSelected && !isCorrect) {
				return "btn-danger";
			} else if (!isSelected && isCorrect) {
				return "btn-success";
			} else if (!isSelected && !isCorrect) {
				return "btn-danger";
			}
		}

		return "";
	};

	const renderOptions = () => {
		return quizQuestions[currentQuestion].options.map((option, index) => (
			<div key={index} className="options">
				<button
					className={`btn ${renderButtonClass(option)}`}
					onClick={() => handleButtonClick(option)}
					disabled={isAnswered}
				>
					{option}
				</button>
			</div>
		));
	};

	return (
		<div>
			<div className="questions">{renderOptions()}</div>
			<br />
			{isAnswered && (
				<Button color="success" onClick={handleNext}>
					Next Question
				</Button>
			)}
		</div>
	);
};

export default MultipleQuestion;
