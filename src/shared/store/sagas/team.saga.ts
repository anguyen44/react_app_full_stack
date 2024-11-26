import { PayloadAction, createAction } from "@reduxjs/toolkit";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import MESSAGES from "shared/config/constants/message.config";
import RoleService from "shared/services/role/role.service";
import TeamService from "shared/services/team/team.service";
import { triggerAlertCard } from "shared/store/slices/globalUi/globalUi.slice";
import { addTeams } from "shared/store/slices/user/user.slice";

import {
  addMembersTemporarily,
  removeApproverByOid,
  removeRoleByOid,
  setApprovers,
  setChangingInfo,
  setIsCaseValidationImpossible,
  setIsLoadingMainTeamInfos,
  setIsLoadingPage,
  setIsOwner,
  setMainTeamMembers,
  setMainTeamRoles,
  setMembers,
  setReadOnlyState,
  setRoles,
  setTeamInfo,
} from "../slices/teamPage/teamPage.slice";
import { removeSubTeam } from "../slices/user/user.slice";
import TeamModel from "shared/model/team.model";
import { UserModel } from "shared/model/user.model";
import RoleModel from "shared/model/role.model";

export const createSubTeamAction = createAction<CreateSubTeamParams>(
  "teamSaga/createSubTeam",
);
export const getTeamInfosAction = createAction<GetTeamInfosParams>(
  "teamSaga/getTeamInfos",
);
export const getMainTeamInfosAction = createAction<string>(
  "teamSaga/getMainTeamInfos",
);
export const getTeamsListAction = createAction("teamSaga/getTeamsList");
export const getSelfTeamsAction = createAction<ServiceListCallBack<TeamModel>>(
  "teamSaga/getSelfTeams",
);
export const addRoleToSubTeamAction =
  createAction<ServiceVoidCallBackWithParams>("teamSaga/addRoleToSubTeam");
export const addUserToTeamAction = createAction<AddUserToTeamParams>(
  "teamSaga/addUserToTeam",
);

export const updateTeamDisplayNameAction =
  createAction<UpdateTeamDisplayNameParams>("teamSaga/updateTeamDisplayName");

export const updateTeamDescriptionAction =
  createAction<UpdateTeamDescriptionParams>("teamSaga/updateTeamDescription");

export const removeRoleFromTeamAction = createAction<RemoveRoleFromTeamParams>(
  "teamSaga/removeRoleFromTeam",
);
export const deleteSubTeamAction = createAction<DeleteSubTeamParams>(
  "teamSaga/deleteSubTeam",
);
export const addApproverToTeamAction =
  createAction<ServiceVoidCallBackWithParams>("teamSaga/addApproverToTeam");
export const removeApproverFromTeamAction =
  createAction<RemoveApproverFromTeamParams>("teamSaga/removeApproverFromTeam");

export const getApproversByTeamOidAction =
  createAction<GetUsersByTeamOidParams>("userSaga/getApproversByTeamOid");

export const getMembersByTeamOidAction = createAction<GetUsersByTeamOidParams>(
  "userSaga/getMembersByTeamOid",
);

export const getRolesByTeamOidAction = createAction<GetRolesByTeamOidParams>(
  "userSaga/getRolesByTeamOid",
);

type GetTeamInfosParams = {
  teamOid: string;
  userOid: string;
  isMainTeam: boolean;
};

