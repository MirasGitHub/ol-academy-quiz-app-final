import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Button } from "reactstrap";
import "../ContextMenu/ContextMenu.css";

import { ContextMenu } from "../ContextMenu/ContextMenu";

const History = ({ refreshPage, quizResults }) => {
	const handleBackToHome = () => {
		refreshPage();
	};

	const [isShow, setIsShow] = useState(false);
	const [coordinates, setCoordinates] = useState({
		x: 0,
		y: 0,
	});

	const handleRemove = (index) => {
		console.log("removed");
		setIsShow(false);
	};

	return (
		<div className="history-container">
			<br />
			<div className="context-menu">
				{isShow && (
					<ContextMenu
						handleClose={() => setIsShow(false)}
						top={coordinates.y}
						left={coordinates.x}
						handleRemove={handleRemove}
					/>
				)}
			</div>
			<br />
			<h3>Attempts History</h3>
			<br />
			{quizResults ? (
				<ul>
					{quizResults.map((result, index) => (
						<li
							key={index}
							onContextMenu={(e) => {
								console.log("context menu");
								e.preventDefault();
								setIsShow(true);
								setCoordinates({
									x: e.screenX,
									y: e.screenY,
								});
							}}
						>
							Points: {result.points} | Date: {result.date}
						</li>
					))}
				</ul>
			) : (
				<p> "No Attempts history yet..."</p>
			)}
			<br />
			<Button color="info" onClick={handleBackToHome}>
				<FontAwesomeIcon icon={faRightFromBracket} />
			</Button>
			<br />
		</div>
	);
};

export default History;
