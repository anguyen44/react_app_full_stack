import { TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  AddButton,
  CancelButton,
} from "shared/components/CustomButtons/CustomButtons";
import Row from "shared/components/grid/row/row.component";
import Modal from "shared/components/modal/modal.component";
import { useModal } from "shared/hooks/useModal";
import PermissionTemplateSelectUserInputModel, {
  INS_ASSIGNMENT_PROCESS,
} from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";
import {
  FormControlWrapper,
  IconTitleCirclePlus,
  IconTitlePlugCirclePlus,
  IconTitleWrapper,
  LoadingWrapper,
  ModalTitleWrapper,
  TextTitleWrapper,
} from "./permissionTemplateItemCreationModal.component.styled";
import { CreationParams } from "./useLoadPermissionTemplateOptions";
import LoadingComponent from "shared/components/loading/Loading.component";
import FloatSelect from "./floatSelect.component";
import CustomTooltipAntd from "shared/components/customTooltipAntd/customTooltipAntd";

interface PermissionTemplateItemCreationModalComponentProps {
  userInputTemplate: PermissionTemplateSelectUserInputModel;
  portfolioFullName: string;
  modalProps: ReturnType<typeof useModal>;
  creationParams: CreationParams;
  itemLabel: string;
  initNameValue: string;
  prefixName?: string;
}

function PermissionTemplateItemCreationModalComponent({
  userInputTemplate,
  portfolioFullName,
  modalProps,
  creationParams,
  itemLabel,
  initNameValue,
  prefixName,
}: PermissionTemplateItemCreationModalComponentProps) {
  const { showModal, onCloseModal } = modalProps;

  const [name, setName] = useState(initNameValue);
  const [selectedElementName, setSelectedElementName] = useState<string>(null);
  const [description, setDescription] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    if (showModal) {
      setIsDropDownOpen(true);
    }
    return () => {
      if (showModal) {
        buildName("", true);
        setSelectedElementName(null);
        setDescription("");
        setIsDropDownOpen(false);
      }
    };
  }, [showModal]);

  useEffect(() => {
    buildName(initNameValue, true);
  }, [initNameValue]);

  useEffect(() => {
    if (creationParams.isCreationLoading.isSuccess) {
      modalProps.onCloseModal();
      creationParams.resetCreationLoading();
    }
  }, [creationParams.isCreationLoading]);

  const buildName = (nameValue: string, isInit?: boolean) => {
    let builtName = "";
    if (prefixName) {
      if (!isInit && nameValue.length < prefixName.length) {
        setName(prefixName);
        return;
      } else if (!nameValue.startsWith(prefixName)) {
        builtName = prefixName;
      }
    }
    builtName += nameValue;
    setName(builtName);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    buildName(e.target.value);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const isNameValid =
    name.length > 0 &&
    userInputTemplate.validator &&
    new RegExp(userInputTemplate.validator).test(name);

  const isSelectValid =
    !(creationParams.elementsToSelect?.length > 0) ||
    selectedElementName?.length > 0;

  const handleAddClick = () => {
    if (!creationParams.isCreationLoading.isLoading) {
      creationParams.addPermissionTemplateOption(
        name,
        description,
        creationParams.elementsToSelect?.find(
          (element) => element.name == selectedElementName,
        ),
      );
    }
  };

  const isInsAssignmentProcess =
    userInputTemplate.process == INS_ASSIGNMENT_PROCESS;

  const modalTitle = (
    <>
      <IconTitleWrapper>
        {isInsAssignmentProcess ? (
          <IconTitlePlugCirclePlus />
        ) : (
          <IconTitleCirclePlus />
        )}
      </IconTitleWrapper>
      <TextTitleWrapper>
        {isInsAssignmentProcess
          ? `Lien avec la ressource ${portfolioFullName}`
          : `Ajout d'${itemLabel}`}
      </TextTitleWrapper>
    </>
  );

  const handleCancel = () => {
    if (!creationParams.isCreationLoading.isLoading) {
      onCloseModal();
    }
  };

  const marginFirstElement = "10px 10px 15px 10px";
  const marginNextElement = "35px 10px 15px 10px";
  const hasSelectElement = creationParams.elementsToSelect?.length > 0;
  const inputLabelProps = {
    style: {
      fontSize: 14,
      color: "grey",
      fontFamily: "inherit",
      opacity: 0.8,
    },
  };

  const elementsToSelectOptions = useMemo(
    () =>
      creationParams.elementsToSelect?.map((element) => ({
        label: (
          <CustomTooltipAntd text={element.name} title={element.description} />
        ),
        value: element.name,
      })),
    [creationParams.elementsToSelect],
  );

  return (
    <Modal
      visible={showModal}
      onCancel={handleCancel}
      title={<ModalTitleWrapper>{modalTitle}</ModalTitleWrapper>}
      width={400}
      headerDivider
      footer={
        <div className="addButton">
          <AddButton
            variant="contained"
            onClick={handleAddClick}
            disabled={!isNameValid || !isSelectValid}
            sx={{ width: "30%" }}
          >
            {creationParams.isCreationLoading.isLoading && (
              <LoadingWrapper>
                <LoadingComponent />
              </LoadingWrapper>
            )}
            Ajouter
          </AddButton>
          <CancelButton
            variant="contained"
            onClick={handleCancel}
            sx={{ width: "30%", marginLeft: "10px" }}
            disabled={creationParams.isCreationLoading.isLoading}
          >
            Annuler
          </CancelButton>
        </div>
      }
      top={"25%"}
    >
      <>
        {hasSelectElement && (
          <Row margin={marginFirstElement}>
            <FormControlWrapper>
              <FloatSelect
                label={creationParams.selectLabel}
                options={elementsToSelectOptions}
                optionValue={selectedElementName}
                setValue={(value) => setSelectedElementName(value as string)}
                disabled={creationParams.isCreationLoading.isLoading}
                open={isDropDownOpen}
                onDropdownVisibleChange={setIsDropDownOpen}
                required
                autoFocus
              />
            </FormControlWrapper>
          </Row>
        )}
        <Row margin={hasSelectElement ? marginNextElement : marginFirstElement}>
          <FormControlWrapper isRequired>
            <TextField
              label={userInputTemplate.affichage ?? "Nom"}
              variant="outlined"
              value={name}
              onChange={handleChangeName}
              helperText={
                userInputTemplate.placeholder
                  ? `Format : ${userInputTemplate.placeholder}`
                  : undefined
              }
              required
              inputProps={{
                maxLength: 50,
                autoFocus: !hasSelectElement,
              }}
              InputLabelProps={inputLabelProps}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length,
                )
              }
              size="small"
              maxRows={1}
              error={!isNameValid}
              disabled={creationParams.isCreationLoading.isLoading}
            />
          </FormControlWrapper>
        </Row>
        <Row margin="10px 10px -10px 10px">
          <FormControlWrapper>
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={handleChangeDescription}
              multiline
              minRows={2}
              maxRows={4}
              inputProps={{ maxLength: 255 }}
              InputLabelProps={inputLabelProps}
              disabled={creationParams.isCreationLoading.isLoading}
            />
          </FormControlWrapper>
        </Row>
      </>
    </Modal>
  );
}

export default PermissionTemplateItemCreationModalComponent;
