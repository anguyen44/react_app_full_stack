import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MESSAGES from "shared/config/constants/message.config";
import {
  deleteSubTeamAction,
  getApproversByTeamOidAction,
  getMainTeamInfosAction,
  getMembersByTeamOidAction,
  getRolesByTeamOidAction,
  getTeamInfosAction,
  removeApproverFromTeamAction,
  removeRoleFromTeamAction,
  updateTeamDescriptionAction,
  updateTeamDisplayNameAction,
} from "shared/store/sagas/team.saga";
import { removeUserFromTeamAction } from "shared/store/sagas/user.saga";
import { searchMainTeamOfSubTeam } from "shared/store/selectors/searchMainTeam.selector";
import {
  setIsChangingInfo,
  setIsWrittingStatus,
} from "shared/store/slices/teamPage/teamPage.slice";

import ItemDetailsComponent from "shared/components/itemDetails/detailsItem.component";
import { useAppDispatch, useAppSelector } from "shared/store";
import RolesOrgComponent from "views/roles/component/rolesOrg/rolesOrg.component";
import OrgApproversComponent from "views/users/components/orgApprovers/orgApprovers.component";
import SubTeamsComponent from "../subTeams/SubTeams.component";
import TeamInfosComponent from "../teamInfos/TeamInfos.component";
import TeamMembersComponent from "../teamMembers/TeamMembers.component";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import useServiceLoading from "shared/hooks/useServiceLoading";
import { teamPageSlice } from "shared/store/slices/teamPage/teamPage.slice";
import { triggerAlertCard } from "shared/store/slices/globalUi/globalUi.slice";

