import React, { useState } from "react";

import Popup from "../components/Popup/Popup";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Results = ({
	score,
	refreshPage,
	currentResult,
	setCurrentResult,
	quizResults,
	setQuizResults,
	updatedResults,
	setUpdatedResults,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();

	const handleRouteToHistory = () => {
		navigate("/history");
	};

	return (
		<div className="results-container">
			<h4>
				<br />
				Final Score: {score} / 9.
			</h4>
			<br />
			{isOpen && (
				<Popup
					refreshPage={refreshPage}
					score={score}
					handleClose={() => setIsOpen(!isOpen)}
					quizResults={quizResults}
					setQuizResults={setQuizResults}
					currentResult={currentResult}
					setCurrentResult={setCurrentResult}
					updatedResults={updatedResults}
					setUpdatedResults={setUpdatedResults}
				/>
			)}
			<br />
			<Button color="primary" onClick={() => setIsOpen(!isOpen)}>
				Try again
			</Button>
			<br />
			<br />
			<Button color="info" onClick={handleRouteToHistory}>
				See Attempts History
			</Button>
		</div>
	);
};

export default Results;
