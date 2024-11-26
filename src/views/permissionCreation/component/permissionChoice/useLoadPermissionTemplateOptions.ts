import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import useServiceListCallback from "shared/hooks/useServiceListCallback";
import { GenericNameDescriptionModel } from "shared/model/genericNameDescription.model";
import PermissionTemplateSelectModel from "shared/model/permissionTemplate/permissionTemplateSelect.model";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";
import PermissionTemplateSelectTypeEnum from "shared/model/permissionTemplate/permissionTemplateSelectType.enum";
import { useAppDispatch } from "shared/store";
import {
  ServiceCreateParams,
  ServicesSearchParams,
} from "shared/store/sagas/permissionTemplate.saga";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";
import { buildPermissionTemplateSelectOptions } from "shared/utils/permissionTemplate.util";
import MESSAGES from "shared/config/constants/message.config";
import PermissionTemplateSelectUserInputModel, {
  SUDO_MAP,
} from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";
import SudoCardValueModel from "shared/model/sudoCardValue.model";
import { getObjectsInstances } from "shared/utils/global.utils";

interface UseLoadPermissionTemplateOptionsProps {
  permissionTemplateSelectList: PermissionTemplateSelectModel[];
  searchServiceAction?: ActionCreatorWithPayload<ServicesSearchParams>;
  portfolioOid: string;
  setOptionValue: ActionCreatorWithPayload<string | string[]>;
  previousSelectedOptions?: string[];
  createServiceAction?: ActionCreatorWithPayload<ServiceCreateParams>;
  labelCreate?: string;
  concatNameDescription?: boolean;
}

