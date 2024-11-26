import { AdminBadgeIcon, LamdaUserBadgeIcon, IconWrapper } from "./styled";
import { SUPER_MANAGER_AUTHENTIFICATION } from "shared/config/constants/iodc.config";
import { updateModeSuperManagerEnable } from "shared/store/slices/user/user.slice";
import TokenService from "shared/services/token/token.service";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "shared/store";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import MESSAGES from "shared/config/constants/message.config";

interface AdminBadgeAuthentificationProps {
  modeSuperManagerEnable: boolean;
}

const AdminBadgeAuthentification = ({
  modeSuperManagerEnable,
}: AdminBadgeAuthentificationProps) => {
  const dispatch = useAppDispatch();

  const { dispatchAlertInfo } = useAlertCard();

  const { isLoadingCasesNumber } = useAppSelector(
    (state) => state.dashboardPageReducer,
  );

  const { isSuperManager } = useAppSelector((state) => state.userReducer);

  const {
    isLoadingCasesOpenToValidate,
    isLoadingCasesOpenCurrent,
    isLoadingClosedValidationCases,
    isLoadingClosedTreatedCases,
  } = useAppSelector((state) => state.casesGestionPageReducer);

  const canNotSwitchMode = [
    isLoadingCasesNumber,
    isLoadingCasesOpenToValidate,
    isLoadingCasesOpenCurrent,
    isLoadingClosedValidationCases,
    isLoadingClosedTreatedCases,
  ].some(Boolean);

  const verifyInProgressTask = (isModeSuperManagerEnabled) => {
    if (canNotSwitchMode) {
      dispatchAlertInfo(MESSAGES.IN_PROGRESS, 2000);
    } else {
      dispatch(updateModeSuperManagerEnable(isModeSuperManagerEnabled));
    }
  };

  const authentificateSuperMananger = () => {
    const token = TokenService.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded && decoded?.["acr"] === "loa-5") {
        verifyInProgressTask(true);
      } else {
        window.location.replace(SUPER_MANAGER_AUTHENTIFICATION);
      }
    } else {
      window.location.replace(SUPER_MANAGER_AUTHENTIFICATION);
    }
  };

  const handleDisabledAdminMode = () => {
    verifyInProgressTask(false);
  };

  return (
    <>
      {isSuperManager && (
        <IconWrapper>
          {modeSuperManagerEnable ? (
            <AdminBadgeIcon
              onClick={handleDisabledAdminMode}
              title={"Activer le mode normal"}
              minwidth={"150px"}
            />
          ) : (
            <LamdaUserBadgeIcon
              onClick={authentificateSuperMananger}
              title={"Activer le mode super-gestionnaire"}
              minwidth={"150px"}
            />
          )}
        </IconWrapper>
      )}
    </>
  );
};

export default AdminBadgeAuthentification;
