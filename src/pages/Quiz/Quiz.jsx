import { useState } from "react";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import { Circles } from "react-loader-spinner";

import { Button, Progress } from "reactstrap";
import { useNavigate } from "react-router-dom";
import SingleQuestion from "../../components/QuestionTypes/SingleQuestion";
import MultipleQuestion from "../../components/QuestionTypes/MultipleQuestion";
import BooleanQuestion from "../../components/QuestionTypes/BooleanQuestion";

const BOOLEAN_QUESTIONS_OPTIONS = [
	{ name: "True", value: "true" },
	{ name: "False", value: "false" },
];

const Quiz = ({ score, setScore }) => {
	const { questions } = useFetchQuestions();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selected, setSelected] = useState();

	const navigate = useNavigate();

	const quizQuestions = questions?.questions || [];

	const handleSelect = (option) => {
		if (
			quizQuestions[currentQuestion].type === "single" ||
			quizQuestions[currentQuestion].type === "multiple"
		) {
			if (
				selected === option &&
				selected === quizQuestions[currentQuestion].correct_answer &&
				option === quizQuestions[currentQuestion].correct_answer
			) {
				return `success`;
			} else if (
				selected === option &&
				selected !== quizQuestions[currentQuestion].correct_answer
			) {
				return `danger`;
			} else if (option === quizQuestions[currentQuestion].correct_answer) {
				return `success`;
			} else {
				return "info";
			}
		} else if (quizQuestions[currentQuestion].type === "boolean") {
			if (
				selected === option.value &&
				selected === quizQuestions[currentQuestion].correct_answer.toString() &&
				option.value ===
					quizQuestions[currentQuestion].correct_answer.toString()
			) {
				return `success`;
			} else if (
				selected === option.value &&
				selected !== quizQuestions[currentQuestion].correct_answer.toString() &&
				option.value !==
					quizQuestions[currentQuestion].correct_answer.toString()
			) {
				return `danger`;
			} else if (
				option.value ===
				quizQuestions[currentQuestion].correct_answer.toString()
			) {
				return `success`;
			} else {
				return "info";
			}
		}
	};

	const handleCheck = (option) => {
		if (
			quizQuestions[currentQuestion].type === "single" ||
			quizQuestions[currentQuestion].type === "multiple"
		) {
			if (option === quizQuestions[currentQuestion].correct_answer) {
				setSelected(option);
				setScore(score + 1);
			} else {
				setSelected(option);
			}
		} else if (quizQuestions[currentQuestion].type === "boolean") {
			if (
				option.value ===
				quizQuestions[currentQuestion].correct_answer.toString()
			) {
				setSelected(option.value);
				setScore(score + 1);
			} else {
				setSelected(option.value);
			}
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
		<div>
			{quizQuestions && currentQuestion < quizQuestions.length ? (
				<div className="quiz-container">
					<div key={quizQuestions[currentQuestion].id}>
						<div>
							<br />
							<p>Question Type: {quizQuestions[currentQuestion].type}</p>
							<p>Score: {score}</p>
						</div>
						<div className="progress-bar">
							<div>
								<Progress multi>
									<Progress bar value={currentQuestion + 1} max={10}>
										{currentQuestion ? `${currentQuestion} / 9` : "0 / 9"}
									</Progress>
								</Progress>
							</div>
						</div>
						<br />
						<h5>Question {currentQuestion + 1}</h5>
						<h4>{quizQuestions[currentQuestion].question}</h4>
						<br />
						{quizQuestions[currentQuestion].type === "single" ? (
							<SingleQuestion
								currentQuestion={currentQuestion}
								quizQuestions={quizQuestions}
								handleCheck={handleCheck}
								handleSelect={handleSelect}
								selected={selected}
							/>
						) : quizQuestions[currentQuestion].type === "multiple" ? (
							<MultipleQuestion
								currentQuestion={currentQuestion}
								quizQuestions={quizQuestions}
								handleCheck={handleCheck}
								handleSelect={handleSelect}
								selected={selected}
							/>
						) : quizQuestions[currentQuestion].type === "boolean" ? (
							<BooleanQuestion
								handleCheck={handleCheck}
								handleSelect={handleSelect}
								selected={selected}
								BOOLEAN_QUESTIONS_OPTIONS={BOOLEAN_QUESTIONS_OPTIONS}
							/>
						) : null}
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
				</div>
			) : (
				<div className="spinner">
					<Circles color="white" />
				</div>
			)}
			<br />
		</div>
	);
};

export default Quiz;
