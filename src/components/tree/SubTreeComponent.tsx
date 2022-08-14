import { TreeNode } from "../../models/TreeNode";
import NodeComponent from "./NodeComponent";

const SubTreeComponent: React.FC<SubTreeProps> = ({
  nodes,
  parent,
  level,
  onExpand,
  onCollapse,
  onSelect,
  onMore,
  onAdd,
}: SubTreeProps) => {
  var levelNodes = nodes.filter((n) => n.parentID === parent?.id);
  const mappedNodes = levelNodes.map((node: TreeNode) => {
    return (
      <div key={`node-div-${node.id}`}>
        <NodeComponent
          node={node}
          nodes={nodes}
          parent={parent}
          level={level}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onSelect={onSelect}
          onMore={onMore}
          onAdd={onAdd}
        />
        {node.expanded && node.hasChildren ? (
          <SubTreeComponent
            nodes={nodes}
            parent={node}
            level={level + 1}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onSelect={onSelect}
            onMore={onMore}
            onAdd={onAdd}
          />
        ) : null}
      </div>
    );
  });

  return <div>{mappedNodes}</div>;
};

export type SubTreeProps = {
  nodes: TreeNode[];
  parent?: TreeNode;
  level: number;
  onExpand?: (node: TreeNode) => void;
  onCollapse?: (node: TreeNode) => void;
  onSelect?: (node: TreeNode) => void;
  onMore?: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
};

export default SubTreeComponent;
