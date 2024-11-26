import endpoints from "shared/config/constants/endpoints.config";
import CaseModel from "shared/model/case.model";
import GlobalService from "shared/services/global/global.service";

const instance = GlobalService.getInstance();

const CaseService = {
  proccessCase: (caseOid, isApproved, asSuperManager) =>
    instance.post(
      endpoints.ENDPOINT_PROCESS_CASE_URL,
      processCaseQuery(caseOid, isApproved),
      { params: { asSuperManager } },
    ),
  getCasesNumber: (asSuperManager) =>
    instance
      .get(endpoints.ENDPOINT_GET_CASE_NUMBER_URL, {
        params: { asSuperManager },
      })
      .then((response) => response.data),
  getSelfCasesOpenToValidate: (asSuperManager) =>
    instance
      .get(endpoints.ENDPOINT_GET_SELF_CASE_OPEN_TO_VALIDATE, {
        params: { asSuperManager },
      })
      .then(casesResponseBody),
  getSelfCasesOpenCurrent: (asSuperManager) =>
    instance
      .get(endpoints.ENDPOINT_GET_SELF_CASE_OPEN_CURRENT, {
        params: { asSuperManager },
      })
      .then(casesResponseBody),
  getClosedValidationCases: (
    minimumValidationDate,
    maximumValidationDate,
    asSuperManager,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_GET_SELF_CASE_CLOSED_VALIDATION,
        getClosedCasesBody(minimumValidationDate, maximumValidationDate),
        { params: { asSuperManager } },
      )
      .then(casesResponseBody),
  getClosedTreatedCases: (
    minimumValidationDate,
    maximumValidationDate,
    asSuperManager,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_GET_SELF_CASE_CLOSED_TREATED,
        getClosedCasesBody(minimumValidationDate, maximumValidationDate),
        { params: { asSuperManager } },
      )
      .then(casesResponseBody),
};

const casesResponseBody = ({ data }) =>
  data?.map(
    (caseItem) =>
      new CaseModel(
        caseItem.oid,
        caseItem.state,
        caseItem.createTimestamp,
        caseItem.objects,
        caseItem.targets,
        caseItem.asker,
        caseItem.approvers,
        caseItem.actionType,
        caseItem.typology,
        caseItem.teamInfo,
        caseItem.portfolioInfo,
        caseItem.closeTimestamp,
        caseItem.treatedCaseApprover,
        caseItem.caseValidationType,
      ),
  );

const processCaseQuery = (caseOid, isApproved) =>
  JSON.stringify({
    ProcessCaseInput: {
      caseOid,
      isApproved,
    },
  });

const getClosedCasesBody = (minimumValidationDate, maximumValidationDate) => {
  return JSON.stringify({
    TimeStampFilterInput: {
      minimumValidationDate,
      maximumValidationDate,
    },
  });
};

export { casesResponseBody };

export default CaseService;
