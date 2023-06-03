import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz/Quiz";
import Results from "./components/Results";
import { useEffect, useState } from "react";
import History from "./components/History/History";

function App() {
	const [score, setScore] = useState(0);
	const [quizResults, setQuizResults] = useState([]);
	const [currentResult, setCurrentResult] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedResults = localStorage.getItem("Results");
		if (storedResults) {
			setQuizResults(JSON.parse(storedResults));
		}
	}, [setQuizResults]);

	useEffect(() => {
		const storedResults = localStorage.getItem("Results");
		if (storedResults) {
			setQuizResults(JSON.parse(storedResults));
		}

		if (storedResults) {
			const parsedResults = JSON.parse(storedResults);

			const sortedResults = parsedResults.sort((a, b) => {
				if (a.points !== b.points) {
					return b.points - a.points;
				}

				return new Date(b.date) - new Date(a.date);
			});

			setQuizResults(sortedResults);
		}
	}, []);

	const refreshPage = () => {
		setScore(0);
		navigate("/");
	};
	return (
		<div className="App">
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route
					path="quiz"
					element={
						<Quiz score={score} setScore={setScore} refreshPage={refreshPage} />
					}
				/>
				<Route
					path="results"
					element={
						<Results
							score={score}
							refreshPage={refreshPage}
							quizResults={quizResults}
							setQuizResults={setQuizResults}
							currentResult={currentResult}
							setCurrentResult={setCurrentResult}
						/>
					}
				/>
				<Route
					path="history"
					element={
						<History
							quizResults={quizResults}
							setQuizResults={setQuizResults}
							currentResult={currentResult}
							setCurrentResult={setCurrentResult}
							score={score}
							setScore={setScore}
							refreshPage={refreshPage}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
