import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import { SidebarMenuItem } from "shared/components/sub-layout/subLayout.styled";
import SubTeamItems from "shared/components/sub-layout/subTeams/subTeamItems.component";
import { TEAMS_PATH } from "shared/config/constants/path.config";
import {
  addCheckedTeam,
  removeCheckedTeam,
} from "shared/store/slices/teamMenu/teamMenu.slice";

import {
  CustomArrowIcon,
  MenuItemWrapper,
  RotateIconWrapper,
  SubTeamsCollapse,
} from "./teamItem.styled";

const TeamItem = ({ team }) => {
  const { pathname } = useLocation();
  const { subTeams } = team;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkedTeamsList = useSelector(
    (state) => state.teamMenuReducer.checkedSubMenu,
  );

  const onClickTeam = () => {
    navigate(`${TEAMS_PATH}/${team.oid}`);
    checkTeam();
  };

  const currentTeamCheck = (oidTeam) => pathname === `${TEAMS_PATH}/${oidTeam}`;

  const toggleShowSubMenu = () => {
    if (!checkTeam()) {
      dispatch(removeCheckedTeam(team.oid));
    }
  };

  const checkTeam = () => {
    if (!checkedTeamsList.includes(team.oid)) {
      dispatch(addCheckedTeam(team.oid));
      return true;
    }
    return false;
  };

  const checkTeamFocused = (oidTeam) => {
    return checkedTeamsList.includes(oidTeam) ? true : false;
  };

  const checked = checkTeamFocused(team.oid);

  const rotateIcon = useMemo(() => {
    return (
      <CustomArrowIcon
        data-testid="collapse-icon"
        onClick={toggleShowSubMenu}
        $checked={checked}
      />
    );
  }, [checked]);

  const subMenuRender = useMemo(() => {
    return (
      <SubTeamsCollapse $checked={checked}>
        <SubTeamItems subTeams={subTeams} />
      </SubTeamsCollapse>
    );
  }, [checked, subTeams]);

  return (
    <MenuItemWrapper data-testid="team-item">
      <SidebarMenuItem
        className={currentTeamCheck(team.oid) ? "validatedMenuItemLi" : ""}
      >
        <Row>
          <Col spanPercent={"12%"}>
            {/* showing arrow icon if having sub menus */}
            <RotateIconWrapper>
              <>{subTeams.length > 0 ? <>{rotateIcon}</> : <></>}</>
            </RotateIconWrapper>
          </Col>
          <Col spanPercent={"88%"}>
            {/* show list team items */}
            <div onClick={onClickTeam} data-selenium={"main-team-id"}>
              {team.displayName?.toUpperCase()}
            </div>
          </Col>
        </Row>
      </SidebarMenuItem>
      <>{subMenuRender}</>
    </MenuItemWrapper>
  );
};

export default TeamItem;
