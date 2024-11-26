import { CasesTableHeaderPreferencesEnum } from "shared/enumeration/tablePreferences.enum";
import CopyToClipBoard from "shared/components/CopyToClipbord/CopyToClipbord.component";
import ObjectsInfo from "../ObjectsInfo/ObjectsInfo.component";
import { useAppDispatch } from "shared/store";
import {
  setUserInfos,
  setUserReadingMode,
} from "shared/store/slices/casesGestionPage/casesGestionPage.slice";
import AppoversInfo from "../ApproversInfo/AppoversInfo.component";
import { format } from "date-fns";
import { getTime } from "shared/utils/global.utils";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import CustomTooltipAntd from "shared/components/customTooltipAntd/customTooltipAntd";
import { AdminBadgeIcon } from "shared/components/header/adminBadge/styled";
import { FaCheck, FaTimes } from "icons";

export const getCasesTableColumnByType = (
  type: CasesTableHeaderPreferencesEnum,
) => {
  const dispatch = useAppDispatch();
  const onNavigateUserInfos = (e, userInfos) => {
    e.preventDefault();
    dispatch(setUserReadingMode(true));
    dispatch(setUserInfos(userInfos));
  };

  const copyOidAction = (row) => <CopyToClipBoard text={row.oid} />;
  const teamInfoField = (row) => <>{row?.teamInfo?.displayName}</>;
  const resourceInfoField = (row) => <>{row?.portfolioInfo?.displayName}</>;
  const objectsInfoField = (row) => (
    <>
      {row.objects.length > 0 ? (
        <ObjectsInfo objects={row.objects} readableMode={false} />
      ) : (
        <b>Objet inconnu</b>
      )}
    </>
  );
  const targetsInfoField = (row) => (
    <>
      {row.targets.length > 0 ? (
        <>
          <b>{row.targetTypeDisplay}</b> : {row.targets[0].name}
        </>
      ) : (
        <b>Cible inconnue</b>
      )}
    </>
  );
  const askerInfoField = (row) => (
    <a
      href="#"
      onClick={(e) => onNavigateUserInfos(e, row.asker)}
      aria-label="asker"
    >
      {row.asker?.fullName}
    </a>
  );
  const approversInfoField = (row) => (
    <>
      {row.approvers.length > 0 && (
        <AppoversInfo
          approvers={row.approvers}
          action={onNavigateUserInfos}
          readableMode={false}
        />
      )}
    </>
  );
  const createTimeInfoField = (row) => (
    <>
      {format(new Date(row.createTimestamp), "dd/MM/yyyy")}
      <br />
      {getTime(row.createTimestamp)}
    </>
  );
  const closedCaseTimeInfoField = (row) => (
    <>
      {format(new Date(row.closeTimestamp), "dd/MM/yyyy")}
      <br />
      {getTime(row.closeTimestamp)}
    </>
  );
  const closedCaseValidatorInfoField = (row) => (
    <Row>
      <Col>
        <AppoversInfo
          approvers={row.treatedCaseApprover ? [row.treatedCaseApprover] : null}
          action={onNavigateUserInfos}
          readableMode={false}
        />
      </Col>
      <Col>
        {row.treatedCaseApprover?.superManager && (
          <AdminBadgeIcon
            size={"20px"}
            title={
              "Traitée par le super-gestionnaire " +
              row.treatedCaseApprover.fullName
            }
            minwidth={"150px"}
          />
        )}
      </Col>
    </Row>
  );
  const validationStatusInfoField = (row) => (
    <CustomTooltipAntd
      text={""}
      title={row.caseValidationType === "validée" ? "Validée" : "Refusée"}
    >
      {row.caseValidationType === "validée" ? (
        <FaCheck color="#28a745" />
      ) : (
        <FaTimes color="#dc3545" />
      )}
    </CustomTooltipAntd>
  );

  const casesTableColumnsBases = [
    {
      name: "Oid",
      field: "Oid",
      customField: copyOidAction,
      alignCenter: true,
    },
    {
      name: "Équipe",
      field: "Équipe",
      customField: teamInfoField,
      sortStatus: {
        sortable: true,
        sortType: "string",
        sortCode: "teamInfo.displayName",
      },
    },
    {
      name: "Ressource",
      field: "Ressource",
      customField: resourceInfoField,
    },
    {
      name: "Action",
      field: "actionType",
      alignCenter: true,
    },
    {
      name: "Typologie",
      field: "typology",
      sortStatus: {
        sortable: true,
        sortType: "string",
        sortCode: "typology",
      },
    },
    {
      name: "Qui / quoi ?",
      field: "Qui / quoi ?",
      customField: objectsInfoField,
    },
    {
      name: "Dans quoi ?",
      field: "Dans quoi ?",
      customField: targetsInfoField,
    },
  ];

  const openingCasesTableColumnsBases = [
    ...casesTableColumnsBases,
    { name: "Demandeur", field: "Demandeur", customField: askerInfoField },
    {
      name: "Valideur(s)",
      field: "Valideur(s)",
      customField: approversInfoField,
    },
    {
      name: "Créée le",
      field: "Créée le",
      customField: createTimeInfoField,
      sortStatus: {
        sortable: true,
        sortType: "date",
        sortCode: "createTimestamp",
      },
    },
  ];

  const closedCasesTableColumnsBases = [
    ...casesTableColumnsBases,
    { name: "Demandeur", field: "Demandeur", customField: askerInfoField },
    {
      name: "Valideur",
      field: "Valideur",
      customField: closedCaseValidatorInfoField,
      width: "9%",
    },
    {
      name: "Traitée le",
      field: "Traitée le",
      customField: closedCaseTimeInfoField,
      sortStatus: {
        sortable: true,
        sortType: "date",
        sortCode: "closeTimestamp",
      },
    },
    {
      name: "Validation",
      field: "Validation",
      customField: validationStatusInfoField,
      alignCenter: true,
    },
  ];

  switch (type) {
    case CasesTableHeaderPreferencesEnum.CASES_TO_VALIDATE:
    case CasesTableHeaderPreferencesEnum.CASES_MADE_BY_USER:
      return [...openingCasesTableColumnsBases];
    case CasesTableHeaderPreferencesEnum.CLOSED_CASES_TO_VALIDATE:
    case CasesTableHeaderPreferencesEnum.CLOSED_CASES_MADE_BY_USER:
      return [...closedCasesTableColumnsBases];
    default:
      return casesTableColumnsBases;
  }
};
