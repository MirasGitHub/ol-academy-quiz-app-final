import { useEffect, useState } from "react";

const DATA_URL = `https://my-json-server.typicode.com/MirasGitHub/api-for-ol-academy-final-project/db`;

const EXPIRY = 10 * 60 * 1000;

const useFetchQuestions = () => {
	const [questions, setQuestions] = useState();

	useEffect(() => {
		const fetchFromLocalStorage = () => {
			const storedData = localStorage.getItem("questions");
			const storedTimestamp = localStorage.getItem("questionsTimestamp");
			const currentTime = Date.now();

			if (
				storedData &&
				storedTimestamp &&
				currentTime - storedTimestamp < EXPIRY
			) {
				return JSON.parse(storedData);
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
		localStorage.setItem("questions", JSON.stringify(data));
		localStorage.setItem("questionsTimestamp", Date.now().toString());
	};

	return {
		questions,
	};
};

export default useFetchQuestions;
