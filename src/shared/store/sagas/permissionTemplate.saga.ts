import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import EnvironmentService from "shared/services/environments/environments.service";
import PermissionService, {
  GetPermissionsGenerationParams,
} from "shared/services/permission/permission.service";
import PermissionTypesService from "shared/services/permissionTypes/permissionTypes.service";
import ZoneService from "shared/services/zones/zones.service";

import {
  removeAllPermissionsPosibilitiesInCart,
  setIsFetchingPermissionCreationApi,
  setIsFetchingPermissionsGeneration,
  setIsFetchingPermissionTemplate,
  setPermissionTypes,
  setPermissionsGeneration,
} from "../slices/permissionCreation/permissionCreation.slice";
import PermissionTypeModel from "shared/model/permissionType.model";
import { GenericNameDescriptionModel } from "shared/model/genericNameDescription.model";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";
import SubPerimetersService from "shared/services/subPerimeters/subPerimeters.service";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import PermissionTemplateSelectUserInputModel from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";
import { sortItemsByCallback } from "shared/utils/sort.utils";
import SudoCardsValuesService from "shared/services/sudoCardValues/sudoCardValues.service";

export const getPermissionTemplateAction = createAction<string>(
  "permissionTemplateSaga/getPermissionTemplate",
);

export const getSubPerimetersAction = createAction<ServicesSearchParams>(
  "permissionTemplateSaga/getSubPerimeters",
);

export const getZonesAction = createAction<ServicesSearchParams>(
  "permissionTemplateSaga/getZones",
);

export const getEnvironmentsAction = createAction<ServicesSearchParams>(
  "permissionTemplateSaga/getEnvironments",
);

export const getSudoCardValuesAction = createAction<ServicesSearchParams>(
  "permissionTemplateSaga/getSudoCardValues",
);

export const createSubPerimeterAction = createAction<ServiceCreateParams>(
  "permissionTemplateSaga/createSubPerimeter",
);

export const createSudoCardValueAction = createAction<ServiceCreateParams>(
  "permissionTemplateSaga/createSudoCardValue",
);

export const getPermissionGenerationAction =
  createAction<GetPermissionsGenerationParams>(
    "permissionTemplateSaga/getPermissionGeneration",
  );

export const creationPermissonsAction = createAction<CreationPermissonsParams>(
  "permissionTemplateSaga/creationPermissons",
);

export type ServicesSearchParams =
  ServiceListCallBack<GenericNameDescriptionModel> & {
    permissionTemplateSelectMidpoint: PermissionTemplateSelectMidpointModel;
    portfolioOid: string;
  };

function* getSubPerimeters(data: PayloadAction<ServicesSearchParams>) {
  const {
    onSuccessCallback,
    onFailureCallback,
    permissionTemplateSelectMidpoint,
    portfolioOid,
  } = data.payload;
  try {
    const subPerimeters: GenericNameDescriptionModel[] = yield call(() =>
      SubPerimetersService.findAll(
        permissionTemplateSelectMidpoint,
        portfolioOid,
      ),
    );
    onSuccessCallback(subPerimeters);
  } catch (error) {
    onFailureCallback();
    console.error("Error while getting subPerimeters", error);
  }
}

function* getZones(data: PayloadAction<ServicesSearchParams>) {
  const {
    onSuccessCallback,
    onFailureCallback,
    permissionTemplateSelectMidpoint,
    portfolioOid,
  } = data.payload;
  try {
    const zones: GenericNameDescriptionModel[] = yield call(() =>
      ZoneService.findAll(permissionTemplateSelectMidpoint, portfolioOid),
    );
    onSuccessCallback(zones);
  } catch (error) {
    onFailureCallback();
    console.error("Error while getting zones", error);
  }
}

function* getEnvironments(data: PayloadAction<ServicesSearchParams>) {
  const {
    onSuccessCallback,
    onFailureCallback,
    permissionTemplateSelectMidpoint,
    portfolioOid,
  } = data.payload;
  try {
    const environements: GenericNameDescriptionModel[] = yield call(() =>
      EnvironmentService.findAll(
        permissionTemplateSelectMidpoint,
        portfolioOid,
      ),
    );
    onSuccessCallback(environements);
  } catch (error) {
    onFailureCallback();
    console.error("Error while getting environments", error);
  }
}

