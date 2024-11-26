import { GenericNameDescriptionModel } from "shared/model/genericNameDescription.model";
import PermissionTemplateSelectModel from "shared/model/permissionTemplate/permissionTemplateSelect.model";
import PermissionTemplateSelectItemModel from "shared/model/permissionTemplate/permissionTemplateSelectItem.model";
import PermissionTemplateSelectTypeEnum from "shared/model/permissionTemplate/permissionTemplateSelectType.enum";
import PermissionTypeModel from "shared/model/permissionType.model";
import { sortItemsByCallback } from "./sort.utils";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";
import { AxiosResponse } from "axios";
import { ColumnsType } from "antd/es/table";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import CustomTooltipAntd from "shared/components/customTooltipAntd/customTooltipAntd";
import PermissionTemplateSelectUserInputModel, {
  SUDO_MAP,
} from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";
import { DisplayValueType } from "rc-select/lib//interface";
import SudoCardValueModel from "shared/model/sudoCardValue.model";
import { getObjectsInstances } from "./global.utils";

export const findPermissionTemplate = (
  permissionTypes: PermissionTypeModel[],
  resourceOid: string,
) => {
  return resourceOid && permissionTypes
    ? permissionTypes.find(
        (permissionType) => permissionType.oid == resourceOid,
      )?.permissionTemplate
    : null;
};

export const buildPermissionTemplateSelectOptions = (
  permissionTemplateSelectList: PermissionTemplateSelectModel[],
  loadedValues?: GenericNameDescriptionModel[],
  concatNameDescription?: boolean,
) => {
  let optionValues = [] as Item[];

  if (permissionTemplateSelectList) {
    if (
      loadedValues &&
      permissionTemplateSelectList.some(
        (permissionTemplateSelect) =>
          permissionTemplateSelect.type ==
            PermissionTemplateSelectTypeEnum.MIDPOINT ||
          permissionTemplateSelect.isTypeUserInputValid(),
      )
    ) {
      const filteredValues = permissionTemplateSelectList.some(
        (permissionTemplateSelect) =>
          permissionTemplateSelect.type ==
            PermissionTemplateSelectTypeEnum.MIDPOINT &&
          (permissionTemplateSelect as PermissionTemplateSelectMidpointModel)
            .process == SUDO_MAP,
      )
        ? getObjectsInstances<SudoCardValueModel>(loadedValues).filter(
            (sudoCard) =>
              sudoCard.localAccounts?.length > 0 ||
              !sudoCard.isUserInputAllowed,
          )
        : loadedValues;

      optionValues.push.apply(
        optionValues,
        filteredValues.map((element) =>
          buildItemSelect(
            element.name,
            element.name,
            element.description,
            concatNameDescription,
          ),
        ),
      );
    }

    optionValues.push.apply(
      optionValues,
      buildPermissionTemplateSelectItem(
        permissionTemplateSelectList,
        concatNameDescription,
      ),
    );
  }

  return sortItemsByCallback(optionValues, (item) => item.value);
};

const buildPermissionTemplateSelectItem = (
  permissionTemplateSelectList: PermissionTemplateSelectModel[],
  concatNameDescription?: boolean,
) => {
  return (
    permissionTemplateSelectList
      ?.filter(
        (permissionTemplateSelect) =>
          permissionTemplateSelect.type ==
          PermissionTemplateSelectTypeEnum.ITEM,
      )
      .map(
        (permissionTemplateSelect) =>
          permissionTemplateSelect as PermissionTemplateSelectItemModel,
      )
      .map((permissionTemplateSelectItem) =>
        buildItemSelect(
          permissionTemplateSelectItem.name,
          permissionTemplateSelectItem.name,
          permissionTemplateSelectItem.displayName,
          concatNameDescription,
        ),
      ) ?? []
  );
};

export const buildItemSelect = (
  value: string,
  label: string,
  title?: string,
  concatNameDescription?: boolean,
) => {
  let text = concatNameDescription && title ? label + " - " + title : label;
  let titleText = concatNameDescription ? text : title;
  return {
    label: <CustomTooltipAntd text={text} title={titleText} />,
    value,
  };
};

export const createServicesSearchInput = (
  permissionTemplateSelectMidpoint: PermissionTemplateSelectMidpointModel,
  portfolioOid: string,
) => {
  return JSON.stringify({
    ServicesSearchInput: {
      permissionTemplateSelectMidpoint,
      portfolioOid,
    },
  });
};

export const createServiceCreationInput = (
  permissionTemplateSelectUserInput: PermissionTemplateSelectUserInputModel,
  name: string,
  description: string,
  portfolioOid: string,
  serviceOid?: string,
) => {
  return JSON.stringify({
    ServiceCreationInput: {
      permissionTemplateSelectUserInput,
      name,
      description,
      portfolioOid,
      serviceOid,
    },
  });
};

export const getServicesResponse = (
  response: AxiosResponse<GenericNameDescriptionModel[]>,
) => {
  let data = response.data;
  return data;
};

export const getServiceResponse = (
  response: AxiosResponse<GenericNameDescriptionModel>,
) => {
  let data = response.data;
  return data;
};

export const permissionDetailsColumns: ColumnsType<PermissionDetailsModel> = [
  {
    title: "Type de ressource",
    dataIndex: "type",
    render: (text, record) => (
      <CustomTooltipAntd
        text={record.type.name}
        title={record.type.description}
      />
    ),
  },
  {
    title: "Sous-type",
    dataIndex: "subType",
    render: (text, record) => (
      <CustomTooltipAntd
        text={record.subType.name}
        title={record.subType.description}
      />
    ),
  },
  {
    title: "Sous-périmètre",
    dataIndex: "subPerimeter",
    render: (text, record) => (
      <CustomTooltipAntd
        text={record.subPerimeter.name}
        title={getNoneSpecificValueDescription(
          record.subPerimeter.name,
          record.subPerimeter.description,
          "Permission non spécifique à un sous-périmètre",
        )}
      />
    ),
  },
  {
    title: "Zone",
    dataIndex: "zone",
    render: (text, record) => (
      <CustomTooltipAntd
        text={record.zone.name}
        title={getNoneSpecificValueDescription(
          record.zone.name,
          record.zone.description,
          "Permission non spécifique à une zone",
        )}
      />
    ),
  },
  {
    title: "Environnement",
    dataIndex: "environment",
    render: (text, record) => (
      <CustomTooltipAntd
        text={record.environment.name}
        title={getNoneSpecificValueDescription(
          record.environment.name,
          record.environment.description,
          "Permission non spécifique à un environnement",
        )}
      />
    ),
  },
  {
    title: "Valeur",
    dataIndex: "value",
    render: (text, record) => (
      <CustomTooltipAntd
        text={record.value.name}
        title={record.value.description}
      />
    ),
  },
];

const getNoneSpecificValueDescription = (
  name: string,
  description: string,
  noneDescription: string,
) => {
  return name === "NULL" ? noneDescription : description;
};

export const getOmittedValuesTooltip = (omittedValues: DisplayValueType[]) => (
  <CustomTooltipAntd
    text={`+ ${omittedValues.length}...`}
    title={omittedValues.map(({ value }) => value).join(", ")}
  />
);
