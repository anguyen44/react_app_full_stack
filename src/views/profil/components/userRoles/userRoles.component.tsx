import { Fragment, memo, useEffect, useState } from "react";
import CustomTableComponent from "shared/components/customTable/customTable.component";
import { CustomArrowIcon } from "shared/components/sub-layout/teams/teamItem/teamItem.styled";
import RoleWithTeamModel from "shared/model/roleWithTeam.model";
import { UserComponentProps } from "views/profil/userAutorizations.view";
import {
  InfoIconWrapper,
  InfoRightWrapper,
  PermissionsCheckBoxWrapper,
  RotateIconPermissionsWrapper,
} from "./userRoles.styled";
import { Checkbox, Collapse, FormControlLabel } from "@mui/material";
import PermissionSimpleTableComponent from "views/roles/component/permissionSimpleTable/permissionSimpleTable.component";
import useSearch from "shared/hooks/useSearch";
import CustomSearchComponent from "shared/components/customSearchComponent/customSearch.component";
import { CustomFaQuestionCircle } from "icons";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";

interface UserRolesComponentProps extends UserComponentProps {
  roles: RoleWithTeamModel[];
}

function UserRolesComponent({ roles, ...props }: UserRolesComponentProps) {
  const { searchedElements, searchKeyWord, onChangeSearchBox, resetPage } =
    useSearch(roles);

  const [isAllChecked, setIsAllChecked] = useState(false);

  const [isCheckedByRoleOids, setIsCheckedByRoleOids] = useState<string[]>([]);

  useEffect(() => {
    setIsCheckedByRoleOids([]);
    setIsAllChecked(false);
  }, [searchedElements]);

  const onClickPermissionsIcon = (row: RoleWithTeamModel) => {
    if (isCheckedByRoleOids.includes(row.oid)) {
      setIsCheckedByRoleOids((prevState) => [
        ...prevState.filter((e) => e !== row.oid),
      ]);
      setIsAllChecked(false);
    } else {
      setIsCheckedByRoleOids((prevState) => {
        const checkedRoles = [...prevState, row.oid];
        setIsAllChecked(checkedRoles.length == roles.length);
        return checkedRoles;
      });
    }
  };

  const customPermissionsIcon = (row: RoleWithTeamModel) => {
    const isChecked = isCheckedByRoleOids.includes(row.oid);
    return (
      <>
        <RotateIconPermissionsWrapper>
          <CustomArrowIcon
            data-testid="permissions-collapse-icon"
            onClick={() => onClickPermissionsIcon(row)}
            $checked={isChecked}
            title={`${isChecked ? "Masquer" : "Afficher"} les permissions associées au rôle ${row.displayName}`}
            minwidth={"200px"}
            delay={{ show: 1000, hide: 0 }}
          />
        </RotateIconPermissionsWrapper>
      </>
    );
  };

  const customPermissionsPanel = (row: RoleWithTeamModel) => {
    return (
      <Collapse
        in={isCheckedByRoleOids.includes(row.oid)}
        style={{ display: "block" }}
        unmountOnExit
      >
        <PermissionSimpleTableComponent
          permissions={row.permissions}
          headerColor={props.headerBackgroundColor}
          hideHeader={!row.permissions || row.permissions.length == 0}
          customNoContentTableName={"Aucune permission associée au rôle"}
        />
      </Collapse>
    );
  };

  const customFieldTeam = (row: RoleWithTeamModel) => {
    return row.team?.displayName;
  };

  const customFieldSubTeam = (row: RoleWithTeamModel) => {
    const parentKey = `subTeams_${row.oid}`;
    return (
      <Fragment key={parentKey}>
        {row.team && row.team.subTeams
          ? row.team.subTeams.map((subTeam) => (
              <div key={`${parentKey}_${subTeam.oid}`}>
                {subTeam.displayName}
              </div>
            ))
          : ""}
      </Fragment>
    );
  };

  const customFieldPortfolio = (row: RoleWithTeamModel) => {
    return row.portfolio?.displayName;
  };

  const handleCheckAll = () => {
    if (isAllChecked) {
      setIsCheckedByRoleOids([]);
    } else {
      setIsCheckedByRoleOids(roles.map((role) => role.oid));
    }
    setIsAllChecked(!isAllChecked);
  };

  const columns: Column[] = [];
  columns.push({
    name: "",
    field: "permissions",
    customField: customPermissionsIcon,
    width: "25px",
  });
  columns.push({
    name: "Nom",
    field: "displayName",
  });
  columns.push({
    name: "Description",
    field: "description",
    width: "25%",
    showTextEllipsis: true,
  });
  columns.push({ name: "Equipe", field: "team", customField: customFieldTeam });
  columns.push({
    name: "Sous-équipes",
    field: "subTeams",
    customField: customFieldSubTeam,
  });
  columns.push({
    name: "Ressource",
    field: "portfolio",
    customField: customFieldPortfolio,
  });
  columns.push({ name: "Statut", field: "isActive" });
  return (
    <>
      <CustomSearchComponent
        {...{ searchKeyWord, onChangeSearchBox }}
        additionalComponent={
          <InfoRightWrapper>
            <PermissionsCheckBoxWrapper>
              <FormControlLabel
                label={"Afficher toutes les permissions"}
                control={
                  <Checkbox
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                    disabled={props.isLoading}
                  />
                }
              />
            </PermissionsCheckBoxWrapper>
            <InfoIconWrapper>
              <CustomFaQuestionCircle
                title={
                  "Les rôles affichés correspondent à ceux dont vous êtes bénéficiaire (associés aux sous-équipes auxquelles vous appartenez)."
                }
                minwidth={"250px"}
              />
            </InfoIconWrapper>
          </InfoRightWrapper>
        }
        isLoading={props.isLoading}
      />
      <CustomTableComponent
        data={searchedElements}
        columns={columns}
        customNoContentTableName={"Aucun rôle présent"}
        additionalComponent={customPermissionsPanel}
        tablePreferences={TablePreferencesEnum.ALL_ROLES}
        resetPage={resetPage}
        {...props}
      />
    </>
  );
}

export default memo(UserRolesComponent);
