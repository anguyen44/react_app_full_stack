import { useLocation, useNavigate } from "react-router-dom";
import { SUB_TEAMS_PATH } from "shared/config/constants/path.config";
import { teams } from "shared/config/constants/selenium.config";
import { sortItemsByDisplayName } from "shared/utils/sort.utils";

import { SidebarMenuItem } from "../subLayout.styled";
import { SubMenuUl } from "./subTeamItems.styled";

const SubTeamItems = ({ subTeams }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickSubTeam = (oidTeam) => {
    navigate(`${SUB_TEAMS_PATH}/${oidTeam}`);
  };

  const currentSubTeamCheck = (oidSubTeam) =>
    pathname === `${SUB_TEAMS_PATH}/${oidSubTeam}` ? true : false;

  const subTeamSorted = sortItemsByDisplayName(subTeams, "asc");

  return (
    <SubMenuUl>
      {subTeamSorted.map((subTeam) => (
        <SidebarMenuItem
          id={`sidebar-subitem-${subTeam.oid}`}
          aria-label="li"
          data-selenium={teams.BUTTON_SUBTEAM}
          key={subTeam.oid}
          onClick={() => onClickSubTeam(subTeam.oid)}
          className={
            currentSubTeamCheck(subTeam.oid) ? "validatedMenuItemLi" : ""
          }
        >
          {subTeam.displayName}
        </SidebarMenuItem>
      ))}
    </SubMenuUl>
  );
};

export default SubTeamItems;
