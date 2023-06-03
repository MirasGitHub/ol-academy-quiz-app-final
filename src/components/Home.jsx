import { NavLink } from "react-router-dom";

import { Button } from "reactstrap";
import "../App.css";

const Home = () => {
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

				<NavLink to="/history">
					<br />
					<Button color="info">History</Button>
				</NavLink>
			</div>
		</div>
	);
};

export default Home;
