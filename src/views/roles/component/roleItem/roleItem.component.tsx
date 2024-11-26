import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingWithDivComponent } from "shared/components/loading/Loading.component";
import { BlueSectionTitle } from "shared/components/text/text.component";
import MESSAGES from "shared/config/constants/message.config";
import { deletePermissionInRoleByOidAction } from "shared/store/sagas/permission.saga";
import {
  getRoleByOidAction,
  updateRoleDescriptionAction,
  updateRoleDisplayNameAction,
} from "shared/store/sagas/role.saga";

import PermissionsListComponent from "../permissionsList/PermissionsList.component";
import RoleInfosComponent from "../roleInfos/RoleInfos.component";
import RoleOperationComponent from "../roleOperation/RolesOperation.component";
import { RoleInfoWrapper, WrapperRoleItem } from "./roleItem.styled";
import PlusIconWrapper from "shared/components/PlusIconWrapper/PlusIconWrapper";
import { CustomFaCirclePlus } from "icons";
import { useAppDispatch, useAppSelector } from "shared/store";
import { PERMISSIONS_ROLE_PATH } from "shared/config/constants/path.config";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";

const RoleItemComponent = () => {
  const { roleOid } = useParams();
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(
    (state) => state.rolePageReducer.isFetching,
  );
  const permissions = useAppSelector(
    (state) => state.rolePageReducer.permissions,
  );

  const baseInfo = useAppSelector((state) => state.rolePageReducer.baseInfo);

  const navigate = useNavigate();

  const { dispatchAlertSuccess, dispatchAlertError } = useAlertCard();

  const { dispatchImpossibleCaseValidationAlertDialog } = useAlertDialog();

  const [
    isLoadingDeletePermissionInRoleByOidList,
    setIsLoadingDeletePermissionInRoleByOidList,
  ] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getRoleByOidAction({ roleOid, checkCaseValidation: true }));
  }, [roleOid]);

  const confirmRemovePermission = (permissionOid, permissionName) => {
    setIsLoadingDeletePermissionInRoleByOidList((prevState) => [
      ...prevState,
      permissionOid,
    ]);

    dispatch(
      deletePermissionInRoleByOidAction({
        params: [permissionOid, roleOid],
        onSuccessCallback: () => {
          dispatchAlertSuccess(
            MESSAGES.DELETE_PERMISSION_SUCCESS_NEED_VALIDATION.format({
              permissionName,
            }),
          );
          setIsLoadingDeletePermissionInRoleByOidList((prevState) => [
            ...prevState.filter((e) => e !== permissionOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingDeletePermissionInRoleByOidList((prevState) => [
            ...prevState.filter((e) => e !== permissionOid),
          ]);
        },
        permissionOid: permissionOid,
      }),
    );
  };

  const navigatePermissionsCreation = () =>
    navigate(PERMISSIONS_ROLE_PATH(roleOid));

  const handlePermissionCreation = () => {
    if (
      !baseInfo ||
      !baseInfo.portfolio ||
      baseInfo.portfolio.isCaseValidationImpossible
    ) {
      dispatchImpossibleCaseValidationAlertDialog({
        handleAction: navigatePermissionsCreation,
        isPortfolio: true,
      });
    } else {
      navigatePermissionsCreation();
    }
  };

  const onUpdateDisplayName = (displayName, callback) => {
    if (displayName === "") {
      dispatchAlertError(MESSAGES.DISPLAY_NAME_NOT_ALLOW_NULL);
      callback();
    } else {
      dispatch(
        updateRoleDisplayNameAction({
          ...{ displayName, callback },
          oid: roleOid,
        }),
      );
    }
  };

  const onUpdateDescription = (description, callback) => {
    dispatch(
      updateRoleDescriptionAction({
        ...{ description, callback },
        oid: roleOid,
      }),
    );
  };

  return (
    <>
      <Container>
        <WrapperRoleItem>
          {!isFetching ? (
            <>
              <RoleInfoWrapper>
                <RoleInfosComponent
                  {...{ onUpdateDisplayName, onUpdateDescription }}
                />
              </RoleInfoWrapper>
              <div className="operationsSectionWrapper">
                <RoleOperationComponent />
              </div>
              <div>
                <PlusIconWrapper>
                  <CustomFaCirclePlus
                    data-testid="navigate-permissionCreation"
                    onClick={handlePermissionCreation}
                  />
                </PlusIconWrapper>
                <BlueSectionTitle>Permissions</BlueSectionTitle>
                <PermissionsListComponent
                  {...{
                    permissions,
                    isLoadingDeletePermissionByOidList:
                      isLoadingDeletePermissionInRoleByOidList,
                    confirmRemovePermission,
                    isTeamCaseValidationImpossible:
                      baseInfo?.isTeamCaseValidationImpossible,
                  }}
                />
              </div>
            </>
          ) : (
            <LoadingWithDivComponent />
          )}
        </WrapperRoleItem>
      </Container>
    </>
  );
};

export default RoleItemComponent;
