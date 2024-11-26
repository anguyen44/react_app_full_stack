import CustomSearchComponent from "shared/components/customSearchComponent/customSearch.component";
import CustomTableComponent from "shared/components/customTable/customTable.component";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import useSearch from "shared/hooks/useSearch";
import TeamModel from "shared/model/team.model";
import { UserComponentProps } from "views/profil/userAutorizations.view";
import {
  InfoIconWrapper,
  InfoRightWrapper,
} from "../userRoles/userRoles.styled";
import { CustomFaQuestionCircle } from "icons";
import { memo } from "react";

interface UserTeamsComponentProps extends UserComponentProps {
  teams: TeamModel[];
}

function UserTeamsComponent({ teams, ...props }: UserTeamsComponentProps) {
  const { searchedElements, searchKeyWord, onChangeSearchBox, resetPage } =
    useSearch(teams);

  const columns: Column[] = [];
  columns.push({ name: "Nom", field: "displayName", width: "40%" });
  columns.push({
    name: "Description",
    field: "description",
    showTextEllipsis: true,
    width: "50%",
  });
  columns.push({ name: "Statut", field: "isActive", width: "10%" });
  return (
    <>
      <CustomSearchComponent
        {...{ searchKeyWord, onChangeSearchBox }}
        isLoading={props.isLoading}
        additionalComponent={
          <InfoRightWrapper>
            <InfoIconWrapper>
              <CustomFaQuestionCircle
                title={
                  "Les équipes affichées correspondent à celles dont vous êtes gestionnaire ou suppléant."
                }
                minwidth={"250px"}
              />
            </InfoIconWrapper>
          </InfoRightWrapper>
        }
      />
      <CustomTableComponent
        data={searchedElements}
        columns={columns}
        customNoContentTableName={"Aucune équipe présente"}
        resetPage={resetPage}
        tablePreferences={TablePreferencesEnum.ALL_TEAMS}
        {...props}
      />
    </>
  );
}

export default memo(UserTeamsComponent);
