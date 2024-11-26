import { AdminBadge, LamdaUserBadge } from "icons";
import styled, { css } from "styled-components";

const accessStatusBadgeCss = css`
  height: 100%;
  margin: 0 10px;
  cursor: pointer;
  color: #c1c1c1;
  svg {
    height: 100%;
  }
`;

interface AdminBadgeIconProps {
  size?: string;
}

const AdminBadgeIcon = styled(AdminBadge)<AdminBadgeIconProps>`
  font-size: ${(props) => (props.size ? props.size : "30px")};
  ${accessStatusBadgeCss}
`;

const LamdaUserBadgeIcon = styled(LamdaUserBadge)`
  font-size: 30px;
  ${accessStatusBadgeCss}
`;

const IconWrapper = styled.div`
  align-items: center;
`;

export { AdminBadgeIcon, LamdaUserBadgeIcon, IconWrapper };
