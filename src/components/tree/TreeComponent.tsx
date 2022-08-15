import { TreeNode } from "../../models/TreeNode";
import { useDragDropManager } from "react-dnd";
import { useEffect, useState } from "react";
import SubTreeComponent from "./SubTreeComponent";

const TreeComponent: React.FC<TreeProps> = (props: TreeProps) => {
  const [dragging, setDragging] = useState(false);

  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  useEffect(
    () =>
      monitor.subscribeToStateChange(() => {
        setDragging(monitor.isDragging() === true);
      }),
    [monitor]
  );

  return (
    <div className="tree">
      <SubTreeComponent
        {...props}
        parent={undefined}
        level={0}
        dragging={dragging}
      />
    </div>
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
