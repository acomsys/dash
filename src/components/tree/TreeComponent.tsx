import { TreeNode } from "../../models/TreeNode";
import SubTreeComponent from "./SubTreeComponent";

const TreeComponent: React.FC<TreeProps> = ({
  nodes,
  onExpand,
  onCollapse,
  onSelect,
  onMore,
  onAdd,
}: TreeProps) => {
  return (
    <SubTreeComponent
      nodes={nodes}
      parent={undefined}
      level={0}
      onExpand={onExpand}
      onCollapse={onCollapse}
      onSelect={onSelect}
      onMore={onMore}
      onAdd={onAdd}
    />
  );
};

export type TreeProps = {
  nodes: TreeNode[];
  onExpand?: (node: TreeNode) => void;
  onCollapse?: (node: TreeNode) => void;
  onSelect?: (node: TreeNode) => void;
  onMore?: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
};

export default TreeComponent;
