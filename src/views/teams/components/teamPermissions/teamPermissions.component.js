import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomPaper,
  CustomPaperForTableInModal,
} from "shared/components/CustomPaper/CustomPaper";
import {
  CustomHeadTableCell,
  CustomNoContentTableCell,
  CustomTableHead,
} from "shared/components/CustomTableCells/CustomTableCells";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import ItemStatusComponent from "shared/components/itemDetails/itemInfos/itemStatus.component";
import LoadingComponent from "shared/components/loading/Loading.component";
import Modal from "shared/components/modal/modal.component";
import { TableInModalHeaderCustom } from "shared/components/TableInModalHeaderCustom/TableInModalHeaderCustom";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import { usePagination } from "shared/hooks/usePagination";
import { getRoleByOidAction } from "shared/store/sagas/role.saga";

import {
  PermisisonTableFooterInModal,
  SpanContent,
  TableWrapper,
} from "./teamPermissions.styled";

const SectionWrapper = ({ children }) => {
  return (
    <div style={{ paddingBottom: "10px", fontSize: "14px" }}>{children}</div>
  );
};

const PermissionsSectionTitle = ({ children }) => {
  return (
    <div style={{ color: "#248BC0", fontWeight: 600, marginTop: "15px" }}>
      {children}
    </div>
  );
};

const StrongLabel = ({ children }) => {
  return (
    <strong style={{ color: "rgba(0, 0, 0, 0.5411764706)" }}>
      {children}{" "}
    </strong>
  );
};

const TableInModalHeaderCustomWrapper = ({
  modeAdmin,
  isRolePage,
  children,
}) =>
  isRolePage ? (
    <TableHead>
      <TableInModalHeaderCustom $modeadmin={modeAdmin}>
        {children}
      </TableInModalHeaderCustom>
    </TableHead>
  ) : (
    <CustomTableHead>
      <TableRow>{children}</TableRow>
    </CustomTableHead>
  );

const TableCellCustomWrapper = ({ isRolePage, children, ...props }) =>
  isRolePage ? (
    <TableCell {...props}>
      <strong>{children}</strong>
    </TableCell>
  ) : (
    <CustomHeadTableCell color="#fff" fontWeight="600" {...props}>
      {children}
    </CustomHeadTableCell>
  );

const PermissionsTable = ({
  permissions,
  mode = "lamda",
  getPermissionAction = () => {},
  isLoading,
  wrapperStyle,
  isInModal = true,
  isLightMode = false,
  resetPage,
}) => {
  const {
    page,
    setPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    countedListForShowing,
    rowsPerPageOptions,
  } = usePagination(TablePreferencesEnum.PERMISSIONS);
  const modeAdmin = mode === "admin";

  const isRolePage = isInModal || !isLightMode;

  useEffect(() => {
    if (resetPage) {
      setPage(0);
    }
  }, [resetPage]);

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" height={50} width="100%" />
      ) : (
        <TableWrapper style={wrapperStyle}>
          <TableContainer
            component={isInModal ? CustomPaperForTableInModal : CustomPaper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableInModalHeaderCustomWrapper
                modeAdmin={modeAdmin}
                {...{ isRolePage }}
              >
                <TableCellCustomWrapper {...{ isRolePage }}>
                  Nom
                </TableCellCustomWrapper>
                {!isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Périmètre
                  </TableCellCustomWrapper>
                )}
                {!isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Sous-périmètre
                  </TableCellCustomWrapper>
                )}
                {!isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Zone
                  </TableCellCustomWrapper>
                )}
                {!isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Environnement
                  </TableCellCustomWrapper>
                )}
                {!isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Type
                  </TableCellCustomWrapper>
                )}
                {!isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Sous-type
                  </TableCellCustomWrapper>
                )}
                {!isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Valeur
                  </TableCellCustomWrapper>
                )}
                {isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Rôle
                  </TableCellCustomWrapper>
                )}
                {isLightMode && (
                  <TableCellCustomWrapper {...{ isRolePage }}>
                    Equipe
                  </TableCellCustomWrapper>
                )}
                <TableCellCustomWrapper {...{ isRolePage }}>
                  Statut
                </TableCellCustomWrapper>
                {modeAdmin && (
                  <TableCellCustomWrapper
                    align="center"
                    style={isRolePage ? {} : { minWidth: "64px" }}
                    isRolePage={isRolePage}
                  >
                    Actions
                  </TableCellCustomWrapper>
                )}
              </TableInModalHeaderCustomWrapper>
              <TableBody>
                <>
                  {permissions?.length > 0 ? (
                    countedListForShowing(permissions).map((row) => (
                      <TableRow
                        key={
                          row.name + (!isLightMode ? "" : "#" + row.role?.name)
                        }
                        sx={{
                          "& > .MuiTableCell-root": {
                            fontSize: "12px",
                          },
                        }}
                        className={row.deleted ? "deletingStatusRow" : ""}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        {!isLightMode && <TableCell>{row.perimeter}</TableCell>}
                        {!isLightMode && (
                          <TableCell>{row.subPerimeter}</TableCell>
                        )}
                        {!isLightMode && <TableCell>{row.zone}</TableCell>}
                        {!isLightMode && (
                          <TableCell>{row.environment}</TableCell>
                        )}
                        {!isLightMode && <TableCell>{row.type}</TableCell>}
                        {!isLightMode && <TableCell>{row.subType}</TableCell>}
                        {!isLightMode && <TableCell>{row.value}</TableCell>}
                        {isLightMode && (
                          <TableCell>{row.role?.displayName}</TableCell>
                        )}
                        {isLightMode && (
                          <TableCell>{row.role?.team?.displayName}</TableCell>
                        )}
                        <TableCell>
                          <ItemStatusComponent
                            isActive={row.isActive}
                            style={{ marginLeft: "12px" }}
                          />
                        </TableCell>
                        {modeAdmin && (
                          <TableCell align="center" style={{ padding: 0 }}>
                            {getPermissionAction(row.oid, row.name)}
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <CustomNoContentTableCell colSpan="100%" align="center">
                        Aucune permission présente
                      </CustomNoContentTableCell>
                    </TableRow>
                  )}
                </>
              </TableBody>
              <PermisisonTableFooterInModal
                count={permissions.length}
                $isSticky={isInModal && permissions.length > 5}
                {...{
                  rowsPerPageOptions,
                  isLoading: false,
                  rowsPerPage,
                  page,
                  handleChangePage,
                  handleChangeRowsPerPage,
                }}
              />
            </Table>
          </TableContainer>
        </TableWrapper>
      )}
    </>
  );
};

