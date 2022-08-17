import styled from 'styled-components';

export const SidebarFooterStateful: React.FC<SidebarFooterProps> = (props) => {
  return <SidebarFooterComponent {...props}></SidebarFooterComponent>;
};

export const SidebarFooterComponent: React.FC<SidebarFooterProps> = (props) => {
  return <SidebarFooter className={props.className}></SidebarFooter>;
};

export type SidebarFooterProps = {
  className?: string;
};

const SidebarFooter = styled.div`
  height: var(--dash-sb-footer-height);
  width: 100%;

  background-color: red;
`;
