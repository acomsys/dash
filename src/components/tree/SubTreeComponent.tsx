import { TreeNode } from "../../models/TreeNode";
import NodeComponent from "./NodeComponent";

const SubTreeComponent: React.FC<SubTreeProps> = (props: SubTreeProps) => {
  var levelNodes = props.nodes.filter((n) => n.parentID === props.parent?.id);
  const mappedNodes = levelNodes.map((node: TreeNode) => {
    return (
      <div key={`node-div-${node.id}`}>
        <NodeComponent {...props} node={node} />
        {node.expanded && node.hasChildren ? (
          <SubTreeComponent {...props} level={props.level + 1} parent={node} />
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
  dragging: boolean;
  onExpand?: (node: TreeNode) => void;
  onCollapse?: (node: TreeNode) => void;
  onSelect?: (node: TreeNode) => void;
  onMore?: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
};

export default SubTreeComponent;
