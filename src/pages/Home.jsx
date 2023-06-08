import { NavLink } from "react-router-dom";

import { Button } from "reactstrap";
import { useEffect, useState } from "react";

const Home = ({ quizResults }) => {
	const [lastAttempt, setLastAttempt] = useState(null);

	useEffect(() => {
		if (quizResults.length !== 0) {
			setLastAttempt(quizResults.slice(-1)[0]);
		}
	}, [quizResults]);

	return (
		<div>
			<div className="home-title">
				<br />
				<h1>Quiz App</h1>
			</div>
			<br />
			<div className="home-container">
				<br />
				<NavLink to="/quiz">
					<Button color="primary">START</Button>
					<br />
				</NavLink>
				<br />

				{lastAttempt && (
					<div>
						<h3>Last quiz Attempt: </h3>
						Score: {lastAttempt.points} | Date: {lastAttempt.date}
						<br />
						<NavLink to="/history">
							<br />
							<Button color="info">History</Button>
						</NavLink>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