function TeamItemComponent() {
  const dispatch = useAppDispatch();

  const { teamOid } = useParams();
  const { pathname } = useLocation();
  const isSubTeamPage = pathname.includes("sub_teams");
  const isMainTeam = !isSubTeamPage;

  const { dispatchAlertSuccess } = useAlertCard();

  //#region state

  const [
    isLoadingdeleteRoleInTeamByOidList,
    setIsLoadingdeleteRoleInTeamByOidList,
  ] = useState([]);

  const [
    isLoadingdeleteUserInTeamByOidList,
    setIsLoadingdeleteUserInTeamByOidList,
  ] = useState([]);

  const [
    isLoadingdeleteSubTeamInTeamByOidList,
    setIsLoadingdeleteSubTeamInTeamByOidList,
  ] = useState([]);

  const [
    isLoadingDeleteApproverInTeamByOidList,
    setIsLoadingDeleteApproverInTeamByOidList,
  ] = useState([]);

  const [tabsComponentTitle, setTabsComponentTitle] = useState([
    "Utilisateurs",
    "Rôles",
  ]);

  //#endregion

  //#region redux store
  const teamPageReducer = useAppSelector((state) => state.teamPageReducer);
  const { members, isLoadingMainTeamInfos } = teamPageReducer;
  const userOid = useAppSelector((state) => state.userReducer?.user?.oid);
  const { oid: teamMainId } = useAppSelector(searchMainTeamOfSubTeam(teamOid));

  const { isLoading: isLoadingMembersTag } = useServiceLoading(
    getMembersByTeamOidAction,
    { teamOid },
  );

  const { isLoading: isLoadingRolesTag } = useServiceLoading(
    getRolesByTeamOidAction,
    { teamOid, isMainTeam },
  );

  const { isLoading: isLoadingApproversTag } = useServiceLoading(
    getApproversByTeamOidAction,
    { teamOid },
  );

  //#endregion

  //#region interactions
  useEffect(() => {
    dispatch(setIsWrittingStatus(false));
    dispatch(setIsChangingInfo(false));
    dispatch(getTeamInfosAction({ teamOid, userOid, isMainTeam } as any));
  }, [teamOid]);

  useEffect(() => {
    const titles = ["Membres", "Rôles"];
    if (!isSubTeamPage) {
      titles.push("Sous-équipes");
      titles.push("Suppléants");
    }
    setTabsComponentTitle(titles);
  }, [isSubTeamPage]);

  useEffect(() => {
    dispatch(getMainTeamInfosAction(teamMainId));
  }, [teamMainId]);

  //#endregion

  function confirmRemoveMember(memberOid, memberName) {
    const SUCCESS_MESSAGE = isSubTeamPage
      ? MESSAGES.DELETE_USER_SUCCESS_NEED_VALIDATION
      : MESSAGES.DELETE_USER_SUCCESS;
    setIsLoadingdeleteUserInTeamByOidList((prevState) => [
      ...prevState,
      memberOid,
    ]);

    dispatch(
      removeUserFromTeamAction({
        params: [memberOid, teamOid],
        onSuccessCallback: () => {
          dispatchAlertSuccess(
            SUCCESS_MESSAGE.format({
              memberName,
            }),
          );
          setIsLoadingdeleteUserInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== memberOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingdeleteUserInTeamByOidList((prevState) => [
            ...prevState.filter((element) => element !== memberOid),
          ]);
        },
        memberOid: memberOid,
        isSubTeamPage: isSubTeamPage,
      } as any),
    );
  }

  function confirmRemoveSubTeam(subTeamOid, subTeamDisplayName) {
    setIsLoadingdeleteSubTeamInTeamByOidList((prevState) => [
      ...prevState,
      subTeamOid,
    ]);

    dispatch(
      deleteSubTeamAction({
        teamOid: teamOid,
        subTeamOid: subTeamOid,
        onSuccessCallback: () => {
          dispatchAlertSuccess(
            MESSAGES.DELETE_SUB_TEAM_SUCCESS.format({
              subTeamDisplayName,
            }),
          );
          setIsLoadingdeleteSubTeamInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== subTeamOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingdeleteSubTeamInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== subTeamOid),
          ]);
        },
      } as any),
    );
  }

  const confirmRemoveApprover = (approverOid, approverName) => {
    setIsLoadingDeleteApproverInTeamByOidList((prevState) => [
      ...prevState,
      approverOid,
    ]);

    dispatch(
      removeApproverFromTeamAction({
        onSuccessCallback: () => {
          dispatchAlertSuccess(
            MESSAGES.DELETE_APPROVER_SUCCESS.format({
              approverName,
            }),
          );
          setIsLoadingDeleteApproverInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== approverOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingDeleteApproverInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== approverOid),
          ]);
        },
        ...{ approverOid, teamOid },
      } as any),
    );
  };

  const confirmRemoveRole = (roleOid: string, roleDiplayName: any) => {
    const SUCCESS_MESSAGE = isSubTeamPage
      ? MESSAGES.DELETE_ROLE_SUCCESS_NEED_VALIDATION.format({ roleDiplayName })
      : MESSAGES.DELETE_ROLE_SUCCESS.format({ roleDiplayName });
    setIsLoadingdeleteRoleInTeamByOidList((prevState) => [
      ...prevState,
      roleOid,
    ]);

    dispatch(
      removeRoleFromTeamAction({
        params: [roleOid, teamOid],
        onSuccessCallback: () => {
          dispatchAlertSuccess(SUCCESS_MESSAGE);
          setIsLoadingdeleteRoleInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== roleOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingdeleteRoleInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== roleOid),
          ]);
        },
        isRoleInTeamPage: true,
        isSubTeamPage,
      } as any),
    );
  };

  const onUpdateTeamDisplayName = (displayName, callback) => {
    if (displayName === "") {
      dispatch(
        triggerAlertCard({
          type: "error",
          message: MESSAGES.DISPLAY_NAME_NOT_ALLOW_NULL,
          duration: 5000,
        }),
      );
      callback();
    } else {
      dispatch(
        updateTeamDisplayNameAction({
          ...{ displayName, callback },
          oid: teamOid,
        }),
      );
    }
  };

  const onUpdateTeamDescription = (description, callback) => {
    dispatch(
      updateTeamDescriptionAction({
        ...{ description, callback },
        oid: teamOid,
      }),
    );
  };

  const tabsComponentContent = [
    <TeamMembersComponent
      key="user"
      {...{
        teamOid,
        members,
        confirmRemoveMember,
        isSubTeamPage,
        isLoadingdeleteUserInTeamByOidList,
      }}
      isLoading={isLoadingMembersTag || isLoadingMainTeamInfos}
    />,
    <RolesOrgComponent
      key="role"
      orgOid={teamOid}
      isLoadingDeleteRoleInOrgByOidList={isLoadingdeleteRoleInTeamByOidList}
      reducerState={teamPageReducer}
      isLoadingPage={isLoadingRolesTag || isLoadingMainTeamInfos}
      {...{ confirmRemoveRole }}
    />,
  ];

  if (!isSubTeamPage) {
    tabsComponentContent.push(
      <SubTeamsComponent
        key="sub-teams"
        {...{
          teamOid,
          confirmRemoveSubTeam,
          isLoadingdeleteSubTeamInTeamByOidList,
        }}
      />,
    );
    tabsComponentContent.push(
      <OrgApproversComponent
        key="team-approvers"
        orgOid={teamOid}
        isLoadingDeleteApproverInOrgByOidList={
          isLoadingDeleteApproverInTeamByOidList
        }
        reducerState={teamPageReducer}
        {...{
          confirmRemoveApprover,
        }}
        isLoading={isLoadingApproversTag}
      />,
    );
  }

  return (
    <ItemDetailsComponent
      tabsComponentTitle={tabsComponentTitle}
      tabsComponentContent={tabsComponentContent}
      slice={teamPageSlice as any}
    >
      <TeamInfosComponent
        {...{ onUpdateTeamDisplayName, onUpdateTeamDescription, isSubTeamPage }}
      />
    </ItemDetailsComponent>
  );
}

export default TeamItemComponent;
