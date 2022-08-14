import SidebarAccordionComponent from "../../components/sidebar/SidebarComponent";
import { useDashStoreShallow } from "../../store/dash-store-shallow-hook";
import { TreeNode } from "../../models/TreeNode";
import styled from "styled-components";

const DashboardLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const dashStore = useDashStoreShallow();

  const onExpand = (node: TreeNode) => {
    dashStore.decrement();
  };
  const onSelect = (node: TreeNode) => {
    dashStore.decrement();
  };
  const onMore = (node: TreeNode) => {
    dashStore.decrement();
  };
  const onAdd = (node: TreeNode) => {
    dashStore.pushSpace.mutate({ text: "some" });
  };
  const onCollapse = (node: TreeNode) => {
    dashStore.decrement();
  };

  return (
    <StyledDashboard>
      <div className="sb">
        <div className="sb-header">Dash {dashStore.count}</div>
        {dashStore.dash ? (
          <SidebarAccordionComponent
            nodes={dashStore.dash.spaces}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onSelect={onSelect}
            onMore={onMore}
            onAdd={onAdd}
          />
        ) : null}
      </div>
      <div className="content">
        <main>{children}</main>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
  width: 100%;

  & .sb {
    flex-grow: 0;
    width: 299px;
    border-right: 1px solid #e9ebf0;
    // background-color: green;
  }

  & .sb-header {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
  }

  & .content {
    flex-grow: 8;
    // background-color: orange;
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
