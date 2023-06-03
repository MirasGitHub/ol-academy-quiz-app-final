import { useEffect, useRef } from "react";
import "./ContextMenu.css";

const ContextMenu = ({ handleClose, top, left, handleRemove }) => {
	const contextMenuRef = useRef(null);

	useEffect(() => {
		const handleRightMouseClick = (e) => {
			e.preventDefault();

			if (contextMenuRef.current) {
				if (!contextMenuRef.current.contains(e.target)) {
					handleClose();
				}
			}
		};

		const handleClick = (e) => {
			if (contextMenuRef.current) {
				if (!contextMenuRef.current.contains(e.target)) {
					handleClose();
				}
			}
		};

		document.addEventListener("contextmenu", handleRightMouseClick);
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);

			document.removeEventListener("contextmenu", handleRightMouseClick);
		};
	});

	return (
		<div>
			<div
				style={{ top: top, left: left }}
				className="contextMenuContainer"
				ref={contextMenuRef}
			>
				<div>
					<button onClick={() => handleRemove()} className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export { ContextMenu };
