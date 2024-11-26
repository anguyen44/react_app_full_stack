import CustomSearchComponent from "shared/components/customSearchComponent/customSearch.component";
import CustomTableComponent from "shared/components/customTable/customTable.component";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import useSearch from "shared/hooks/useSearch";
import PortfolioModel from "shared/model/portfolio.model";
import { UserComponentProps } from "views/profil/userAutorizations.view";
import {
  InfoIconWrapper,
  InfoRightWrapper,
} from "../userRoles/userRoles.styled";
import { CustomFaQuestionCircle } from "icons";
import { memo } from "react";

interface UserPortfoliosComponentProps extends UserComponentProps {
  portfolios: PortfolioModel[];
}

function UserPortfoliosComponent({
  portfolios,
  ...props
}: UserPortfoliosComponentProps) {
  const { searchedElements, searchKeyWord, onChangeSearchBox, resetPage } =
    useSearch(portfolios, true);

  const customDisplayName = (row: PortfolioModel) => {
    return `${row.displayName} (${row.name})`;
  };

  const columns: Column[] = [];
  columns.push({
    name: "Nom",
    field: "displayName",
    customField: customDisplayName,
    width: "90%",
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
                  "Les ressources affichées correspondent à celles dont vous êtes propriétaire ou suppléant."
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
        customNoContentTableName={"Aucune ressource présente"}
        resetPage={resetPage}
        tablePreferences={TablePreferencesEnum.ALL_PORTFOLIOS}
        {...props}
      />
    </>
  );
}

export default memo(UserPortfoliosComponent);
