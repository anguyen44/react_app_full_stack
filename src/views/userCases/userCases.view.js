import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "shared/components/customAlert/customAlert.component";
import Layout from "shared/components/layout/layout.component";
import TabsComponent from "shared/components/tabs/Tabs.component";
import MESSAGES from "shared/config/constants/message.config";
import { CasesTableHeaderPreferencesEnum } from "shared/enumeration/tablePreferences.enum";
import { useSnackbar } from "shared/hooks/useSnackbar";
import {
  getClosedTreatedCasesAction,
  getClosedValidationCasesAction,
  getSelfCasesOpenCurrentAction,
  getSelfCasesOpenToValidateAction,
  proccessCaseAction,
} from "shared/store/sagas/cases.saga";
import {
  initDataStatesFirstAccess,
  resetCasesState,
  selectCasesOpenCurrentSortedByTimeStamp,
  selectCasesOpenToValidateSortedByTimeStamp,
  selectClosedTreatedCasesSortedByTimeStamp,
  selectClosedValidationCasesSortedByTimeStamp,
  setUserInfos,
  setUserReadingMode,
} from "shared/store/slices/casesGestionPage/casesGestionPage.slice";
import ShowUserInfos from "views/users/components/showUserInfos";

import { Wrap } from "./userCases.view.styled";
import UserCasesByType from "./userCasesTable/userCasesToByType";

function UserCasesView(props) {
  const dispatch = useDispatch();
  const { isActive, message, alertType, openSnackBar, closeSnackBar } =
    useSnackbar();

  const {
    userInfos,
    userReadingMode,
    isLoadingCasesOpenToValidate,
    isLoadingCasesOpenCurrent,
    isLoadingClosedValidationCases,
    isLoadingClosedTreatedCases,
  } = useSelector((state) => state.casesGestionPageReducer);

  const asSuperManager = useSelector(
    (state) => state.userReducer.modeSuperManagerEnable,
  );

  const casesOpenToValidate = useSelector((state) =>
    selectCasesOpenToValidateSortedByTimeStamp(state),
  );
  const casesOpenCurrent = useSelector((state) =>
    selectCasesOpenCurrentSortedByTimeStamp(state),
  );

  const closedValidationCases = useSelector((state) =>
    selectClosedValidationCasesSortedByTimeStamp(state),
  );
  const closedTreatedCases = useSelector((state) =>
    selectClosedTreatedCasesSortedByTimeStamp(state),
  );

  const [isLoadingProccessCaseList, setIsLoadingProccessCaseList] = useState(
    [],
  );

  const resetUserReadingMode = () => {
    dispatch(setUserReadingMode(false));
    dispatch(setUserInfos(null));
  };

  useEffect(() => {
    dispatch(initDataStatesFirstAccess());
    return () => {
      dispatch(resetCasesState());
      resetUserReadingMode();
    };
  }, [asSuperManager]);

  const processCase = (caseOid, isApproved) => {
    setIsLoadingProccessCaseList((prevState) => [...prevState, caseOid]);
    dispatch(
      proccessCaseAction({
        params: [caseOid, isApproved, asSuperManager],
        onSuccessCallback: () => {
          if (isApproved) {
            openSnackBar(MESSAGES.PROCESS_CASE_APPROVAL_SUCCESS, "success");
          } else {
            openSnackBar(MESSAGES.PROCESS_CASE_REFUSE_SUCCESS, "info");
          }
          setIsLoadingProccessCaseList((prevState) => [
            ...prevState.filter((e) => e !== caseOid),
          ]);
        },
        onFailureCallback: () => {
          setIsLoadingProccessCaseList((prevState) => [
            ...prevState.filter((e) => e !== caseOid),
          ]);
        },
        caseOid: caseOid,
      }),
    );
  };

  const casesToValidateColor = "#41A57D";
  const casesMadeByUserColor = "#047edf";

  const closedCasesToValidateColor = "#41A57D";
  const closedCasesMadeByUserColor = "#047edf";

  const handleFetchCasesToValidate = () =>
    dispatch(getSelfCasesOpenToValidateAction({ asSuperManager }));
  const handleFetchCasesMadeByUser = () =>
    dispatch(getSelfCasesOpenCurrentAction({ asSuperManager }));
  const handleFetchClosedValidationCases = () =>
    dispatch(getClosedValidationCasesAction({ asSuperManager }));
  const handleFetchClosedTreatedCases = () =>
    dispatch(getClosedTreatedCasesAction({ asSuperManager }));

  return (
    <>
      <CustomAlert
        {...{
          open: isActive,
          handleCloseAlert: closeSnackBar,
          alertMessage: message,
          type: alertType,
        }}
      />
      <Layout history={props.history}>
        <Container>
          <Wrap>
            {!userReadingMode ? (
              <>
                <TabsComponent
                  title={[
                    "Demandes à valider",
                    "Mes demandes en cours",
                    `Historique ${asSuperManager ? "des" : "de mes"} validations`,
                    "Historique de mes demandes",
                  ]}
                  indexOfLastTitleOnLeftSide={2}
                  content={[
                    <UserCasesByType
                      key="1"
                      isLoading={isLoadingCasesOpenToValidate}
                      cases={casesOpenToValidate}
                      {...{
                        processCase,
                        isLoadingProccessCaseList,
                      }}
                      headerBackgroundColor={casesToValidateColor}
                      headerPreferences={
                        CasesTableHeaderPreferencesEnum.CASES_TO_VALIDATE
                      }
                      index={0}
                      handleFetchCasesCallBack={handleFetchCasesToValidate}
                    />,

                    <UserCasesByType
                      key="2"
                      isLoading={isLoadingCasesOpenCurrent}
                      cases={casesOpenCurrent}
                      {...{
                        processCase,
                        isLoadingProccessCaseList,
                      }}
                      headerBackgroundColor={casesMadeByUserColor}
                      headerPreferences={
                        CasesTableHeaderPreferencesEnum.CASES_MADE_BY_USER
                      }
                      index={1}
                      handleFetchCasesCallBack={handleFetchCasesMadeByUser}
                    />,

                    <UserCasesByType
                      key="3"
                      isLoading={isLoadingClosedValidationCases}
                      cases={closedValidationCases}
                      {...{
                        processCase,
                        isLoadingProccessCaseList,
                      }}
                      headerBackgroundColor={closedCasesToValidateColor}
                      headerPreferences={
                        CasesTableHeaderPreferencesEnum.CLOSED_CASES_TO_VALIDATE
                      }
                      index={2}
                      handleFetchCasesCallBack={
                        handleFetchClosedValidationCases
                      }
                    />,

                    <UserCasesByType
                      key="4"
                      isLoading={isLoadingClosedTreatedCases}
                      cases={closedTreatedCases}
                      {...{
                        processCase,
                        isLoadingProccessCaseList,
                      }}
                      headerBackgroundColor={closedCasesMadeByUserColor}
                      headerPreferences={
                        CasesTableHeaderPreferencesEnum.CLOSED_CASES_MADE_BY_USER
                      }
                      index={3}
                      handleFetchCasesCallBack={handleFetchClosedTreatedCases}
                    />,
                  ]}
                  colors={[
                    casesToValidateColor,
                    casesMadeByUserColor,
                    closedCasesToValidateColor,
                    closedCasesMadeByUserColor,
                  ]}
                />
              </>
            ) : (
              <>
                {userInfos && (
                  <ShowUserInfos
                    userData={userInfos}
                    customBackButtonFunc={resetUserReadingMode}
                  />
                )}
              </>
            )}
          </Wrap>
        </Container>
      </Layout>
    </>
  );
}

export default UserCasesView;
