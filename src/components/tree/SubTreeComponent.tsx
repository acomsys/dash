import { TreeNode } from '../../models/TreeNode';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import NodeComponent from './NodeComponent';

const SubTreeComponent: React.FC<SubTreeProps> = (props: SubTreeProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: props.nodes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24,
    getItemKey: (index: number) => props.nodes[index]!.id,
  });

  return (
    <div ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <NodeComponent {...props} node={props.nodes[virtualItem.index]!} />
          </div>
        ))}
      </div>
    </div>
  );
};

export type SubTreeProps = {
  nodes: TreeNode[];
  dragging: boolean;
  onExpand?: (node: TreeNode) => void;
  onCollapse?: (node: TreeNode) => void;
  onSelect?: (node: TreeNode) => void;
  onMore?: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
};

export default SubTreeComponent;
