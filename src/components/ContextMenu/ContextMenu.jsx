import "./ContextMenu.scss";

const ContextMenu = ({
	handleRemove,
	coordinates,
	contextMenuRef,
	clickedId,
}) => {
	return (
		<div>
			<div
				ref={contextMenuRef}
				style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px` }}
				className="contextMenuContainer"
			>
				<div>
					<button
						onClick={() => {
							handleRemove(clickedId);
						}}
						className="btn btn-danger"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export { ContextMenu };