function* getTeamInfos(data: PayloadAction<GetTeamInfosParams>) {
  yield put(setReadOnlyState(false));
  yield put(setIsLoadingPage(true));

  const { teamOid, userOid, isMainTeam } = data.payload;
  try {
    const teams = yield select((state) => state.userReducer.teams);
    const flatAllTeamsAndSubTeams = teams.reduce((acc, team) => {
      acc = [...acc, team];
      acc.push(...team.subTeams);
      return acc;
    }, []);

    let { ...teamInfo } = flatAllTeamsAndSubTeams.find(
      (t) => t.oid === teamOid,
    );

    let teamByOid = { ...teamInfo };
    let owner: UserModel = new UserModel("", "", "", "", true, "");

    if (isMainTeam) {
      owner = yield call(() => TeamService.getOwnerByOid(teamOid));
      teamByOid = { ...teamInfo, owner };
    }

    yield put(setTeamInfo(teamByOid as TeamModel));

    const { oid, displayName, description, readOnly } = teamInfo;
    yield put(setChangingInfo({ oid, displayName, description }));
    yield put(setIsOwner(userOid === owner?.oid));
    yield put(setIsLoadingPage(false));
    yield put(setReadOnlyState(readOnly));
  } catch (error) {
    yield put(setReadOnlyState(false));
    console.error("saga getTeamAction", error);
  }
}

type CreateSubTeamParams = {
  teamOid: string;
  name: string;
  description: string;
};

function* createSubTeam({ payload }: PayloadAction<CreateSubTeamParams>) {
  try {
    const { teamOid, name, description } = payload;

    yield call(() => TeamService.createSubTeam(teamOid, name, description));
    yield put(
      triggerAlertCard({
        type: "success",
        message: MESSAGES.CREATE_SUBTEAM_SUCCESS.format({ name }),
        duration: 3000,
      }),
    );

    const teamList: TeamModel[] = yield call(() => TeamService.getTeams());
    yield put(addTeams(teamList));
  } catch (error) {
    console.error("error when creating a sub team", error);
  }
}

function* getMainTeamInfos(data: PayloadAction<string>) {
  yield put(setIsLoadingMainTeamInfos(true));
  const teamOid = data.payload;
  try {
    if (data.payload) {
      const { members, roles, isCaseValidationPossible } = yield all({
        members: call(() => TeamService.getMembersByOid(teamOid)),
        roles: call(() => RoleService.getByTeamOid(teamOid, true)),
        isCaseValidationPossible: call(() =>
          TeamService.verifyTeamCaseValidationPossible(teamOid),
        ),
      });
      yield put(setIsCaseValidationImpossible(!isCaseValidationPossible));
      yield put(setMainTeamRoles(roles));
      yield put(setMainTeamMembers(members));
    } else {
      yield put(setIsCaseValidationImpossible(false));
      yield put(setMainTeamRoles([]));
    }
  } catch (error) {
    yield put(setIsCaseValidationImpossible(false));
    yield put(setMainTeamRoles([]));
    yield put(setMainTeamMembers([]));
    console.error("saga getMainTeamAction", error);
  } finally {
    yield put(setIsLoadingMainTeamInfos(false));
  }
}

type RemoveRoleFromTeamParams = ServiceVoidCallBackWithParams & {
  isRoleInTeamPage: boolean;
  isSubTeamPage: boolean;
};

function* removeRoleFromTeam(data: PayloadAction<RemoveRoleFromTeamParams>) {
  const {
    params,
    isRoleInTeamPage,
    isSubTeamPage,
    onSuccessCallback,
    onFailureCallback,
  } = data.payload;
  const [roleOid, teamOid] = params;
  try {
    yield call(() => RoleService.deleteRoleInTeamByOid(roleOid, teamOid));
    if (isRoleInTeamPage && !isSubTeamPage) {
      yield put(removeRoleByOid(roleOid));
    }
    onSuccessCallback();
  } catch (error) {
    onFailureCallback();
    console.error("Error while removing the role from the team", error);
  }
}

function* getSelfTeams(data: PayloadAction<ServiceListCallBack<TeamModel>>) {
  const { onSuccessCallback, onFailureCallback } = data.payload;
  try {
    const teams = yield call(() => TeamService.getSelfTeams());
    onSuccessCallback(teams);
  } catch (error) {
    onFailureCallback();
    console.error("error when geting the self teams list", error);
  }
}

function* getTeamsList() {
  try {
    const teamList: TeamModel[] = yield call(() => TeamService.getTeams());
    yield put(addTeams(teamList));
  } catch (error) {
    console.error("error when geting the teams list", error);
  }
}

