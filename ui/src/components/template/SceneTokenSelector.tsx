import type { ITokenTreeNode } from "../../api/stasheroApi";
import { CollapseButton } from "../shared/CollapseButton";
import { TagItem } from "../shared/TagItem";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button } = PluginApi.libraries.Bootstrap;

interface ISceneTokenSelectorProps {
	tree: ITokenTreeNode[];
	loading?: boolean;
	onReload: () => void;
	onInsertToken?: (token: string) => void;
}

const INDENT_PX = 35;

const LeafTokenNode: React.FC<{
	node: ITokenTreeNode;
	onDragStartToken: (token: string) => (event: any) => void;
	onInsertToken?: (token: string) => void;
}> = ({ node, onDragStartToken, onInsertToken }) => (
	<div className="d-flex align-items-center justify-content-between">
		<TagItem
			draggable
			onDragStart={onDragStartToken(node.token)}
			style={{ cursor: "grab" }}
			onDoubleClick={() => (onInsertToken ? onInsertToken(node.token) : null)}
		>
			{node.token}
		</TagItem>
	</div>
);

const CollapsibleTokenNode: React.FC<{
	node: ITokenTreeNode;
	depth?: number;
	onDragStartToken: (token: string) => (event: any) => void;
	onInsertToken?: (token: string) => void;
}> = ({ node, depth = 0, onDragStartToken, onInsertToken }) => {
	return (
		<div style={{ marginLeft: depth * INDENT_PX }}>
			<CollapseButton
				className="mt-1"
				text={
					<TagItem
						draggable
						onDragStart={onDragStartToken(node.token)}
						style={{ cursor: "grab" }}
					>
						{node.token}
					</TagItem>
				}
			>
				<div className="mt-2">
					{node.children?.map((child) => (
						<div key={child.token} className="mb-1">
							{Array.isArray(child.children) && child.children.length > 0 ? (
								<CollapsibleTokenNode
									node={child}
									depth={depth + 1}
									onDragStartToken={onDragStartToken}
									onInsertToken={onInsertToken}
								/>
							) : (
								<div style={{ marginLeft: INDENT_PX }}>
									<LeafTokenNode
										node={child}
										onDragStartToken={onDragStartToken}
										onInsertToken={onInsertToken}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</CollapseButton>
		</div>
	);
};

export const SceneTokenSelector: React.FC<ISceneTokenSelectorProps> = ({
	tree,
	loading = false,
	onReload,
	onInsertToken,
}) => {
	const handleDragStart = (token: string) => (event: any) => {
		event.dataTransfer.setData("text/plain", token);
		event.dataTransfer.effectAllowed = "copy";
	};

	return (
		<>
			<div className="scene-token-root">
				<div className="card-body">
					{tree.length === 0 ? (
						<div className="text-muted">No scene tokens loaded</div>
					) : (
						tree.map((node) => (
							<div key={node.token} className="mb-1">
								{Array.isArray(node.children) && node.children.length > 0 ? (
									<CollapsibleTokenNode
										node={node}
										depth={0}
										onDragStartToken={handleDragStart}
										onInsertToken={onInsertToken}
									/>
								) : (
									<LeafTokenNode
										node={node}
										onDragStartToken={handleDragStart}
										onInsertToken={onInsertToken}
									/>
								)}
							</div>
						))
					)}
				</div>
			</div>
			<small className="text-muted d-block mt-2">
				Drag tokens into filename/path inputs or click insert.
			</small>
		</>
	);
};
