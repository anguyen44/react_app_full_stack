import endpoints from "shared/config/constants/endpoints.config";
import PermissionModel from "shared/model/permission.model";

import GlobalService from "../global/global.service";
import { AxiosResponse } from "axios";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import PermissionElementModel from "shared/model/permissionTemplate/permissionElement.model";

const instance = GlobalService.getInstance();

export type GetPermissionsGenerationParams = {
  portfolioOid: string;
  portfolioName: string;
  resourceTypeOid: string;
  subType: string;
  subPerimeter: string;
  environments: string[];
  zones: string[];
  values: string[];
};

const PermissionService = {
  addPermissionsToRole: (roleOid: string, permissionOidList: string[]) =>
    instance.patch(
      endpoints.ENDPOINT_ADD_PERMISSION_TO_ROLE_URL,
      addPermissionToRoleBody(roleOid, permissionOidList),
    ),
  deletePermissionInRoleByOid: (permissionsOids: string[], roleOid: string) =>
    instance.patch(
      endpoints.ENDPOINT_REMOVE_PERMISSION_IN_ROLE_URL,
      deletePermissionInRoleByOidBody(permissionsOids, roleOid),
    ),
  getPermissionsGeneration: ({ ...props }: GetPermissionsGenerationParams) =>
    instance
      .post(
        endpoints.ENDPOINT_GET_PERMISSION_GENERATION,
        getPermissionsGenerationBody({ ...props }),
      )
      .then(getPermissionsGenerationData),

  create: (roleOid: string, portfolioOid: string, permissionsNames: string[]) =>
    instance.post(
      endpoints.ENDPOINT_CREATE_PERMISSIONS_URL,
      createPermissionRequestBody(roleOid, portfolioOid, permissionsNames),
    ),
};

const createPermissionRequestBody = (
  roleOid: string,
  portfolioOid: string,
  permissionsNames: string[],
) => {
  return {
    CreatePermissionInput: {
      ...{ roleOid, portfolioOid, permissionsNames },
    },
  };
};

const getPermissionsGenerationBody = ({
  ...props
}: GetPermissionsGenerationParams) => {
  return JSON.stringify({
    PermissionGenerationInput: { ...props },
  });
};

const getPermissionsGenerationData = (
  response: AxiosResponse<PermissionDetailsModel[]>,
) => {
  return response.data?.map(buildPermissionDetails);
};

const buildPermissionDetails = (permissionDetails: PermissionDetailsModel) => {
  return new PermissionDetailsModel(
    permissionDetails.name,
    permissionDetails.perimeter,
    buildPermissionElement(permissionDetails.subPerimeter),
    buildPermissionElement(permissionDetails.zone),
    buildPermissionElement(permissionDetails.environment),
    buildPermissionElement(permissionDetails.type),
    buildPermissionElement(permissionDetails.subType),
    buildPermissionElement(permissionDetails.value),
  );
};

const buildPermissionElement = (permissionElement: PermissionElementModel) => {
  return new PermissionElementModel(
    permissionElement.name,
    permissionElement.description,
  );
};

const getPermissionByQueryResponse = (
  response: AxiosResponse<PermissionModel[]>,
) => {
  let permissions = [];
  const data = response.data;
  permissions = data?.map((permission) => {
    return new PermissionModel(
      permission.oid,
      permission.name,
      permission.isActive,
      permission.description,
    );
  });
  return permissions;
};

const addPermissionToRoleBody = (
  roleOid: string,
  permissionOidList: string[],
) => {
  return JSON.stringify({
    PermissionToRoleInput: {
      permissions: [...permissionOidList],
      role: roleOid,
    },
  });
};

const deletePermissionInRoleByOidBody = (
  permissionsOids: string[],
  roleOid: string,
) => {
  return JSON.stringify({
    PermissionToRoleInput: {
      permissions: new Array(permissionsOids),
      role: roleOid,
    },
  });
};

export { getPermissionByQueryResponse };

export default PermissionService;
