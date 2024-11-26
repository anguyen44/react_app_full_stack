import { FaCheck, FaTimes } from "icons";
import { useState } from "react";
import CustomTableComponent from "shared/components/customTable/customTable.component";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import LoadingComponent from "shared/components/loading/Loading.component";
import MESSAGES from "shared/config/constants/message.config";
import TablePreferencesEnum, {
  CasesTableHeaderPreferencesEnum,
} from "shared/enumeration/tablePreferences.enum";
import {
  getClosedTreatedCasesAction,
  getClosedTreatedCasesByDatesPayloadAction,
  getClosedValidationCasesAction,
  getClosedValidationCasesByDatesPayloadAction,
} from "shared/store/sagas/cases.saga";
import {
  initMinimumValidationDateClosedValidationCases,
  initMaximumValidationDateClosedValidationCases,
  setMinimumValidationDateClosedValidationCases,
  setMaximumValidationDateClosedValidationCases,
  initMinimumValidationDateClosedTreatedCases,
  initMaximumValidationDateClosedTreatedCases,
  setMinimumValidationDateClosedTreatedCases,
  setMaximumValidationDateClosedTreatedCases,
} from "shared/store/slices/casesGestionPage/casesGestionPage.slice";
import { triggerAlertCard } from "shared/store/slices/globalUi/globalUi.slice";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";

import { getCasesTableColumnByType } from "./headerColumnsByTableType";
import Search from "./Search";
import DateRange from "./Search/dateRange";
import { Wrap } from "./styled";
import CaseModel from "shared/model/case.model";
import { useAppDispatch, useAppSelector } from "shared/store";

interface CasesTableProps {
  processCase: (caseOid: string, isApproved: boolean) => void;
  cases: CaseModel[];
  isLoading: boolean;
  isLoadingProccessCaseList: string[];
  headerPreferences: CasesTableHeaderPreferencesEnum;
  headerBackgroundColor: string;
}

