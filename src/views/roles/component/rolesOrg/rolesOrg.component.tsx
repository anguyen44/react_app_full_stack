import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSearchComponent from "shared/components/customSearchComponent/customSearch.component";
import { ROLES_PATH } from "shared/config/constants/path.config";
import { useModal } from "shared/hooks/useModal";
import useSearch from "shared/hooks/useSearch";
import { OrgPageState } from "shared/store/slices/common/orgPageReducers";
import RolesTable from "views/roles/component/rolesTable/rolesTable.component";
import RoleCreationComponent from "views/teams/components/roleCreation/RoleCreation.component";
import RoleSearchModal from "views/teams/components/rolesSearchModal/RolesSearchModal.component";
import TeamPermission from "views/teams/components/teamPermissions/teamPermissions.component";

export interface RolesOrgComponentProps<T extends OrgPageState> {
  orgOid: string;
  confirmRemoveRole: (roleOid: string, roleDiplayName: string) => void;
  isLoadingDeleteRoleInOrgByOidList: string[];
  reducerState: T;
  isLoadingPage?: boolean;
}

function RolesOrgComponent<T extends OrgPageState>({
  orgOid,
  confirmRemoveRole,
  isLoadingDeleteRoleInOrgByOidList,
  reducerState,
  isLoadingPage,
}: RolesOrgComponentProps<T>) {
  const { readOnly, isCaseValidationImpossible } = reducerState;
  const writingModeEnable = !readOnly && !isLoadingPage;

  const { searchedElements, searchKeyWord, onChangeSearchBox, resetPage } =
    useSearch(reducerState.roles);

  const { showModal, onCloseModal, onOpenRoleModal, roleOid } = useModal();

  const deleteIconRef = useRef({});
  const editIconRef = useRef({});

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isPortfolioPage = pathname.includes("portfolios");
  const isSubTeamPage = pathname.includes("sub_teams");

  useEffect(() => {
    if (!writingModeEnable) {
      deleteIconRef.current = {};
      editIconRef.current = {};
    }
  }, [writingModeEnable]);

  const onClickEditRoleButton = (oidRole, roleDiplayName) => {
    navigate(`${ROLES_PATH}/${oidRole}`, {
      state: { previousUrl: pathname, roleDiplayName: roleDiplayName },
    });
  };

  return (
    <>
      <TeamPermission {...{ showModal, onCloseModal, roleOid }} />

      <CustomSearchComponent
        {...{ searchKeyWord, onChangeSearchBox }}
        additionalComponent={
          <>
            {writingModeEnable && (
              <>
                {isSubTeamPage ? (
                  <RoleSearchModal teamOid={orgOid} />
                ) : (
                  <RoleCreationComponent isPortfolioPage={isPortfolioPage} />
                )}
              </>
            )}
          </>
        }
        isLoading={isLoadingPage}
      />

      <RolesTable
        {...{
          roles: searchedElements,
          editIconRef,
          deleteIconRef,
          writingModeEnable,
          confirmRemoveRole,
          onClickEditRoleButton,
          onOpenRoleModal,
          orgOid,
          isLoadingDeleteRoleInOrgByOidList,
          reducerState,
          isPortfolioPage,
          resetPage,
          isLoadingPage,
          isSubTeamPage,
          isCaseValidationImpossible,
        }}
      />
    </>
  );
}

export default RolesOrgComponent;
