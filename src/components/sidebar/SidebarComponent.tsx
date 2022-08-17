import {
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import styled from 'styled-components';
import { TreeNode } from '../../models/TreeNode';
import TreeComponent from '../tree/TreeComponent';
import { SidebarFooterStateful } from './SidebarFooterComponent';

export type SidebarProps = {
  className?: string;
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

const SidebarComponent: React.FC<SidebarProps> = (props) => {
  // const projectTree = () => <TreeComponent {...props} />;

  return (
    <SidebarStyle className={props.className}>
      <TreeComponent {...props} />
    </SidebarStyle>
  );
};

export default SidebarComponent;

const SidebarStyle = styled.div`
  & .sb-accordion {
    height: calc(100% - var(--dash-sb-footer-height));
  }

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

  & .sb-directories .node-switches {
    opacity: 0;
    transition: opacity 0.3s linear;
  }

  & .sb-directories:hover .node-switches {
    opacity: 1;
  }
`;
