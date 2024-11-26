import { TableBody, TableRow } from "@mui/material";
import { format } from "date-fns";
import { FaCheck, FaTimes } from "icons";
import { useDispatch } from "react-redux";
import CopyToClipBoard from "shared/components/CopyToClipbord/CopyToClipbord.component";
import {
  CustomCaseTableRow,
  CustomContentTableCell,
  CustomNoContentTableCell,
} from "shared/components/CustomTableCells/CustomTableCells";
import CustomTooltipAntd from "shared/components/customTooltipAntd/customTooltipAntd";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import { AdminBadgeIcon } from "shared/components/header/adminBadge/styled";
import LoadingComponent from "shared/components/loading/Loading.component";
import {
  setUserInfos,
  setUserReadingMode,
} from "shared/store/slices/casesGestionPage/casesGestionPage.slice";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";
import { getTime } from "shared/utils/global.utils";

import AppoversInfo from "../ApproversInfo/AppoversInfo.component";
import ObjectsInfo from "../ObjectsInfo/ObjectsInfo.component";
const TableContainer = ({
  isLoadingProccessCaseList,
  countedListForShowing,
  onProcessCase,
  handleCancel,
  isLoading,
  cases,
  haveNoActions,
  caseStageType,
  ...rest
}) => {
  const dispatch = useDispatch();

  const { dispatchAlertDialog } = useAlertDialog();

  const onNavigateUserInfos = (e, userInfos) => {
    e.preventDefault();
    dispatch(setUserReadingMode(true));
    dispatch(setUserInfos(userInfos));
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

  const isBadCase = (currentCase) => {
    return !(
      currentCase.objects?.length > 0 &&
      currentCase.targets?.length > 0 &&
      currentCase.approvers?.length > 0 &&
      currentCase.asker
    );
  };

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <CustomNoContentTableCell colSpan="100%" align="center">
            <LoadingComponent />
          </CustomNoContentTableCell>
        </TableRow>
      );
    }

    return cases?.length ? (
      countedListForShowing(cases).map((currentCase) => {
        return (
          <CustomCaseTableRow
            key={currentCase.oid}
            $isBadCase={isBadCase(currentCase)}
            hover={true}
          >
            <CustomContentTableCell align="center">
              <CopyToClipBoard text={currentCase.oid} />
            </CustomContentTableCell>
            <CustomContentTableCell>
              {currentCase?.teamInfo?.displayName}
            </CustomContentTableCell>
            <CustomContentTableCell>
              {currentCase?.portfolioInfo?.displayName}
            </CustomContentTableCell>
            <CustomContentTableCell>
              {currentCase.actionType}
            </CustomContentTableCell>
            <CustomContentTableCell>
              {currentCase.typology}
            </CustomContentTableCell>
            <CustomContentTableCell>
              {currentCase.objects.length > 0 ? (
                <ObjectsInfo
                  objects={currentCase.objects}
                  readableMode={false}
                />
              ) : (
                <b>Objet inconnu</b>
              )}
            </CustomContentTableCell>
            <CustomContentTableCell>
              {currentCase.targets.length > 0 ? (
                <>
                  <b>{currentCase.targetTypeDisplay}</b> :{" "}
                  {currentCase.targets[0].name}
                </>
              ) : (
                <b>Cible inconnue</b>
              )}
            </CustomContentTableCell>
            {caseStageType === "open" && (
              <CustomContentTableCell>
                <a
                  href="#"
                  onClick={(e) => onNavigateUserInfos(e, currentCase.asker)}
                  aria-label="asker"
                >
                  {currentCase.asker?.fullName}
                </a>
              </CustomContentTableCell>
            )}
            <CustomContentTableCell width="9%">
              {caseStageType === "closed" ? (
                <Row>
                  <Col>
                    <AppoversInfo
                      approvers={
                        currentCase.treatedCaseApprover
                          ? [currentCase.treatedCaseApprover]
                          : null
                      }
                      action={onNavigateUserInfos}
                      readableMode={false}
                    />
                  </Col>
                  <Col>
                    {caseStageType === "closed" &&
                      currentCase.treatedCaseApprover?.superManager && (
                        <CustomTooltipAntd
                          text={""}
                          title={"Super-gestionnaire"}
                          color="#EAB96C"
                        >
                          <AdminBadgeIcon size={"20px"} />
                        </CustomTooltipAntd>
                      )}
                  </Col>
                </Row>
              ) : (
                currentCase.approvers.length > 0 && (
                  <AppoversInfo
                    approvers={currentCase.approvers}
                    action={onNavigateUserInfos}
                    readableMode={false}
                  />
                )
              )}
              {}
            </CustomContentTableCell>

            {caseStageType === "open" && (
              <CustomContentTableCell>
                {format(new Date(currentCase.createTimestamp), "dd/MM/yyyy")}
                <br />
                {getTime(currentCase.createTimestamp)}
              </CustomContentTableCell>
            )}

            {caseStageType === "closed" && (
              <CustomContentTableCell>
                {format(new Date(currentCase.closeTimestamp), "dd/MM/yyyy")}
                <br />
                {getTime(currentCase.closeTimestamp)}
              </CustomContentTableCell>
            )}
            <>
              {caseStageType === "closed" ? (
                <CustomContentTableCell align="center">
                  <CustomTooltipAntd
                    text={""}
                    title={
                      currentCase.caseValidationType === "validée"
                        ? "Validée"
                        : "Refusée"
                    }
                  >
                    {currentCase.caseValidationType === "validée" ? (
                      <FaCheck color="#28a745" />
                    ) : (
                      <FaTimes color="#dc3545" />
                    )}
                  </CustomTooltipAntd>
                </CustomContentTableCell>
              ) : (
                !haveNoActions && (
                  <CustomContentTableCell width="9%" align="center">
                    {
                      <div>
                        {isLoadingProccessCaseList?.includes(
                          currentCase.oid,
                        ) ? (
                          <LoadingComponent size={12} padding={"9px"} />
                        ) : (
                          <div>
                            <FaCheck
                              data-testid={`cancelCaseBtn-${currentCase.oid}`}
                              className="gestionTableActionIcon gestionTableCheckIcon"
                              onClick={() => handleAdd(currentCase)}
                            />
                            <FaTimes
                              data-testid={`validateCaseBtn-${currentCase.oid}`}
                              className="gestionTableActionIcon gestionTableDeleteIcon"
                              onClick={() => handleDelete(currentCase)}
                            />
                          </div>
                        )}
                      </div>
                    }
                  </CustomContentTableCell>
                )
              )}
            </>
          </CustomCaseTableRow>
        );
      })
    ) : (
      <TableRow>
        <CustomNoContentTableCell colSpan="100%" align="center">
          Aucun objet retrouvé
        </CustomNoContentTableCell>
      </TableRow>
    );
  };

  return <TableBody {...rest}>{renderTableBody()}</TableBody>;
};

export default TableContainer;
