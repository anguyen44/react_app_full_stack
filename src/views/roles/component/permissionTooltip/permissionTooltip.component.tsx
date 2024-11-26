import PermissionModel from "shared/model/permission.model";
import { CustomRowComponent, CustomTitle } from "./permissionTooltip.styled";

interface PermissionTooltipComponentProps {
  permissions: PermissionModel[];
  permissionOid: string;
}

function PermissionTooltipComponent({
  permissions,
  permissionOid,
}: PermissionTooltipComponentProps) {
  const permission = permissions?.find(
    (permission) => permission.oid === permissionOid,
  );

  return permission ? (
    <>
      <CustomTitle>{permission.name}</CustomTitle>
      <CustomRowComponent text={"Périmètre"} value={permission.perimeter} />
      <CustomRowComponent
        text={"Sous-périmètre"}
        value={permission.subPerimeter}
      />
      <CustomRowComponent text={"Zone"} value={permission.zone} />
      <CustomRowComponent
        text={"Environnement"}
        value={permission.environment}
      />
      <CustomRowComponent text={"Type"} value={permission.type} />
      <CustomRowComponent text={"Sous-type"} value={permission.subType} />
      <CustomRowComponent text={"Valeur"} value={permission.value} />
    </>
  ) : (
    <></>
  );
}

export default PermissionTooltipComponent;
