import Empty from "antd/es/empty";
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { AddButton } from "shared/components/CustomButtons/CustomButtons";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import LoadingComponent from "shared/components/loading/Loading.component";
import { LoadingWrapperCustom } from "shared/components/loading/Loading.styled";
import MESSAGES from "shared/config/constants/message.config";
import { creationPermissonsAction } from "shared/store/sagas/permissionTemplate.saga";
import {
  removeAllPermissionsPosibilitiesInCart,
  removePermissionsPosibilitiesInCart,
} from "shared/store/slices/permissionCreation/permissionCreation.slice";

import {
  IconRemoveWrapper,
  WrapperFooter,
  WrapperTable,
} from "../permissionsGenerationTable/permissionsGenerationTable.styled";
import { CustomCardTitleInPage } from "./permissionsInCardTable.styled";
import { useAppDispatch, useAppSelector } from "shared/store";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import { ROLES_PATH } from "shared/config/constants/path.config";
import { FaTrash } from "icons";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import { permissionDetailsColumns } from "shared/utils/permissionTemplate.util";

const PermissionsInCardTable = ({ portfolioOid }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { roleOid } = useParams();

  const { isFetchingPermissionCreationApi, permissionsPosibilitiesInCart } =
    useAppSelector((state) => state.permissionCreationReducer);

  const { dispatchAlertSuccess } = useAlertCard();

  const columns: ColumnsType<PermissionDetailsModel> = [
    {
      title: "",
      dataIndex: "remove_from_cart",
      width: "5%",
      render: (text, record) => (
        <IconRemoveWrapper
          onClick={() => removePermissonFromCartByName(record.name)}
        >
          <FaTrash className="deleteIcon" />
        </IconRemoveWrapper>
      ),
    },
    ...permissionDetailsColumns,
  ];

  const removePermissonFromCartByName = (permissionName: string) => {
    dispatch(removePermissionsPosibilitiesInCart(permissionName));
  };

  const removeAll = () => {
    dispatch(removeAllPermissionsPosibilitiesInCart());
  };

  const onCreationPermissions = () => {
    dispatch(
      creationPermissonsAction({
        portfolioOid,
        roleOid,
        permissionsNames: permissionsPosibilitiesInCart.map(
          (permission) => permission.name,
        ),
        onSuccessCallback: () => {
          dispatchAlertSuccess(MESSAGES.CREATE_PERMISSION_SUCCESS);
          navigate(`${ROLES_PATH}/${roleOid}`);
        },
      }),
    );
  };

  const locale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Aucune permission présente dans le panier"
      />
    ),
  };
  return (
    <>
      <Row sx={{ marginBottom: "20px" }}>
        <Col spanPercent={"50%"} sx={{ display: "flex", alignItems: "center" }}>
          <CustomCardTitleInPage>
            Permissions selectionnées pour demande
          </CustomCardTitleInPage>
        </Col>
        <Col spanPercent={"50%"} sx={{ textAlign: "right" }}>
          <AddButton
            data-testid="allDeleteButton"
            variant="contained"
            onClick={removeAll}
            disabled={!permissionsPosibilitiesInCart.length}
          >
            Vider mon panier
          </AddButton>
        </Col>
      </Row>
      <WrapperTable>
        <Table
          rowKey="name"
          locale={locale}
          columns={columns}
          dataSource={permissionsPosibilitiesInCart}
          bordered
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["10", "25", "50"],
            total: permissionsPosibilitiesInCart.length,
            showTotal: (total) =>
              `${total} élement${permissionsPosibilitiesInCart.length > 1 ? "s" : ""} au total`,
          }}
        />
      </WrapperTable>
      <WrapperFooter>
        <AddButton
          variant="contained"
          onClick={onCreationPermissions}
          disabled={
            !permissionsPosibilitiesInCart.length ||
            isFetchingPermissionCreationApi
          }
        >
          Soumettre la demande
        </AddButton>
        <LoadingWrapperCustom>
          {isFetchingPermissionCreationApi && <LoadingComponent />}
        </LoadingWrapperCustom>
      </WrapperFooter>
    </>
  );
};

export default PermissionsInCardTable;
