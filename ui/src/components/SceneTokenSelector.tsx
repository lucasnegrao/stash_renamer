import { CollapseButton } from "./shared/CollapseButton";
import { TagItem } from "./shared/TagItem";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button } = PluginApi.libraries.Bootstrap;

interface ISceneTokenSelectorProps {
  tree: Array<{
    name: string;
    token: string;
    children?: Array<{ name: string; token: string }>;
  }>;
  loading?: boolean;
  onReload: () => void;
  onInsertToken?: (token: string) => void;
}

interface ITokenNode {
  name: string;
  token: string;
  children?: Array<{ name: string; token: string }>;
}

const CollapsibleTokenNode: React.FC<{
  node: ITokenNode;
  onDragStartToken: (token: string) => (event: any) => void;
  onInsertToken?: (token: string) => void;
}> = ({ node, onDragStartToken, onInsertToken }) => {
  const labelRef = React.useRef<HTMLSpanElement | null>(null);
  const childContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [childPaddingLeft, setChildPaddingLeft] = React.useState(2);

  React.useEffect(() => {
    const recalc = () => {
      const labelEl = labelRef.current;
      const childEl = childContainerRef.current;
      if (!labelEl || !childEl) return;
      const labelLeft = labelEl.getBoundingClientRect().left;
      const childLeft = childEl.getBoundingClientRect().left;
      const delta = Math.max(0, Math.round(labelLeft - childLeft));
      setChildPaddingLeft(delta);
    };

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <CollapseButton
      className="mt-1"
      text={
        <span ref={labelRef}>
          <TagItem
            draggable
            onDragStart={onDragStartToken(node.token)}
            style={{ cursor: "grab" }}
          >
            {node.token}
          </TagItem>
        </span>
      }
    >
      <div ref={childContainerRef} className="mt-2" style={{ paddingLeft: `${childPaddingLeft}px` }}>
        {node.children?.map((child) => (
          <div
            key={child.token}
            className="d-flex align-items-center justify-content-between"
          >
            <TagItem
              draggable
              onDragStart={onDragStartToken(child.token)}
              style={{ cursor: "grab" }}
            >
              {child.token}
            </TagItem>
            {onInsertToken ? (
              <Button
                variant="link"
                size="sm"
                onClick={() => onInsertToken(child.token)}
              >
                insert
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </CollapseButton>
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
      <CollapseButton 
          className="scene-token-root"
          text="Template Tokens"
          open={true}
        >
          <div className="card-body">
            {tree.length === 0 ? (
              <div className="text-muted">No scene tokens loaded</div>
            ) : (
              tree.map((node) => (
                <div
                  key={node.token}
                  className="mb-1"
                >
                  {Array.isArray(node.children) && node.children.length > 0 ? (
                    <CollapsibleTokenNode
                      node={node}
                      onDragStartToken={handleDragStart}
                      onInsertToken={onInsertToken}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-between">
                      <TagItem
                        draggable
                        onDragStart={handleDragStart(node.token)}
                        style={{ cursor: "grab" }}
                      >
                        {node.token}
                      </TagItem>
                      {onInsertToken ? (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => onInsertToken(node.token)}
                        >
                          insert
                        </Button>
                      ) : null}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CollapseButton>
        <small className="text-muted d-block mt-2">
          Drag tokens into filename/path inputs or click insert.
        </small>
    </>
  );
};
