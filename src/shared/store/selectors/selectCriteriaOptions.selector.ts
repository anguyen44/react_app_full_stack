import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  findPermissionTemplate,
  buildItemSelect,
} from "shared/utils/permissionTemplate.util";

//get resource type options in transformed template data
export const selectResourceTypeOptions = () =>
  createSelector(
    (state: RootState) => state.permissionCreationReducer.permissionTypes,
    (permissionTypes) => {
      return permissionTypes?.map((value) =>
        buildItemSelect(value.oid, value.name, value.description),
      );
    },
  );

//get sub type options in transformed template data in depending on the resource type value which is chose by user
export const selectSubTypeOptions = () =>
  createSelector(
    (state: RootState) => state.permissionCreationReducer.permissionTypes,
    (state: RootState) => state.permissionCreationReducer.resourceTypeOid,
    (permissionTypes, resourceTypeOid) => {
      const permissionTemplate = findPermissionTemplate(
        permissionTypes,
        resourceTypeOid,
      );
      return permissionTemplate
        ? [...permissionTemplate.subTypes.keys()].map((key) =>
            buildItemSelect(
              key,
              key,
              permissionTemplate.subTypes.get(key).description,
            ),
          )
        : [];
    },
  );

export const selectPermissionTemplateItem = () =>
  createSelector(
    (state: RootState) => state.permissionCreationReducer.permissionTypes,
    (state: RootState) => state.permissionCreationReducer.resourceTypeOid,
    (state: RootState) => state.permissionCreationReducer.subType,
    (permissionTypes, resourceTypeOid, subType) => {
      const permissionTemplate = findPermissionTemplate(
        permissionTypes,
        resourceTypeOid,
      );
      return permissionTemplate?.subTypes.get(subType);
    },
  );
