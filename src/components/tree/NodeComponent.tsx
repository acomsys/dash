import { TreeNode } from "../../models/TreeNode";
import styled from "styled-components";

const NodeComponent: React.FC<NodeProps> = (props: NodeProps) => {
  return (
    <NodeStyle node={props.node}>
      <div className="bar" />
      <NodePadding level={props.level}>
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
        <ClickableTextContainer
          onClick={() => {
            if (props.onSelect) props.onSelect(props.node);
          }}
        >
          <TextNode>{props.node.text}</TextNode>
        </ClickableTextContainer>
      </NodePadding>
      <RightActionContainer>
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
      </RightActionContainer>
    </NodeStyle>
  );
};

export default NodeComponent;

export type NodeProps = {
  nodes: TreeNode[];
  node: TreeNode;
  parent?: TreeNode;
  level: number;
  onExpand?: (node: TreeNode) => void;
  onCollapse?: (node: TreeNode) => void;
  onSelect?: (node: TreeNode) => void;
  onMore?: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
};

export type NodePaddingProps = {
  level: number;
};

export type NodeStyleProps = {
  node: TreeNode;
};

const NodeStyle = styled.div<NodeStyleProps>`
  height: 24px;

  align-items: center;
  display: flex;

  ${(p) =>
    p.node.selected === true
      ? `
      background-color: var(--selected-highlight);
      color: var(--button-icon-focused);
      `
      : ``}

  &:hover {
    background-color: purple;
  }

  & .bar {
    min-width: 3px;
    height: 24px;

    ${(p) =>
      p.node.selected === true
        ? `background-color: var(--button-icon-focused);`
        : ``}
  }
`;

const NodePadding = styled.div<NodePaddingProps>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-left: ${(p) => p.level * 20}px;

  //   background-color: pink;
  width: 100%;
`;

const RightActionContainer = styled.div`
  margin-left: auto;
  display: flex;

  // background-color: green;
`;

const ClickableTextContainer = styled.div`
  height: 24px;
  // background-color: red;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-grow: 1;

  cursor: pointer;
`;

const TextNode = styled.p`
  // background-color: yellow;
`;

const SmallIconContainer = styled.div`
  font-size: 8px;
  padding-left: 4px;
  padding-right: 4px;
`;

const ClickableButtonContainer = styled.div`
  height: 24px;
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 3px;
  color: var(--button-icon-idle);

  & .e-icons {
    transition: color 0.3s linear;
  }

  &:hover .e-icons {
    color: var(--button-icon-focused);
  }

  &:hover .sic {
    transform: scale(1.3);
  }
`;
