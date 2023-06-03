import { useEffect, useState } from "react";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import { Circles } from "react-loader-spinner";

import Question from "../Question";

const Quiz = ({ score, setScore }) => {
	const { questions } = useFetchQuestions();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState([]);

	const quizQuestions = questions?.questions || [];

	const handleAnswerSelect = (answer) => {
		setSelectedAnswer((prevAnswer) => [...prevAnswer, answer]);
	};

	useEffect(() => {
		if (currentQuestion >= quizQuestions.length) {
		}
	}, [currentQuestion, quizQuestions.length, selectedAnswer]);

	const renderQuestion = () => {
		const currentQuizQuestion = quizQuestions[currentQuestion] || null;

		if (!currentQuizQuestion) {
			return (
				<Circles
					height="80"
					width="80"
					color="blue"
					ariaLabel="circles-loading"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			);
		}

		return (
			<Question
				score={score}
				setScore={setScore}
				quizQuestion={currentQuizQuestion.question}
				quizQuestions={quizQuestions}
				currentQuizQuestion={currentQuizQuestion}
				options={currentQuizQuestion.options}
				currentQuestion={currentQuestion}
				onSelectAnswer={handleAnswerSelect}
				setCurrentQuestion={setCurrentQuestion}
			/>
		);
	};
	return (
		<div>
			{currentQuestion < quizQuestions.length ? (
				renderQuestion()
			) : (
				<div className="spinner">
					<Circles
						height="80"
						width="80"
						color="white"
						ariaLabel="circles-loading"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
					/>
				</div>
			)}
			<br />
		</div>
	);
};

export default Quiz;