function* getSudoCardValues(data: PayloadAction<ServicesSearchParams>) {
  const {
    onSuccessCallback,
    onFailureCallback,
    permissionTemplateSelectMidpoint,
    portfolioOid,
  } = data.payload;
  try {
    const sudoCards: GenericNameDescriptionModel[] = yield call(() =>
      SudoCardsValuesService.findAll(
        permissionTemplateSelectMidpoint,
        portfolioOid,
      ),
    );
    onSuccessCallback(sudoCards);
  } catch (error) {
    onFailureCallback();
    console.error("Error while getting sudo cards values", error);
  }
}

export type ServiceCreateParams =
  ServiceListCallBack<GenericNameDescriptionModel> & {
    permissionTemplateSelectUserInput: PermissionTemplateSelectUserInputModel;
    name: string;
    description: string;
    portfolioOid: string;
    serviceOid?: string;
  };

function* createSubPerimeter(data: PayloadAction<ServiceCreateParams>) {
  const {
    onSuccessCallback,
    onFailureCallback,
    permissionTemplateSelectUserInput,
    name,
    description,
    portfolioOid,
  } = data.payload;
  try {
    const subPerimeter: GenericNameDescriptionModel = yield call(() =>
      SubPerimetersService.createSubPerimeter(
        permissionTemplateSelectUserInput,
        name,
        description,
        portfolioOid,
      ),
    );
    onSuccessCallback(subPerimeter);
  } catch (error) {
    onFailureCallback();
    console.error("Error while creating subPerimeter", error);
  }
}

function* createSudoCardValue(data: PayloadAction<ServiceCreateParams>) {
  const {
    onSuccessCallback,
    onFailureCallback,
    permissionTemplateSelectUserInput,
    name,
    description,
    portfolioOid,
    serviceOid,
  } = data.payload;
  try {
    const subPerimeter: GenericNameDescriptionModel = yield call(() =>
      SudoCardsValuesService.createSudoCardValue(
        permissionTemplateSelectUserInput,
        name,
        description,
        portfolioOid,
        serviceOid,
      ),
    );
    onSuccessCallback(subPerimeter);
  } catch (error) {
    onFailureCallback();
    console.error("Error while creating sudoCardValue", error);
  }
}

function* getPermissionTemplate(data: PayloadAction<string>) {
  yield put(setIsFetchingPermissionTemplate(true));
  try {
    const permissionTypes: PermissionTypeModel[] = yield call(() =>
      PermissionTypesService.getPermissionTypes(data.payload),
    );

    yield put(setPermissionTypes(permissionTypes));
  } catch (error) {
    console.error("Error while getting permission templates", error);
  } finally {
    yield put(setIsFetchingPermissionTemplate(false));
  }
}

function* getPermissionGeneration(
  data: PayloadAction<GetPermissionsGenerationParams>,
) {
  yield put(setIsFetchingPermissionsGeneration(true));
  try {
    const permissionsGeneration: PermissionDetailsModel[] = yield call(() =>
      PermissionService.getPermissionsGeneration(data.payload),
    );
    yield put(
      setPermissionsGeneration(
        sortItemsByCallback(
          permissionsGeneration,
          (permissionDetail) => permissionDetail.name,
        ),
      ),
    );
  } catch (error) {
    console.error("Error while getting permissions generation", error);
  } finally {
    yield put(setIsFetchingPermissionsGeneration(false));
  }
}

type CreationPermissonsParams = {
  portfolioOid: string;
  roleOid: string;
  permissionsNames: string[];
} & OnSuccessCallback;

function* creationPermissons(data: PayloadAction<CreationPermissonsParams>) {
  const { portfolioOid, roleOid, permissionsNames, onSuccessCallback } =
    data.payload;
  yield put(setIsFetchingPermissionCreationApi(true));
  try {
    yield call(() =>
      PermissionService.create(roleOid, portfolioOid, permissionsNames),
    );
    yield put(removeAllPermissionsPosibilitiesInCart());
    onSuccessCallback();
  } catch (error) {
    console.error("Error while creating the permissions", error);
  } finally {
    yield put(setIsFetchingPermissionCreationApi(false));
  }
}

function* permissionTemplateSaga() {
  yield takeEvery(getPermissionTemplateAction, getPermissionTemplate);
  yield takeEvery(getSubPerimetersAction, getSubPerimeters);
  yield takeEvery(getZonesAction, getZones);
  yield takeEvery(getEnvironmentsAction, getEnvironments);
  yield takeEvery(getSudoCardValuesAction, getSudoCardValues);
  yield takeEvery(createSubPerimeterAction, createSubPerimeter);
  yield takeEvery(createSudoCardValueAction, createSudoCardValue);
  yield takeEvery(getPermissionGenerationAction, getPermissionGeneration);
  yield takeEvery(creationPermissonsAction, creationPermissons);
}

export default permissionTemplateSaga;
