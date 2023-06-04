import { useState, useEffect } from "react";

const useContextMenu = (ref1, ref2) => {
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
	const [isShow, setIsShow] = useState(false);
	const [clickedId, setClickedId] = useState("");

	useEffect(() => {
		const handleRightMouseClick = (e) => {
			if (ref1.current.contains(e.target)) {
				e.preventDefault();
				setIsShow(true);
				setCoordinates({ x: e.pageX, y: e.pageY });
				setClickedId(e.target.id);
			}
		};
		document.addEventListener("contextmenu", handleRightMouseClick);
		return () =>
			document.removeEventListener("contextmenu", handleRightMouseClick);
	});

	useEffect(() => {
		const removeContext = (e) => {
			if (ref2.current && ref2.current.contains(e.target)) {
				return;
			}
			if (e.target !== ref1.current) {
				setIsShow(false);
			}
		};

		document.addEventListener("contextmenu", removeContext);
		document.addEventListener("click", removeContext);
		return () => {
			document.removeEventListener("contextmenu", removeContext);
			document.removeEventListener("click", removeContext);
		};
	}, [ref1, ref2, isShow]);

	return {
		coordinates,
		isShow,
		clickedId,
		setIsShow,
	};
};

export default useContextMenu;
