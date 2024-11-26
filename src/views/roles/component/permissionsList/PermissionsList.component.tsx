import { IconButton } from "@mui/material";
import { FaTrash, CustomFaInfoCircle } from "icons";
import LoadingComponent from "shared/components/loading/Loading.component";
import PermissionModel from "shared/model/permission.model";
import { PermissionsTable } from "views/teams/components/teamPermissions/teamPermissions.component";
import PermissionTooltipComponent from "../permissionTooltip/permissionTooltip.component";
import MESSAGES from "shared/config/constants/message.config";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import useAlertDialog from "shared/store/slices/globalUi/useAlertDialog";

interface PermissionsListComponentProps {
  permissions: PermissionModel[];
  isLoadingDeletePermissionByOidList: string[];
  confirmRemovePermission: (
    permissionOid: string,
    permissionName: string,
  ) => void;
  isLoading?: boolean;
  disableActions?: boolean;
  wrapperStyle?: React.CSSProperties;
  isLightMode?: boolean;
  resetPage?: Number;
  isTeamCaseValidationImpossible?: boolean;
}

const PermissionsListComponent = ({
  permissions,
  isLoadingDeletePermissionByOidList,
  confirmRemovePermission,
  disableActions,
  isLightMode,
  isTeamCaseValidationImpossible,
  ...props
}: PermissionsListComponentProps) => {
  const {
    dispatchAlertDialog,
    dispatchImpossibleDeleteCaseValidationAlertDialog,
  } = useAlertDialog();

  const { dispatchAlertInfo } = useAlertCard();

  const removePermission = ({ oid, name }) => {
    confirmRemovePermission(oid, name);
  };

  const handleDelete = ({ oid, name }) => {
    if (isTeamCaseValidationImpossible) {
      dispatchImpossibleDeleteCaseValidationAlertDialog({
        handleAction: removePermission,
        dataActions: { oid, name },
        elementLabel: "permission",
        isFemaleLabel: true,
      });
    } else if (isLightMode) {
      dispatchAlertInfo(MESSAGES.UNAVAILABLE_FUNCTIONALITY);
    } else {
      dispatchAlertDialog({
        title: "Confirmez-vous la suppression de la permission ?",
        description: (
          <>
            {
              "Si vous confirmez, une demande de suppression de la permission sera créée."
            }
            <br />
            Êtes-vous sûr de vouloir supprimer ?
          </>
        ),
        handleAction: removePermission,
        dataActions: { oid, name },
      });
    }
  };

  function getPermissionAction(permissionOid: string, permissionName: string) {
    return (
      <div style={{ width: "70%", margin: "0 auto" }}>
        {isLightMode && (
          <CustomFaInfoCircle
            title={
              <PermissionTooltipComponent
                permissions={permissions}
                permissionOid={permissionOid}
              />
            }
            minwidth={"250px"}
            style={{ marginLeft: !disableActions ? "10px" : 0 }}
          />
        )}
        {!disableActions && (
          <>
            {isLoadingDeletePermissionByOidList?.includes(permissionOid) ? (
              <LoadingComponent size={12} padding={"9px 19px"} />
            ) : (
              <>
                <IconButton
                  className="trashIconWrapper"
                  onClick={() =>
                    handleDelete({ oid: permissionOid, name: permissionName })
                  }
                >
                  <FaTrash
                    data-testid={`deletePermissionBtn-${permissionOid}`}
                    className="deleteIcon"
                  />
                </IconButton>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <PermissionsTable
      permissions={permissions}
      mode="admin"
      getPermissionAction={getPermissionAction as any}
      isLightMode={isLightMode}
      isInModal={false}
      {...(props as any)}
    />
  );
};

export default PermissionsListComponent;
