import { useEffect, useMemo, useRef, useState } from "react";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import { useAppSelector } from "shared/store";
import { writableItemPermission } from "shared/store/selectors/writableItem/writableTeamPermission.selector";
import { CustomFaCirclePlus } from "icons";
import PermissionsListComponent from "../permissionsList/PermissionsList.component";
import { sortItemsByName } from "shared/utils/sort.utils";
import MESSAGES from "shared/config/constants/message.config";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import CustomSearchComponent from "shared/components/customSearchComponent/customSearch.component";

function PermissionsPortfolioComponent() {
  const portfolioReducer = useAppSelector(
    (state) => state.portfolioPageReducer,
  );

  const { readOnly, isLoadingPage } = useAppSelector(
    (state) => state.teamPageReducer,
  );
  const writingModeEnable = !readOnly && !isLoadingPage;

  const deleteIconRef = useRef({});

  const { dispatchAlertInfo } = useAlertCard();

  const [
    isLoadingDeletePermissionByOidList,
    setIsLoadingDeletePermissionByOidList,
  ] = useState([]);

  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [resetPage, setResetPage] = useState<Number>(null);

  useEffect(() => {
    if (!writingModeEnable) {
      deleteIconRef.current = {};
    }
  }, [writingModeEnable]);

  useEffect(() => {
    setResetPage(new Number(0));
  }, [portfolioReducer.portfolioInfos?.oid]);

  const onChangeSearchBox = (e) => {
    setResetPage(new Number(0));
    const searchingText = e.target.value ? e.target.value : "";
    setSearchKeyWord(searchingText);
  };

  const customedPermissionsList = useMemo(() => {
    let permissions =
      portfolioReducer.permissions?.filter((permission) =>
        permission.name.toLowerCase().includes(searchKeyWord.toLowerCase()),
      ) ?? [];
    return sortItemsByName(permissions);
  }, [portfolioReducer.permissions, searchKeyWord]);

  const handleAddPermissionsClick = () => {
    dispatchAlertInfo(MESSAGES.UNAVAILABLE_FUNCTIONALITY);
  };

  const confirmRemovePermission = (
    permissionOid: string,
    permissionName: string,
  ) => {
    setIsLoadingDeletePermissionByOidList((prevState) => [
      ...prevState,
      permissionOid,
    ]);
  };

  return (
    <>
      <CustomSearchComponent
        {...{ searchKeyWord, onChangeSearchBox }}
        additionalComponent={
          <>
            {writingModeEnable && (
              <PlusIconWrapper>
                <CustomFaCirclePlus
                  data-testid="open-modal"
                  onClick={handleAddPermissionsClick}
                />
              </PlusIconWrapper>
            )}
          </>
        }
        isLoading={portfolioReducer.isLoadingPage}
      />
      <PermissionsListComponent
        permissions={customedPermissionsList}
        isLoadingDeletePermissionByOidList={isLoadingDeletePermissionByOidList}
        confirmRemovePermission={confirmRemovePermission}
        isLoading={portfolioReducer.isLoadingPage}
        disableActions={!writingModeEnable}
        wrapperStyle={{ padding: 0 }}
        isLightMode={true}
        resetPage={resetPage}
      />
    </>
  );
}

export default PermissionsPortfolioComponent;
