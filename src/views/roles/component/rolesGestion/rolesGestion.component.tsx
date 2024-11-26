import { FaTrash } from "icons";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingComponent from "shared/components/loading/Loading.component";
import MESSAGES from "shared/config/constants/message.config";
import { ROLES_PATH } from "shared/config/constants/path.config";
import { useModal } from "shared/hooks/useModal";
import { getAllRolesManagementAction } from "shared/store/sagas/role.saga";
import { removeRoleFromTeamAction } from "shared/store/sagas/team.saga";
import { triggerAlertDialog } from "shared/store/slices/globalUi/globalUi.slice";
import TeamPermission from "views/teams/components/teamPermissions/teamPermissions.component";

import {
  ActionButtonsWrapper,
  RoleDeleteIconWrapper,
  RoleEditIcon,
  RoleEditIconWrapper,
} from "../rolesTable/rolesTable.styled";
import { useAppDispatch } from "shared/store";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import useServiceList from "shared/hooks/useServiceList";
import TabsComponent from "shared/components/tabs/Tabs.component";
import {
  PORTFOLIO_ASSOCIATED,
  TEAM_ASSOCIATED,
} from "shared/config/constants/properties.config";
import TeamRoleTable from "../teamRoleTable/teamRoleTable.component";
import { Wrap } from "../teamRoleTable/teamRoleTable.styled";

const RolesGestion = () => {
  const {
    elements: roles,
    setElements: setRoles,
    isLoading,
  } = useServiceList(getAllRolesManagementAction, (role) => role);

  const dispatch = useAppDispatch();

  const { showModal, onCloseModal, onOpenRoleModal, roleOid } = useModal();

  const { dispatchAlertSuccess } = useAlertCard();

  const deleteIconRef = useRef({});
  const editIconRef = useRef({});

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [
    isLoadingDeleteRoleInTeamByOidList,
    setIsLoadingDeleteRoleInTeamByOidList,
  ] = useState<string[]>([]);

  const rolesForTeams = roles.filter(
    (role) => role.teamRoleAssociate === TEAM_ASSOCIATED,
  );

  const rolesForPortfolios = roles.filter(
    (role) => role.teamRoleAssociate === PORTFOLIO_ASSOCIATED,
  );

  const onClickEditRoleButton = (oidRole: string, roleDiplayName: string) => {
    navigate(`${ROLES_PATH}/${oidRole}`, {
      state: { previousUrl: pathname, roleDiplayName: roleDiplayName },
    });
  };

  type RemoveRoleParams = {
    roleOid: string;
    roleDiplayName: string;
    teamOid: string;
  };

  const removeRole = ({
    roleOid,
    roleDiplayName,
    teamOid,
  }: RemoveRoleParams) => {
    setIsLoadingDeleteRoleInTeamByOidList((prevState) => [
      ...prevState,
      roleOid + teamOid,
    ]);
    dispatch(
      removeRoleFromTeamAction({
        params: [roleOid, teamOid],
        onSuccessCallback: () => {
          dispatchAlertSuccess(
            MESSAGES.DELETE_ROLE_SUCCESS.format({
              roleDiplayName,
            }) as string,
          );
          const rolesEdit = [
            ...roles.filter(
              (role) => role.oid != roleOid || role.teamOid != teamOid,
            ),
          ];
          setRoles(rolesEdit);
          setIsLoadingDeleteRoleInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== roleOid + teamOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingDeleteRoleInTeamByOidList((prevState) => [
            ...prevState.filter((e) => e !== roleOid + teamOid),
          ]);
        },
        isRoleInTeamPage: false,
        isSubTeamPage: false,
      }),
    );
  };

  const handleDeleteRole = ({ ...params }: RemoveRoleParams) => {
    return dispatch(
      triggerAlertDialog({
        title: "Confirmez-vous la suppression du rôle ?",
        description: (
          <>
            Si vous confirmez, le rôle sera définitivement supprimé. <br />
            Êtes-vous sûr de vouloir supprimer ?
          </>
        ),
        titleButtonAction: "Confirmer",
        handleAction: removeRole,
        dataActions: params,
      }),
    );
  };

  const getRoleAction = (
    roleOid: string,
    roleDiplayName: string,
    roleName: string,
    teamOid: string,
  ) => {
    return (
      <ActionButtonsWrapper>
        <>
          {isLoadingDeleteRoleInTeamByOidList.includes(roleOid + teamOid) ? (
            <LoadingComponent size={10} />
          ) : (
            <>
              {teamOid && (
                <>
                  <RoleEditIconWrapper
                    ref={(el) => {
                      if (el) {
                        editIconRef.current[roleName] = el;
                      }
                    }}
                    onClick={(e) => {
                      onClickEditRoleButton(roleOid, roleDiplayName);
                      e.stopPropagation();
                    }}
                    aria-label="iconEditButton"
                  >
                    <RoleEditIcon />
                  </RoleEditIconWrapper>

                  <RoleDeleteIconWrapper
                    ref={(el) => {
                      if (el) {
                        deleteIconRef.current[roleName] = el;
                      }
                    }}
                    onClick={(e) => {
                      handleDeleteRole({ roleOid, roleDiplayName, teamOid });
                      e.stopPropagation();
                    }}
                  >
                    <FaTrash
                      data-testid={`deleteRoleBtn-${roleOid}`}
                      className="deleteIcon"
                    />
                  </RoleDeleteIconWrapper>
                </>
              )}
            </>
          )}
        </>
      </ActionButtonsWrapper>
    );
  };

  return (
    <>
      <TeamPermission {...{ showModal, onCloseModal, roleOid }} />
      <Wrap>
        <TabsComponent
          title={["Rôles dans mes équipes", "Rôles sur mes ressources"]}
          content={[
            <TeamRoleTable
              roles={rolesForTeams}
              haveActions={true}
              isLoading={isLoading}
              getRoleAction={getRoleAction}
              onOpenRoleModal={onOpenRoleModal}
              title="Gestion des rôles liés à mes équipes"
            />,
            <TeamRoleTable
              roles={rolesForPortfolios}
              haveActions={false}
              isLoading={isLoading}
              getRoleAction={getRoleAction}
              onOpenRoleModal={onOpenRoleModal}
              title="Gestion des rôles liés à mes ressources"
            />,
          ]}
        />
      </Wrap>
    </>
  );
};

export default RolesGestion;
