import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import "./Question.css";
import { Button, Progress } from "reactstrap";

const Question = ({
	currentQuizQuestion,
	quizQuestion,
	quizQuestions,
	options,
	currentQuestion,
	setCurrentQuestion,
	score,
	setScore,
}) => {
	const [selected, setSelected] = useState();

	const navigate = useNavigate();

	const correctAnswer = currentQuizQuestion.correct_answer;

	// const isSingleType = currentQuizQuestion.type === "single";
	// const isMultipleType = currentQuizQuestion.type === "multiple";
	// const isBooleanType = currentQuizQuestion.type === "boolean";

	const handleSelect = (option) => {
		if (
			selected === option &&
			selected === correctAnswer &&
			option === correctAnswer
		) {
			return `success`;
		} else if (selected === option && selected !== correctAnswer) {
			return `danger`;
		} else if (option === correctAnswer) {
			return `success`;
		} else {
			return "info";
		}
	};

	const handleCheck = (option) => {
		if (option === correctAnswer) {
			setSelected(option);
			setScore(score + 1);
		} else {
			setSelected(option);
		}
	};

	const handleNext = () => {
		if (currentQuestion === quizQuestions.length - 1) {
			navigate("/results");
		} else if (selected) {
			setCurrentQuestion(currentQuestion + 1);
			setSelected();
		}
	};

	return (
		<div key={currentQuestion} className="quiz-container">
			<div>
				<br />
				<p>Question Type: {currentQuizQuestion.type}</p>
				<p>Score: {score}</p>
			</div>
			<div className="progress-bar">
				<Progress multi>
					<Progress bar value={currentQuestion + 1} max={10}>
						{currentQuestion ? `${currentQuestion} / 9` : "0 / 9"}
					</Progress>
				</Progress>
			</div>
			<br />
			<div className="questions">
				<h5>Question {currentQuestion + 1}</h5>

				<h4>{quizQuestion}</h4>
				<br />
				<div className="options">
					{options.map((option) => {
						return (
							<div key={option}>
								<button
									className={`btn btn-${selected && handleSelect(option)}`}
									onClick={() => handleCheck(option)}
									disabled={selected}
								>
									{option.toString()}
								</button>
							</div>
						);
					})}
				</div>
			</div>

			<br />
			{selected && (
				<div className="controls">
					<Button color="success" onClick={handleNext}>
						{currentQuestion === quizQuestions.length - 1
							? "Final Question"
							: "Next Question"}
					</Button>
				</div>
			)}
		</div>
	);
};

export default Question;