const CasesTable = ({
  processCase,
  cases: initCases,
  isLoading,
  isLoadingProccessCaseList,
  headerPreferences,
  headerBackgroundColor,
  ...rest
}: CasesTableProps) => {
  const {
    CASES_TO_VALIDATE,
    CLOSED_CASES_TO_VALIDATE,
    CLOSED_CASES_MADE_BY_USER,
  } = CasesTableHeaderPreferencesEnum;

  const [selected, setSelected] = useState(null);

  const dispatch = useAppDispatch();
  const { dispatchAlertDialog } = useAlertDialog();

  const currentUserOid = useAppSelector((state) => state.userReducer.user?.oid);
  const asSuperManager = useAppSelector(
    (state) => state.userReducer.modeSuperManagerEnable,
  );
  const {
    minimumValidationDateClosedValidationCases,
    maximumValidationDateClosedValidationCases,
    minimumValidationDateClosedTreatedCases,
    maximumValidationDateClosedTreatedCases,
  } = useAppSelector((state) => state.casesGestionPageReducer);

  let cases = !selected
    ? initCases
    : initCases?.filter(({ oid }) => oid === selected);

  const onCheckApproverSameAskerByCaseOid = (caseOid) => {
    const caseData = cases.filter((caseItem) => caseItem.oid === caseOid)[0];
    if (
      caseData?.approvers.map((i) => i.oid).includes(caseData?.asker.oid) &&
      caseData?.asker.oid === currentUserOid
    ) {
      return true;
    }
    return false;
  };

  const onCheckCurrentUserBeApprover = (caseOid) => {
    const caseData = cases.filter((caseItem) => caseItem.oid === caseOid)[0];
    if (caseData?.approvers.map((i) => i.oid).includes(currentUserOid)) {
      return true;
    }
    return false;
  };

  const onCheckCaseProcessing = (caseOid, processCaseCallback) => {
    if (onCheckApproverSameAskerByCaseOid(caseOid)) {
      dispatch(
        triggerAlertCard({
          type: "error",
          message: MESSAGES.NOT_ACCEPT_SAME_DEMANDER_APPROVER,
          duration: 5000,
        }),
      );
    } else if (!onCheckCurrentUserBeApprover(caseOid) && !asSuperManager) {
      dispatch(
        triggerAlertCard({
          type: "error",
          message: MESSAGES.FORBIDDEN,
          duration: 5000,
        }),
      );
    } else {
      processCaseCallback();
    }
  };

  const onProcessCase = ({ oid }) => {
    onCheckCaseProcessing(oid, () => {
      processCase(oid, true);
    });
  };

  const handleCancel = ({ oid }) => {
    onCheckCaseProcessing(oid, () => {
      processCase(oid, false);
    });
  };

  const handleChangeMinimumValidationDateClosedValidationCases = (date) => {
    dispatch(setMinimumValidationDateClosedValidationCases(date));
  };

  const handleChangeMaximumValidationDateClosedValidationCases = (date) => {
    dispatch(setMaximumValidationDateClosedValidationCases(date));
  };

  const handleChangeMinimumValidationDateClosedTreatedCases = (date) => {
    dispatch(setMinimumValidationDateClosedTreatedCases(date));
  };

  const handleChangeMaximumValidationDateClosedTreatedCases = (date) => {
    dispatch(setMaximumValidationDateClosedTreatedCases(date));
  };

  const handleDateRangeChange = (dateRange) => {
    const [minimumValidationDate, maximumValidationDate] = dateRange;

    if (headerPreferences === CLOSED_CASES_TO_VALIDATE) {
      handleChangeMinimumValidationDateClosedValidationCases(
        minimumValidationDate,
      );
      handleChangeMaximumValidationDateClosedValidationCases(
        maximumValidationDate,
      );
    } else {
      handleChangeMinimumValidationDateClosedTreatedCases(
        minimumValidationDate,
      );
      handleChangeMaximumValidationDateClosedTreatedCases(
        maximumValidationDate,
      );
    }
  };

  const dateRangeApproveAction = (dateRange) => {
    handleDateRangeChange(dateRange);
    if (headerPreferences === CLOSED_CASES_TO_VALIDATE) {
      dispatch(
        getClosedValidationCasesByDatesPayloadAction({
          asSuperManager,
        }),
      );
    } else {
      dispatch(
        getClosedTreatedCasesByDatesPayloadAction({
          asSuperManager,
        }),
      );
    }
  };

  const dateRangeCancelAction = () => {
    if (headerPreferences === CLOSED_CASES_TO_VALIDATE) {
      if (
        minimumValidationDateClosedValidationCases &&
        maximumValidationDateClosedValidationCases
      ) {
        dispatch(initMinimumValidationDateClosedValidationCases());
        dispatch(initMaximumValidationDateClosedValidationCases());
        dispatch(getClosedValidationCasesAction({ asSuperManager }));
      }
    } else {
      if (
        minimumValidationDateClosedTreatedCases &&
        maximumValidationDateClosedTreatedCases
      ) {
        dispatch(initMinimumValidationDateClosedTreatedCases());
        dispatch(initMaximumValidationDateClosedTreatedCases());
        dispatch(getClosedTreatedCasesAction({ asSuperManager }));
      }
    }
  };

  const handleDelete = ({ oid, asker: { nni } }) => {
    dispatchAlertDialog({
      handleAction: handleCancel,
      dataActions: { oid, asker: { nni } },
      title: "Confirmez-vous le rejet de la demande ?",
      description: (
        <>
          Si vous rejeter, la demande sera définitivement abandonnée. <br />
          Êtes-vous sûr de vouloir rejeter ?
        </>
      ),
      titleButtonAction: "Rejeter",
    });
  };
  const handleAdd = ({ oid, asker: { nni } }) => {
    dispatchAlertDialog({
      handleAction: onProcessCase,
      dataActions: { oid, asker: { nni } },
      title: "Confirmez-vous la validation de la demande ?",
      description: (
        <>
          Si vous validez, la demande sera définitivement acceptée. <br />
          Êtes-vous sûr de vouloir valider ?
        </>
      ),
      titleButtonAction: "Valider",
    });
  };

  const validationActionField = (row) => (
    <div>
      {isLoadingProccessCaseList?.includes(row.oid) ? (
        <LoadingComponent size={12} padding={"9px"} />
      ) : (
        <div>
          <FaCheck
            data-testid={`cancelCaseBtn-${row.oid}`}
            className="gestionTableActionIcon gestionTableCheckIcon"
            onClick={() => handleAdd(row)}
          />
          <FaTimes
            data-testid={`validateCaseBtn-${row.oid}`}
            className="gestionTableActionIcon gestionTableDeleteIcon"
            onClick={() => handleDelete(row)}
          />
        </div>
      )}
    </div>
  );

  let headTableData = getCasesTableColumnByType(headerPreferences);
  if (headerPreferences === CASES_TO_VALIDATE) {
    headTableData.push({
      name: "Validation ?",
      field: "Validation ?",
      customField: validationActionField,
    });
  }

  const isClosedCases = [
    CLOSED_CASES_TO_VALIDATE,
    CLOSED_CASES_MADE_BY_USER,
  ].includes(headerPreferences);

  const isBadCase = (currentCase) => {
    return !(
      currentCase.objects.length > 0 &&
      currentCase.targets.length > 0 &&
      currentCase.approvers.length > 0 &&
      currentCase.asker
    );
  };

  const dateRange =
    headerPreferences === CLOSED_CASES_TO_VALIDATE
      ? [
          minimumValidationDateClosedValidationCases,
          maximumValidationDateClosedValidationCases,
        ]
      : [
          minimumValidationDateClosedTreatedCases,
          maximumValidationDateClosedTreatedCases,
        ];

  return (
    <>
      <Row margin={"0"}>
        <Col spanPercent={"50%"}>
          <Search
            disabled={isLoading}
            options={initCases?.map((el) => el.oid)}
            {...{ setSelected, selected }}
          />
        </Col>
        <Col spanPercent={"50%"} sx={{ marginRight: "10px" }}>
          {isClosedCases && (
            <>
              <DateRange
                dateRange={dateRange}
                setDateRange={handleDateRangeChange}
                approveAction={dateRangeApproveAction}
                cancelAction={dateRangeCancelAction}
                disabled={isLoading}
              />
            </>
          )}
        </Col>
      </Row>
      <Wrap {...rest}>
        <CustomTableComponent
          data={cases}
          columns={headTableData}
          customNoContentTableName={"Aucun objet retrouvé"}
          headerBackgroundColor={headerBackgroundColor}
          isLoading={isLoading}
          emphasiseRowByCondition={isBadCase}
          tablePreferences={TablePreferencesEnum.ALL_CASES}
        />
      </Wrap>
    </>
  );
};

export default CasesTable;
