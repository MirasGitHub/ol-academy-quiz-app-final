import { useEffect, useState } from "react";

const DATA_URL = `https://my-json-server.typicode.com/MirasGitHub/api-for-ol-academy-final-project/db`;

const EXPIRY = 10 * 60 * 1000;

const useFetchQuestions = () => {
	const [questions, setQuestions] = useState();

	useEffect(() => {
		const fetchFromLocalStorage = () => {
			const storedData = localStorage.getItem("questions");

			if (storedData) {
				const parsedData = JSON.parse(storedData);
				const storedTimestamp = parsedData.questionsTimestamp;
				const currentTime = new Date().toLocaleString("en-US", {
					timeZone: "Asia/Tbilisi",
				});

				if (new Date(currentTime) - new Date(storedTimestamp) < EXPIRY) {
					return parsedData.questions;
				}
			}

			return null;
		};

		const fetchQuestions = async () => {
			const storedData = fetchFromLocalStorage();

			if (storedData) {
				setQuestions(storedData);
			} else {
				try {
					const response = await fetch(DATA_URL);
					const jsonData = await response.json();
					setQuestions(jsonData);

					saveDataToLocalStorage(jsonData);
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			}
		};

		fetchQuestions();
	}, []);

	const saveDataToLocalStorage = (data) => {
		const currentTime = new Date().toLocaleString("en-US", {
			timeZone: "Asia/Tbilisi",
		});

		const storedData = {
			questions: data,
			questionsTimestamp: currentTime,
		};

		localStorage.setItem("questions", JSON.stringify(storedData));
	};

	return {
		questions,
	};
};

export default useFetchQuestions;
