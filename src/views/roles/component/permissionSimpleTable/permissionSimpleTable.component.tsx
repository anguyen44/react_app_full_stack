import CustomTableComponent from "shared/components/customTable/customTable.component";
import TablePreferencesEnum from "shared/enumeration/tablePreferences.enum";
import PermissionModel from "shared/model/permission.model";

interface PermissionSimpleTableComponentProps {
  permissions: PermissionModel[];
  headerColor?: string;
  hideHeader?: boolean;
  customNoContentTableName?: string;
}

function PermissionSimpleTableComponent({
  permissions,
  headerColor,
  hideHeader,
  customNoContentTableName,
}: PermissionSimpleTableComponentProps) {
  const columns: Column[] = [];
  columns.push({
    name: "Permission",
    field: "name",
  });
  columns.push({
    name: "Perimètre",
    field: "perimeter",
  });
  columns.push({
    name: "Sous-périmètre",
    field: "subPerimeter",
  });
  columns.push({
    name: "Zone",
    field: "zone",
  });
  columns.push({
    name: "Environnement",
    field: "environment",
  });
  columns.push({
    name: "Type",
    field: "type",
  });
  columns.push({
    name: "Sous-type",
    field: "subType",
  });
  columns.push({
    name: "Valeur",
    field: "value",
  });

  return (
    <CustomTableComponent
      data={permissions}
      columns={columns}
      customNoContentTableName={
        customNoContentTableName ?? "Aucune permission présente"
      }
      headerColor={headerColor}
      hideHeader={hideHeader}
      tablePreferences={TablePreferencesEnum.PERMISSIONS}
    />
  );
}

export default PermissionSimpleTableComponent;