const TeamPermission = ({ roleOid, onCloseModal, showModal }) => {
  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.rolePageReducer.baseInfo);
  const permissions = useSelector((state) => state.rolePageReducer.permissions);
  const isFetching = useSelector((state) => state.rolePageReducer.isFetching);

  useEffect(() => {
    if (roleOid) {
      dispatch(getRoleByOidAction({ roleOid }));
    }
  }, [roleOid]);

  return (
    <Modal
      visible={showModal}
      title={<p style={{ margin: 0 }}>Informations de rôle</p>}
      isFullScreen
      headerDivider
      onCancel={onCloseModal}
    >
      {!isFetching && roleData ? (
        <>
          <Row>
            <Col spanPercent={"50%"}>
              <SectionWrapper>
                <StrongLabel>Nom du rôle</StrongLabel>
                <SpanContent>{roleData.displayName}</SpanContent>
              </SectionWrapper>
            </Col>
            <Col spanPercent={"50%"}>
              <SectionWrapper>
                <StrongLabel>Date de création</StrongLabel>
                <SpanContent>
                  {roleData.createTimestamp
                    ? format(new Date(roleData.createTimestamp), "dd/MM/yyyy")
                    : "None"}
                </SpanContent>
              </SectionWrapper>
            </Col>
          </Row>
          <Row>
            <Col spanPercent={"50%"}>
              <SectionWrapper>
                <StrongLabel>Responsable du rôle</StrongLabel>
                <SpanContent>{roleData?.owner?.fullName}</SpanContent>
              </SectionWrapper>
            </Col>
            <Col spanPercent={"50%"}>
              <SectionWrapper>
                <StrongLabel>Date de dernière modification</StrongLabel>
                <SpanContent>
                  {roleData.modifyTimestamp
                    ? format(new Date(roleData.modifyTimestamp), "dd/MM/yyyy")
                    : "None"}
                </SpanContent>
              </SectionWrapper>
            </Col>
          </Row>
          <SectionWrapper>
            <StrongLabel>Responsable de la ressource</StrongLabel>
            <SpanContent>{roleData.portfolio?.owner?.fullName}</SpanContent>
          </SectionWrapper>
          <SectionWrapper>
            <StrongLabel>Description</StrongLabel>
            <SpanContent $isBlock>{roleData.description}</SpanContent>
          </SectionWrapper>
          <PermissionsSectionTitle>Permissions</PermissionsSectionTitle>
          <PermissionsTable permissions={permissions} />
        </>
      ) : (
        <div style={{ padding: "10px" }}>
          <LoadingComponent />
        </div>
      )}
    </Modal>
  );
};

export {
  PermissionsSectionTitle,
  PermissionsTable,
  SectionWrapper,
  SpanContent,
  StrongLabel,
  TableWrapper,
};

export default TeamPermission;
