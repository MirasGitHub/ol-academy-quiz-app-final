import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.scss";

import Home from "./pages/Home";
import History from "./pages/History";
import Results from "./pages/Results";
import Quiz from "./pages/Quiz";

function App() {
	const [score, setScore] = useState(0);
	const [quizResults, setQuizResults] = useState([]);
	const [currentResult, setCurrentResult] = useState(null);
	const navigate = useNavigate();
	const [updatedResults, setUpdatedResults] = useState([]);

	useEffect(() => {
		const storedResults = localStorage.getItem("Results");

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
				<Route path="/" exact element={<Home quizResults={updatedResults} />} />
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
							updatedResults={updatedResults}
							setUpdatedResults={setUpdatedResults}
						/>
					}
				/>
				<Route
					path="history"
					element={
						<History
							quizResults={updatedResults}
							setQuizResults={setUpdatedResults}
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
