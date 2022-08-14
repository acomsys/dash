import {
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import styled from "styled-components";
import { TreeNode } from "../../models/TreeNode";
import TreeComponent from "../tree/TreeComponent";

export type SidebarAccordionProps = {
  nodes: TreeNode[];
  parent?: TreeNode;
  onExpand?: (node: TreeNode) => void;
  onCollapse?: (node: TreeNode) => void;
  onSelect?: (node: TreeNode) => void;
  onMore?: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
};

const favorites = () => (
  <div>
    JavaScript (JS) is an interpreted computer programming language.It was
    originally implemented as part of web browsers so that client-side scripts
    could interact with the user, control the browser, communicate
    asynchronously, and alter the document content that was displayed.
  </div>
);

const SidebarAccordionComponent: React.FC<SidebarAccordionProps> = ({
  nodes,
  parent,
  onExpand,
  onCollapse,
  onSelect,
  onMore,
  onAdd,
}: SidebarAccordionProps) => {
  const projectTree = () => (
    <TreeComponent
      nodes={nodes}
      onExpand={onExpand}
      onCollapse={onCollapse}
      onSelect={onSelect}
      onMore={onMore}
      onAdd={onAdd}
    />
  );

  return (
    <SidebardAccordionStyle>
      <AccordionComponent>
        <AccordionItemsDirective>
          <AccordionItemDirective header="Favorites" content={favorites} />
          <AccordionItemDirective
            cssClass="sb-spaces"
            header="Spaces"
            content={projectTree}
            expanded={true}
          />
          <AccordionItemDirective header="Dashboards" content={favorites} />
          <AccordionItemDirective header="Docs" content={favorites} />
        </AccordionItemsDirective>
      </AccordionComponent>
    </SidebardAccordionStyle>
  );
};

export default SidebarAccordionComponent;

const SidebardAccordionStyle = styled.div`
  & .header {
  }

  & .e-acrdn-content {
    padding: 0 !important;
  }

  & .e-accordion {
    border: 0 !important;
    background-color: transparent !important;
    background: transparent !important;
  }

  & .e-acrdn-item {
    background: transparent !important;
  }

  & .e-acrdn-header {
    background: transparent !important;
  }

  & .sb-spaces .node-switches {
    opacity: 0;
    transition: opacity 0.3s linear;
  }

  & .sb-spaces:hover .node-switches {
    opacity: 1;
  }
`;
