import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  setIsChangingInfo,
  setIsWrittingStatus,
  portfolioPageSlice,
} from "shared/store/slices/portfolioPage/portfolioPage.slice";

import ItemDetailsComponent from "shared/components/itemDetails/detailsItem.component";
import PortfolioInfosComponent from "../portfolioInfos/portfolioInfos.component";
import {
  getPortfolioInfosAction,
  removeApproverFromPortfolioAction,
} from "shared/store/sagas/portfolio.saga";
import { useAppDispatch, useAppSelector } from "shared/store";
import RolesOrgComponent from "views/roles/component/rolesOrg/rolesOrg.component";
import PermissionsPortfolioComponent from "views/roles/component/permissionsPortfolio/permissionsPortfolio.component";
import OrgApproversComponent from "views/users/components/orgApprovers/orgApprovers.component";
import MESSAGES from "shared/config/constants/message.config";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";

function PortfolioItemComponent() {
  const { isLoadingPage } = useAppSelector(
    (state) => state.portfolioPageReducer,
  );

  const portfolioPageReducer = useAppSelector(
    (state) => state.portfolioPageReducer,
  );

  const userOid = useAppSelector((state) => state.userReducer?.user?.oid);

  const dispatch = useAppDispatch();
  const { dispatchAlertSuccess } = useAlertCard();
  const { portfolioOid } = useParams();

  const [
    isLoadingDeleteRoleInPortfolioByOidList,
    setIsLoadingDeleteRoleInPortfolioByOidList,
  ] = useState<string[]>([]);

  const [
    isLoadingDeleteApproverInPortfolioByOidList,
    setIsLoadingDeleteApproverInPortfolioByOidList,
  ] = useState<string[]>([]);

  useEffect(() => {
    dispatch(setIsWrittingStatus(false));
    dispatch(setIsChangingInfo(false));
    dispatch(getPortfolioInfosAction({ portfolioOid, userOid } as any));
  }, [portfolioOid]);

  const onUpdatePortfolioInfo = (modeNavigation = false) => {};

  const confirmRemoveRole = (roleOid: string, roleDiplayName: string) => {
    setIsLoadingDeleteRoleInPortfolioByOidList((prevState) => [
      ...prevState,
      roleOid,
    ]);
  };

  const confirmRemoveApprover = (approverOid: string, approverName: string) => {
    setIsLoadingDeleteApproverInPortfolioByOidList((prevState) => [
      ...prevState,
      approverOid,
    ]);

    dispatch(
      removeApproverFromPortfolioAction({
        onSuccessCallback: () => {
          dispatchAlertSuccess(
            MESSAGES.DELETE_APPROVER_SUCCESS.format({
              approverName,
            }) as string,
          );
          setIsLoadingDeleteApproverInPortfolioByOidList((prevState) => [
            ...prevState.filter((e) => e !== approverOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingDeleteApproverInPortfolioByOidList((prevState) => [
            ...prevState.filter((e) => e !== approverOid),
          ]);
        },
        ...{ approverOid, portfolioOid },
      } as any),
    );
  };

  const tabsComponentTitle = ["Permissions", "Rôles", "Suppléants"];
  const tabsComponentContent = [
    <PermissionsPortfolioComponent key="permission" />,
    <RolesOrgComponent
      key="role"
      orgOid={portfolioOid}
      confirmRemoveRole={confirmRemoveRole}
      isLoadingDeleteRoleInOrgByOidList={
        isLoadingDeleteRoleInPortfolioByOidList
      }
      reducerState={portfolioPageReducer}
      isLoadingPage={isLoadingPage}
    />,
    <OrgApproversComponent
      key="portfolio-approvers"
      orgOid={portfolioOid}
      confirmRemoveApprover={confirmRemoveApprover}
      isLoadingDeleteApproverInOrgByOidList={
        isLoadingDeleteApproverInPortfolioByOidList
      }
      reducerState={portfolioPageReducer}
      isLoading={isLoadingPage}
    />,
  ];

  return (
    <ItemDetailsComponent
      tabsComponentTitle={tabsComponentTitle}
      tabsComponentContent={tabsComponentContent}
      infosStyle={{ height: "85px" }}
      slice={portfolioPageSlice as any}
    >
      <PortfolioInfosComponent />
    </ItemDetailsComponent>
  );
}

export default PortfolioItemComponent;
