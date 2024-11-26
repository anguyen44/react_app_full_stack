import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Slice,
} from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import {
  OrgPageReducers,
  OrgPageState,
} from "shared/store/slices/common/orgPageReducers";
import {
  PortfolioPageReducer,
  portfolioPageSlice,
} from "shared/store/slices/portfolioPage/portfolioPage.slice";
import {
  teamPageSlice,
  TeamPageReducer,
} from "shared/store/slices/teamPage/teamPage.slice";
import { addApproverToTeamAction } from "shared/store/sagas/team.saga";
import { addApproverToPortfolioAction } from "shared/store/sagas/portfolio.saga";

interface UseApproversContextProps<S extends OrgPageState> {
  reducerState: S;
}

const useApproversContext = <S extends OrgPageState>({
  reducerState,
}: UseApproversContextProps<S>) => {
  const { pathname } = useLocation();
  const isPortfolioPage = pathname.includes("portfolios");
  const displayName = isPortfolioPage
    ? (reducerState as unknown as PortfolioPageReducer).portfolioInfos
        ?.displayName
    : (reducerState as unknown as TeamPageReducer).teamInfo?.displayName;

  const orgSlice: Slice<OrgPageReducers> = (
    isPortfolioPage ? portfolioPageSlice : teamPageSlice
  ) as any;
  const addApproverToOrgAction: ActionCreatorWithPayload<ServiceVoidCallBackWithParams> =
    isPortfolioPage ? addApproverToPortfolioAction : addApproverToTeamAction;

  return { isPortfolioPage, displayName, orgSlice, addApproverToOrgAction };
};

export default useApproversContext;