function* addRoleToSubTeam(data: PayloadAction<ServiceVoidCallBackWithParams>) {
  try {
    yield call(() =>
      (TeamService as any).addRoleToTeam(...data.payload.params),
    );
    data.payload.onSuccessCallback();
  } catch (error) {
    data.payload.onFailureCallback();
    console.error("Error while adding role to subteam", error);
  }
}

const updateTeams = (teams, oid, attributeName, valueForUpdate) =>
  [...teams].map((t) => {
    if (t.subTeams && t.subTeams.length > 0) {
      const cloneSubTeams = [...t.subTeams].map((st) => {
        if (st.oid === oid && st[`${attributeName}`] !== valueForUpdate) {
          return { ...st, [attributeName]: valueForUpdate };
        }
        return st;
      });
      return { ...t, subTeams: cloneSubTeams };
    }
    return t;
  });

type UpdateTeamDisplayNameParams = {
  oid: string;
  displayName: string;
  callback: () => void;
};

function* updateTeamDisplayName(
  data: PayloadAction<UpdateTeamDisplayNameParams>,
) {
  const { oid, displayName, callback } = data.payload;
  try {
    yield call(() => TeamService.updateTeamDisplayName(oid, displayName));

    const teams = yield select((state) => state.userReducer.teams);
    const newTeams = updateTeams(teams, oid, "displayName", displayName);
    yield put(addTeams(newTeams));

    const teamInfo = yield select((state) => state.teamPageReducer.teamInfo);
    yield put(
      setTeamInfo({
        ...teamInfo,
        displayName: displayName,
      }),
    );
  } catch (error) {
    console.error("eError while updating team name", error);
  } finally {
    callback();
  }
}

type UpdateTeamDescriptionParams = {
  oid: string;
  description: string;
  callback: () => void;
};

function* updateTeamDescription(
  data: PayloadAction<UpdateTeamDescriptionParams>,
) {
  const { oid, description, callback } = data.payload;
  try {
    yield call(() => TeamService.updateTeamDescription(oid, description));

    const teams = yield select((state) => state.userReducer.teams);
    const newTeams = updateTeams(teams, oid, "description", description);
    yield put(addTeams(newTeams));

    const teamInfo = yield select((state) => state.teamPageReducer.teamInfo);
    yield put(
      setTeamInfo({
        ...teamInfo,
        description: description,
      }),
    );
  } catch (error) {
    console.error("eError while updating team description", error);
  } finally {
    callback();
  }
}

type AddUserToTeamParams = ServiceVoidCallBackWithParams & {
  searchedMembers?: UserModel[];
  addMembersTemporarily?: boolean;
};

function* addUserToTeam(data: PayloadAction<AddUserToTeamParams>) {
  try {
    yield call(() =>
      (TeamService as any).addUserToTeam(...data.payload.params),
    );
    data.payload.onSuccessCallback();
    if (data.payload.addMembersTemporarily) {
      yield put(addMembersTemporarily(data.payload.searchedMembers));
    }
  } catch (error) {
    data.payload.onFailureCallback();
    console.error("eError while adding user to subteam", error);
  }
}

type DeleteSubTeamParams = ServiceVoidCallBack & {
  teamOid: string;
  subTeamOid: string;
};

function* deleteSubTeam(data: PayloadAction<DeleteSubTeamParams>) {
  const { teamOid, subTeamOid, onSuccessCallback, onFailureCallback } =
    data.payload;
  try {
    yield call(() => TeamService.deleteSubTeam(subTeamOid));
    onSuccessCallback();
    yield put(removeSubTeam({ teamOid, subTeamOid }));
  } catch (error) {
    onFailureCallback();
    console.error("Error while deleting subteam from team", error);
  }
}

