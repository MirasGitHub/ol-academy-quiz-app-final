import { useEffect, useRef } from "react";
import uuid from "react-uuid";

import { Button } from "reactstrap";

import "./Popup.scss";

const Popup = ({
	handleClose,
	score,
	refreshPage,
	quizResults,
	setQuizResults,
	currentResult,
	setCurrentResult,
	updatedResults,
	setUpdatedResults,
}) => {
	const popupRefWrapper = useRef(null);

	const popupRef = useRef(null);

	useEffect(() => {
		const handleClick = (e) => {
			if (popupRef.current && popupRefWrapper.current) {
				if (
					popupRefWrapper.current.contains(e.target) &&
					!popupRef.current.contains(e.target)
				) {
					handleClose();
				}
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	});

	useEffect(() => {
		const storedResults = localStorage.getItem("Results");
		if (storedResults) {
			setQuizResults(JSON.parse(storedResults));
		}
	}, [setQuizResults]);
	/*
	const handleSave = (answer) => {
		if (answer === "Yes") {
			const currentQuizResult = {
				id: uuid(),
				points: score,
				total: 9,
				date: new Date().toLocaleString("en-US", {
					timeZone: "Asia/Tbilisi",
				}),
			};
			setCurrentResult(currentQuizResult);

			if (currentResult) {
				const updatedResults = [...quizResults, currentResult];
				localStorage.setItem("Results", JSON.stringify(updatedResults));
			} else {
				const updatedResults = [...quizResults, currentQuizResult];
				localStorage.setItem("Results", JSON.stringify(updatedResults));
			}

			setTimeout(() => {
				refreshPage();
			}, 100);
		} else if (answer === "No") {
			refreshPage();
		}
	};
	*/
	const handleSave = (answer) => {
		if (answer === "Yes") {
			const currentQuizResult = {
				id: uuid(),
				points: score,
				total: 9,
				date: new Date().toLocaleString("en-US", {
					timeZone: "Asia/Tbilisi",
				}),
			};
			setCurrentResult(currentQuizResult);

			if (currentResult) {
				const updatedResults = [...quizResults, currentResult];
				localStorage.setItem("Results", JSON.stringify(updatedResults));
				setUpdatedResults(updatedResults); // Update the updatedResults state
			} else {
				const updatedResults = [...quizResults, currentQuizResult];
				localStorage.setItem("Results", JSON.stringify(updatedResults));
				setUpdatedResults(updatedResults); // Update the updatedResults state
			}

			setTimeout(() => {
				refreshPage();
			}, 100);
		} else if (answer === "No") {
			refreshPage();
		}
	};

	return (
		<div className="popup-wrapper" ref={popupRefWrapper}>
			<div className="popup" ref={popupRef}>
				<h3>Do you want to save this attempt? </h3>
				<br />
				<Button color="success" onClick={() => handleSave("Yes")}>
					Yes
				</Button>
				<Button color="danger" onClick={() => handleSave("No")}>
					No
				</Button>
			</div>
		</div>
	);
};

export default Popup;
