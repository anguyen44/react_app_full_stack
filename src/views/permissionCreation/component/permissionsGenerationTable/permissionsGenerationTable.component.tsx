import ConfigProvider from "antd/es/config-provider";
import Empty from "antd/es/empty";
import Spin from "antd/es/spin";
import Table from "antd/es/table";
import frFR from "antd/locale/fr_FR";
import { AddButton } from "shared/components/CustomButtons/CustomButtons";
import {
  addPermissionsPosibilitiesInCart,
  setSelectedPermissionPosibilities,
} from "shared/store/slices/permissionCreation/permissionCreation.slice";

import {
  WrapperFooter,
  WrapperTable,
} from "./permissionsGenerationTable.styled";
import { useAppDispatch, useAppSelector } from "shared/store";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import { TableRowSelection } from "antd/es/table/interface";
import { permissionDetailsColumns } from "shared/utils/permissionTemplate.util";

const PermissionsGenerationTable = () => {
  const dispatch = useAppDispatch();
  const {
    permissionsGeneration,
    selectedPermissionPosibilities: selectedRowKeys,
    isFetchingPermissionsGeneration,
    permissionsPosibilitiesInCart,
  } = useAppSelector((state) => state.permissionCreationReducer);

  const onSelectChange = (newSelectedRowKeys: string[]) => {
    dispatch(setSelectedPermissionPosibilities(newSelectedRowKeys));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
    getCheckboxProps: (record: PermissionDetailsModel) => ({
      disabled: checkDisableRow(record), // Column configuration not to be checked
    }),
  } as unknown as TableRowSelection<PermissionDetailsModel>;

  const locale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Aucune permission générée"
      />
    ),
  };

  const addPermissionsToCard = () => {
    dispatch(
      addPermissionsPosibilitiesInCart(
        permissionsGeneration.filter((permission) =>
          selectedRowKeys.includes(permission.name),
        ),
      ),
    );
    dispatch(setSelectedPermissionPosibilities([]));
  };

  const checkDisableRow = (record: PermissionDetailsModel) => {
    return (
      permissionsPosibilitiesInCart?.some(
        (permission) => permission.name === record.name,
      ) ?? false
    );
  };

  const checkSelectedInCart = (record: PermissionDetailsModel) => {
    if (
      permissionsPosibilitiesInCart?.some(
        (permission) => permission.name === record.name,
      )
    ) {
      return "table-row-light";
    }
  };

  return (
    <ConfigProvider locale={frFR}>
      <WrapperTable>
        <Table
          rowKey="name"
          rowClassName={checkSelectedInCart}
          locale={locale}
          rowSelection={rowSelection}
          columns={permissionDetailsColumns}
          dataSource={permissionsGeneration}
          bordered
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: ["10", "25", "50"],
            total: permissionsGeneration.length,
            showTotal: (total) =>
              `${total} élement${permissionsGeneration.length > 1 ? "s" : ""} au total`,
            showSizeChanger: true,
          }}
          loading={{
            indicator: <Spin size="small" />,
            spinning: isFetchingPermissionsGeneration,
          }}
        />
      </WrapperTable>
      <WrapperFooter>
        <AddButton
          data-testid="addPermissionsToCardButton"
          variant="contained"
          disabled={!selectedRowKeys.length}
          onClick={addPermissionsToCard}
        >
          Ajouter au panier
        </AddButton>
      </WrapperFooter>
    </ConfigProvider>
  );
};

export default PermissionsGenerationTable;