const useLoadPermissionTemplateOptions = ({
  permissionTemplateSelectList,
  searchServiceAction,
  portfolioOid,
  setOptionValue,
  previousSelectedOptions,
  createServiceAction,
  labelCreate,
  concatNameDescription,
}: UseLoadPermissionTemplateOptionsProps) => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<Item[]>([]);

  const buildCreationLoading = (isLoading: boolean, isSuccess: boolean) => {
    return { isLoading, isSuccess };
  };
  const [isCreationLoading, setIsCreationLoading] = useState(
    buildCreationLoading(false, false),
  );

  const {
    elements,
    setElements,
    isLoading,
    setIsLoading,
    onSuccessCallback,
    onFailureCallback,
  } = useServiceListCallback<GenericNameDescriptionModel>();

  const { dispatchAlertInfo, dispatchAlertError } = useAlertCard();

  useEffect(() => {
    setElements([]);
    if (permissionTemplateSelectList?.length) {
      const permissionTemplateSelectMidpoint =
        permissionTemplateSelectList.find(
          (permissionTemplateSelect) =>
            permissionTemplateSelect.type ==
            PermissionTemplateSelectTypeEnum.MIDPOINT,
        ) as PermissionTemplateSelectMidpointModel;

      if (permissionTemplateSelectMidpoint && searchServiceAction) {
        setIsLoading(true);
        dispatch(
          searchServiceAction({
            onSuccessCallback,
            onFailureCallback,
            permissionTemplateSelectMidpoint,
            portfolioOid,
          }),
        );
      } else {
        buildOptions();
      }
    }
  }, [JSON.stringify(permissionTemplateSelectList)]);

  useEffect(() => {
    buildOptions();
  }, [elements]);

  const buildOptions = () => {
    const options = buildPermissionTemplateSelectOptions(
      permissionTemplateSelectList,
      elements,
      concatNameDescription,
    );
    setOptions(options);

    if (
      options.length == 1 &&
      !permissionTemplateSelectList.some((permissionTemplateSelect) =>
        permissionTemplateSelect.isTypeUserInputValid(),
      )
    ) {
      if (previousSelectedOptions) {
        dispatch(setOptionValue([options[0].value]));
      } else {
        dispatch(setOptionValue(options[0].value));
      }
    }
  };

  const onSuccessCreateCallback = (newElement: GenericNameDescriptionModel) => {
    dispatchAlertInfo(
      MESSAGES.ADD_PERMISSION_TEMPLATE_ELEMENT(labelCreate, newElement.name),
    );

    setElements((prevState) => {
      return [...prevState, newElement];
    });

    buildOptions();

    if (previousSelectedOptions) {
      const newSelectedOptions = [...previousSelectedOptions];
      newSelectedOptions.push(newElement.name);
      dispatch(setOptionValue(newSelectedOptions));
    } else {
      dispatch(setOptionValue(newElement.name));
    }

    setIsCreationLoading(buildCreationLoading(false, true));
  };

  const onFailureCreateCallback = () => {
    setIsCreationLoading(buildCreationLoading(false, false));
  };

  const addPermissionTemplateOption = (
    name: string,
    description: string,
    selectedElement?: GenericNameDescriptionModel,
  ) => {
    if (!createServiceAction) {
      dispatchAlertInfo(MESSAGES.UNAVAILABLE_FUNCTIONALITY);
    }

    if (!name?.length) {
      dispatchAlertError(MESSAGES.CHECK_PERMISSION_TEMPLATE_NAME_EMPTY);
    }

    if (
      elements?.some(
        (element) => element.name.toLowerCase() == name.toLowerCase(),
      ) ||
      (selectedElement &&
        permissionTemplateSelectUserInput?.process == SUDO_MAP &&
        getObjectsInstances<SudoCardValueModel>(elements).some(
          (sudoCard) =>
            sudoCard.oid == selectedElement.oid &&
            sudoCard.localAccounts?.some(
              (localAccount) =>
                localAccount.nni.toLowerCase() == name.toLowerCase(),
            ),
        ))
    ) {
      dispatchAlertError(
        MESSAGES.CHECK_PERMISSION_TEMPLATE_NAME_NOT_EXIST(labelCreate, name),
      );
    } else {
      setIsCreationLoading(buildCreationLoading(true, false));
      dispatch(
        createServiceAction({
          onSuccessCallback: onSuccessCreateCallback,
          onFailureCallback: onFailureCreateCallback,
          permissionTemplateSelectUserInput,
          name,
          description,
          portfolioOid,
          serviceOid: selectedElement?.oid,
        }),
      );
    }
  };

  const resetCreationLoading = () =>
    setIsCreationLoading(buildCreationLoading(false, false));

  const permissionTemplateSelectUserInput = useMemo(
    () =>
      permissionTemplateSelectList?.find(
        (permissionTemplateSelect) =>
          permissionTemplateSelect.type ==
          PermissionTemplateSelectTypeEnum.USER_INPUT,
      ) as PermissionTemplateSelectUserInputModel,
    [permissionTemplateSelectList],
  );

  const isCreationPossible = useMemo(
    () =>
      permissionTemplateSelectUserInput &&
      (permissionTemplateSelectUserInput.process != SUDO_MAP ||
        getObjectsInstances<SudoCardValueModel>(elements).some(
          (sudoCard) => sudoCard.isUserInputAllowed,
        )),
    [elements],
  );

  const elementsToSelect = useMemo(
    () =>
      isCreationPossible &&
      permissionTemplateSelectUserInput.process == SUDO_MAP
        ? getObjectsInstances<SudoCardValueModel>(elements).filter(
            (sudoCard) =>
              sudoCard.isUserInputAllowed && sudoCard.localAccounts.length == 0,
          )
        : null,
    [isCreationPossible],
  );

  return {
    options,
    isLoading,
    creationParams: isCreationPossible
      ? {
          addPermissionTemplateOption,
          isCreationLoading,
          resetCreationLoading,
          elementsToSelect: elementsToSelect as GenericNameDescriptionModel[],
          selectLabel:
            elementsToSelect?.length > 0 ? "Modèle de carte sudo" : null,
        }
      : null,
  };
};

type UseLoadPermissionTemplateOptions = ReturnType<
  typeof useLoadPermissionTemplateOptions
>;

export type CreationParams = UseLoadPermissionTemplateOptions["creationParams"];

export default useLoadPermissionTemplateOptions;
