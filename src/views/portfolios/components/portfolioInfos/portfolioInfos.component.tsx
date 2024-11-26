import ItemInfosComponent from "shared/components/itemDetails/itemInfos/ItemInfos.component";
import { portfolioPageSlice } from "shared/store/slices/portfolioPage/portfolioPage.slice";
import { useAppSelector } from "shared/store";
import { PortfolioTeamLogo } from "./portfolioInfos.styled";

function PortfolioInfosComponent() {
  const portfolioPageReducer = useAppSelector(
    (state) => state.portfolioPageReducer,
  );

  const icon = <PortfolioTeamLogo />;

  return (
    <ItemInfosComponent
      item={portfolioPageReducer.portfolioInfos}
      reducerState={portfolioPageReducer}
      slice={portfolioPageSlice as any}
      icon={icon}
      hideCreatedDate
      showName
      disableEditName
      disableEditDescription
    />
  );
}

export default PortfolioInfosComponent;
