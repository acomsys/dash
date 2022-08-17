import styled from 'styled-components';
import { TreeNode } from '../../models/TreeNode';
import { DragSourceMonitor } from 'react-dnd';
import { useDrag } from 'react-dnd';
import type { Drop } from './Drop';
import { DragCollected } from './DragCollected';
import { ItemTypes } from './ItemType';
import { useTreeNodeDrops } from './hooks/useTreeNodeDrops';

const NodeComponent: React.FC<NodeProps> = (props: NodeProps) => {
  const [drop, dropTop, dropBottom, dropInner] = useTreeNodeDrops(props.node);
  const [collected, drag, dragPreview] = useDrag<
    TreeNode,
    TreeNode,
    DragCollected
  >(() => ({
    type: ItemTypes.TREE_NODE,
    item: { ...props.node },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<Drop>();
      if (item && dropResult) {
        console.log(`${props.node.id} -> ${dropResult.target.id}`);
      }
    },
    collect: (monitor: DragSourceMonitor<TreeNode, Drop>) => {
      return {
        isDragging: monitor.isDragging(),
        getClientOffset: monitor.getClientOffset(),
      };
    },
  }));

  const selectedClass = props.node.selected ? 'selected' : '';
  const draggingClass = drop.length > 0 ? 'drag-over' : '';
  const nodeClass = `${drop} ${draggingClass} ${selectedClass}`;
  return (
    <NodeContainer
      node={props.node}
      level={props.node.level}
      isDragging={collected.isDragging}
      ref={drag}
      className={nodeClass}
    >
      <div className="node-bar" />
      <div className="node-left" />
      <div className="node-switch">
        <ClickableButtonContainer
          onClick={() => {
            if (props.node.expanded) {
              if (props.onExpand) props.onExpand(props.node);
            } else {
              if (props.onCollapse) props.onCollapse(props.node);
            }
          }}
        >
          <SmallIconContainer className="sic node-switches">
            {props.node.hasChildren && props.node.expanded ? (
              <span className="e-icons e-chevron-down-fill"></span>
            ) : null}
            {props.node.hasChildren && !props.node.expanded ? (
              <span className="e-icons e-chevron-right-fill"></span>
            ) : null}
          </SmallIconContainer>
        </ClickableButtonContainer>
      </div>
      <div className="node-inner">
        <ClickableTextContainer
          onClick={() => {
            if (props.onSelect) props.onSelect(props.node);
          }}
        >
          {props.node.text}
        </ClickableTextContainer>
      </div>
      <div className="node-right">
        <SmallIconContainer className="sic">
          <ClickableButtonContainer>{props.node.id}</ClickableButtonContainer>
        </SmallIconContainer>
        <ClickableButtonContainer
          onClick={() => {
            if (props.onMore) props.onMore(props.node);
          }}
        >
          <SmallIconContainer className="sic">
            <span className="e-icons e-more-horizontal-1"></span>
          </SmallIconContainer>
        </ClickableButtonContainer>
        <ClickableButtonContainer
          onClick={() => {
            if (props.onAdd) props.onAdd(props.node);
          }}
        >
          <SmallIconContainer className="sic">
            <span className="e-icons e-plus"></span>
          </SmallIconContainer>
        </ClickableButtonContainer>
      </div>
      {props.dragging ? (
        <div>
          <div className="node-shadow">
            {(() => {
              switch (drop) {
                case 'top':
                  return <div className="drag-tip-top"></div>;
                case 'inner':
                  return <div className="drag-tip-inner"></div>;
                case 'bottom':
                  return <div className="drag-tip-bottom"></div>;
                default:
                  return null;
              }
            })()}
          </div>
          <div className="node-shadow">
            <div className="node-drag-top" ref={dropTop}></div>
            <div className="node-drag-inner" ref={dropInner}></div>
            <div className="node-drag-bottom" ref={dropBottom}></div>
          </div>
        </div>
      ) : null}
    </NodeContainer>
  );
};

export default NodeComponent;

export type NodeProps = {
  nodes: TreeNode[];
  node: TreeNode;
  dragging: boolean;
  onExpand?: (node: TreeNode) => void;
  onCollapse?: (node: TreeNode) => void;
  onSelect?: (node: TreeNode) => void;
  onMore?: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
};

export type DropResult = {
  id: string;
};

export type NodeStyleProps = {
  node: TreeNode;
  level: number;
  isDragging: boolean;
};

const NodeContainer = styled.div<NodeStyleProps>`
  display: flex;
  flex-direction: row;
  height: var(--dash-row-height);
  width: 100%;
  position: relative;
  cursor: pointer;

  &.selected {
    background-color: var(--selected-highlight);
    color: var(--button-icon-focused);
  }

  /*** node - drag tips - appers as broken or solid lines when dragging over ***/
  & .drag-tip-top {
    border-top: 1px solid var(--dash-dark-pink);
    width: 100%;
    height: calc(var(--dash-row-height) - 1px);
  }

  & .drag-tip-bottom {
    border-bottom: 1px solid var(--dash-dark-pink);
    width: 100%;
    height: calc(var(--dash-row-height) - 1px);
  }

  & .drag-tip-inner {
    border: 1px dashed var(--dash-dark-pink);
    width: calc(100% - 2px);
    height: calc(var(--dash-row-height) - 2px);
  }

  /*** node shadow element - overlayed on top of node ***/
  & .node-shadow {
    position: absolute;
    left: 0px;
    top: 0px;
    height: var(--dash-row-height);
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  /*** drag drop areas ***/
  & .node-drag-top {
    width: 100%;
    height: var(--dash-row-height-drag-edge);
  }

  & .node-drag-inner {
    width: 100%;
    height: var(--dash-row-height-drag);
  }

  & .node-drag-bottom {
    width: 100%;
    height: var(--dash-row-height-drag-edge);
    // pointer-events: none;
  }

  /*** drag drop areas - reactions ***/
  &.drag-over .node-drag-top {
    background-color: rgba(0, 0, 255, 0.06);
  }

  &.drag-over .node-drag-bottom {
    background-color: rgba(0, 0, 255, 0.06);
  }

  /*** node - left padding ***/
  & .node-left {
    width: ${(p) => p.level * 20}px;
    max-width: ${(p) => p.level * 20}px;
    min-width: ${(p) => p.level * 20}px;
  }

  /*** node - innert content ***/
  & .node-inner {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 100;
  }

  /*** node - right content ***/
  & .node-right {
    margin-left: auto;
    display: flex;
    flex-direction: row;
  }

  /*** node - hover ***/
  &:hover {
    background-color: var(--selected-highlight);
  }

  /*** node - bar - appears when a node is selected ***/
  & .node-bar {
    min-width: 3px;
    max-width: 3px;
    height: var(--dash-row-height);

    ${(p) =>
      p.node.selected === true
        ? `background-color: var(--button-icon-focused);`
        : ``}
  }
`;

const ClickableTextContainer = styled.div`
  height: var(--dash-row-inner-content);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-grow: 1;
`;

const SmallIconContainer = styled.div`
  font-size: 8px;
  padding-left: 4px;
  padding-right: 4px;
`;

const ClickableButtonContainer = styled.div`
  height: var(--dash-row-inner-content);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 4px;
  color: var(--button-icon-idle);

  & .e-icons {
    transition: color 0.3s linear;
  }

  &:hover .e-icons {
    color: var(--button-icon-focused);
  }
`;