function* addApproverToTeam(
  data: PayloadAction<ServiceVoidCallBackWithParams>,
) {
  const { params, onSuccessCallback, onFailureCallback } = data.payload;
  try {
    yield call(() => (TeamService as any).addApproverToTeam(...params));
    onSuccessCallback();
  } catch (error) {
    onFailureCallback();
    console.error("eError while adding approver to team", error);
  }
}

type RemoveApproverFromTeamParams = ServiceVoidCallBack & {
  approverOid: string;
  teamOid: string;
};

function* removeApproverFromTeam(
  data: PayloadAction<RemoveApproverFromTeamParams>,
) {
  const { onSuccessCallback, onFailureCallback, approverOid, teamOid } =
    data.payload;
  try {
    yield call(() => TeamService.removeApproverFromTeam(teamOid, approverOid));
    onSuccessCallback();
    yield put(removeApproverByOid(approverOid));
  } catch (error) {
    onFailureCallback();
    console.error("eError while deleting approver in team", error);
  }
}

type GetUsersByTeamOidParams = { teamOid: string } & ServiceLoading;

function* getApproversByTeamOid(data: PayloadAction<GetUsersByTeamOidParams>) {
  const { teamOid, setIsLoading } = data.payload;
  setIsLoading(true);
  try {
    const approvers: UserModel[] = yield call(() =>
      TeamService.getApproversByTeamOid(teamOid),
    );
    yield put(setApprovers(approvers));
  } catch (error) {
    yield put(setApprovers([]));
    console.error("eError while getting approvers in a team", error);
  } finally {
    setIsLoading(false);
  }
}

function* getMembersByTeamOid(data: PayloadAction<GetUsersByTeamOidParams>) {
  const { teamOid, setIsLoading } = data.payload;
  setIsLoading(true);
  try {
    const members: UserModel[] = yield call(() =>
      TeamService.getMembersByOid(teamOid),
    );
    yield put(setMembers(members));
  } catch (error) {
    yield put(setMembers([]));
    console.error("eError while getting members in a team", error);
  } finally {
    setIsLoading(false);
  }
}

type GetRolesByTeamOidParams = {
  teamOid: string;
  isMainTeam: boolean;
} & ServiceLoading;

function* getRolesByTeamOid(data: PayloadAction<GetRolesByTeamOidParams>) {
  const { teamOid, isMainTeam, setIsLoading } = data.payload;
  setIsLoading(true);
  try {
    const roles: RoleModel[] = yield call(() =>
      RoleService.getByTeamOid(teamOid, isMainTeam),
    );
    yield put(setRoles(roles));
  } catch (error) {
    yield put(setRoles([]));
    console.error("eError while getting members in a team", error);
  } finally {
    setIsLoading(false);
  }
}

function* teamSaga() {
  yield takeLatest(getTeamInfosAction, getTeamInfos);
  yield takeLatest(getMainTeamInfosAction, getMainTeamInfos);
  yield takeEvery(createSubTeamAction, createSubTeam);
  yield takeEvery(getSelfTeamsAction, getSelfTeams);
  yield takeEvery(getTeamsListAction, getTeamsList);
  yield takeEvery(addRoleToSubTeamAction, addRoleToSubTeam);
  yield takeEvery(addUserToTeamAction, addUserToTeam);
  yield takeEvery(removeRoleFromTeamAction, removeRoleFromTeam);
  yield takeEvery(deleteSubTeamAction, deleteSubTeam);
  yield takeEvery(addApproverToTeamAction, addApproverToTeam);
  yield takeEvery(removeApproverFromTeamAction, removeApproverFromTeam);
  yield takeLatest(getApproversByTeamOidAction, getApproversByTeamOid);
  yield takeLatest(getMembersByTeamOidAction, getMembersByTeamOid);
  yield takeLatest(getRolesByTeamOidAction, getRolesByTeamOid);
  yield takeEvery(updateTeamDisplayNameAction, updateTeamDisplayName);
  yield takeEvery(updateTeamDescriptionAction, updateTeamDescription);
}

export default teamSaga;
