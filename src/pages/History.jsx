import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

import { Button } from "reactstrap";
import "../components/ContextMenu/ContextMenu.css";

import useContextMenu from "../hooks/useContextMenu";
import { ContextMenu } from "../components/ContextMenu/ContextMenu";

const History = ({ refreshPage, quizResults, setQuizResults }) => {
	const handleBackToHome = () => {
		refreshPage();
	};

	const attemptsListRef = useRef(null);
	const contextMenuRef = useRef(null);

	const { coordinates, isShow, clickedId, setIsShow } = useContextMenu(
		attemptsListRef,
		contextMenuRef
	);

	const handleRemove = (removedId) => {
		setIsShow(false);
		const updatedAttemptsList = quizResults.filter(
			({ id }) => id !== removedId
		);
		setQuizResults(updatedAttemptsList);
	};

	return (
		<div className="history-container">
			<br />
			<div className="context-menu">
				{isShow && (
					<ContextMenu
						contextMenuRef={contextMenuRef}
						clickedId={clickedId}
						handleRemove={handleRemove}
						coordinates={coordinates}
					/>
				)}
			</div>
			<br />
			<h3>Attempts History</h3>
			<br />
			{quizResults ? (
				<ul ref={attemptsListRef}>
					{quizResults.map(({ id, points, date }) => (
						<li key={id} id={id}>
							Points: {points} | Date: {date}
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
