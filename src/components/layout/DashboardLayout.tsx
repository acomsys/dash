import { TreeNode } from '../../models/TreeNode';
import { useDashStore } from '../../store/dash-store';
import { useDirectoryService } from '../../services/useDirectoryService';
import { SidebarFooterStateful } from '../sidebar/SidebarFooterComponent';
import SidebarComponent from '../../components/sidebar/SidebarComponent';
import _ from 'lodash';
import styled from 'styled-components';

const DashboardLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const count = useDashStore((s) => s.count);
  const directories = useDashStore((s) => s.dash.directories);
  const { push } = useDirectoryService();
  const { increment, decrement } = useDashStore((store) => ({
    increment: store.increment,
    decrement: store.decrement,
  }));

  const onExpand = (node: TreeNode) => {
    increment();
  };
  const onSelect = (node: TreeNode) => {
    increment();
  };
  const onMore = (node: TreeNode) => {
    decrement();
  };
  const onAdd = (node: TreeNode) => {
    push.mutate({ text: 'some' });
  };
  const onCollapse = (node: TreeNode) => {
    decrement();
  };

  return (
    <StyledDashboard>
      <div className="sb">
        <div className="sb-header">Dash {count}</div>
        <SidebarComponent
          className="sb-body"
          nodes={directories}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onSelect={onSelect}
          onMore={onMore}
          onAdd={onAdd}
        />
        <SidebarFooterStateful className="sb-footer" />
      </div>
      <div className="content">{children}</div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  height: 100%;
  width: 100%;

  & .sb {
    width: 299px;
    border-right: 1px solid #e9ebf0;
    /* background-color: green; */
    display: block;
  }

  & .sb-body {
    height: var(--dash-sb-content-height);
    min-height: var(--dash-sb-content-height);
    max-height: var(--dash-sb-content-height);
    overflow-y: scroll;
  }

  & .sb-header {
    height: var(--dash-sb-header-height);
    text-align: center;
  }

  & .content {
    flex-grow: 100;

    /* background-color: orange; */
    overflow-y: scroll;
  }

  & .e-acrdn-header-content {
    color: var(--dash-grey) !important;
  }

  /* On screens that are less than 700px wide, make the sb into a topbar */
  @media screen and (max-width: 700px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    & .sb {
      width: 100%;
      border-bottom: 1px solid #e9ebf0;
    }
  }
`;

export default DashboardLayout;
