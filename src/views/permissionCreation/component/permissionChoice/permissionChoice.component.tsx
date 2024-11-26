import Form from "antd/es/form";
import { memo } from "react";
import { AddButton } from "shared/components/CustomButtons/CustomButtons";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import {
  createSubPerimeterAction,
  createSudoCardValueAction,
  getEnvironmentsAction,
  getPermissionGenerationAction,
  getSubPerimetersAction,
  getSudoCardValuesAction,
  getZonesAction,
} from "shared/store/sagas/permissionTemplate.saga";
import {
  selectPermissionTemplateItem,
  selectResourceTypeOptions,
  selectSubTypeOptions,
} from "shared/store/selectors/selectCriteriaOptions.selector";
import {
  setEnvironments,
  setResourceType,
  setSubPerimeter,
  setSubType,
  setValues,
  setZones,
} from "shared/store/slices/permissionCreation/permissionCreation.slice";

import PermissionsGenerationTable from "../permissionsGenerationTable/permissionsGenerationTable.component";
import { useAppDispatch, useAppSelector } from "shared/store";
import PermissionTemplateSelectComponent from "./permissionTemplateSelect.component";
import useLoadPermissionTemplateOptions from "./useLoadPermissionTemplateOptions";
import PortfolioModel from "shared/model/portfolio.model";
import PermissionTemplateSelectUserInputModel, {
  SUDO_MAP,
} from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";

interface PermissionChoiceComponentProps {
  portfolio: PortfolioModel;
}

const PermissionChoiceComponent = ({
  portfolio,
}: PermissionChoiceComponentProps) => {
  const dispatch = useAppDispatch();

  const {
    resourceTypeOid,
    subType,
    subPerimeter,
    environments,
    zones,
    values,
    isFetchingPermissionTemplate,
  } = useAppSelector((state) => state.permissionCreationReducer);
  const resourcesTypeOption = useAppSelector(selectResourceTypeOptions());
  const subTypeOptions = useAppSelector(selectSubTypeOptions());
  const permissionTemplateItem = useAppSelector(selectPermissionTemplateItem());

  const portfolioOid = portfolio?.oid;

  const {
    options: subPerimeterOptions,
    isLoading: isLoadingSubPerimeters,
    creationParams: creationParamsSubPerimeter,
  } = useLoadPermissionTemplateOptions({
    permissionTemplateSelectList: permissionTemplateItem?.sousPerim,
    searchServiceAction: getSubPerimetersAction,
    portfolioOid,
    setOptionValue: setSubPerimeter,
    createServiceAction: createSubPerimeterAction,
    labelCreate: "Le sous-périmètre",
    concatNameDescription: true,
  });

  const { options: zonesOptions, isLoading: isLoadingZones } =
    useLoadPermissionTemplateOptions({
      permissionTemplateSelectList: permissionTemplateItem?.zone,
      searchServiceAction: getZonesAction,
      portfolioOid,
      setOptionValue: setZones,
      previousSelectedOptions: zones,
    });

  const { options: environmentsOptions, isLoading: isLoadingEnvironments } =
    useLoadPermissionTemplateOptions({
      permissionTemplateSelectList: permissionTemplateItem?.env,
      searchServiceAction: getEnvironmentsAction,
      portfolioOid,
      setOptionValue: setEnvironments,
      previousSelectedOptions: environments,
    });

  const {
    options: valuesOptions,
    isLoading: isLoadingValues,
    creationParams: creationParamsValues,
  } = useLoadPermissionTemplateOptions({
    permissionTemplateSelectList: permissionTemplateItem?.val,
    searchServiceAction: getSudoCardValuesAction,
    portfolioOid,
    setOptionValue: setValues,
    previousSelectedOptions: values,
    createServiceAction: createSudoCardValueAction,
    labelCreate: "Le compte local",
  });

  const onSubmitFilter = () => {
    dispatch(
      getPermissionGenerationAction({
        portfolioOid: portfolio?.oid,
        portfolioName: portfolio?.name,
        resourceTypeOid,
        subType: subType,
        subPerimeter,
        environments,
        zones,
        values,
      }),
    );
  };

  const isEligibleForFilter = [
    portfolio?.name,
    resourceTypeOid,
    subType,
    subPerimeter || !permissionTemplateItem?.sousPerim?.length,
    environments?.length || !permissionTemplateItem?.env?.length,
    zones?.length || !permissionTemplateItem?.zone?.length,
    values?.length || !permissionTemplateItem?.val?.length,
  ].every(Boolean);

  return (
    <>
      <Form size="large" className="permission-creation-form" layout="vertical">
        <Row>
          <Col spanPercent={"34%"} sx={{ paddingRight: "10px" }}>
            <PermissionTemplateSelectComponent
              label="Type de ressource"
              optionValue={resourceTypeOid}
              setValue={setResourceType}
              options={resourcesTypeOption}
              fetching={isFetchingPermissionTemplate}
              disabled={false}
            />
          </Col>
          <Col spanPercent={"33%"} sx={{ paddingRight: "10px" }}>
            <PermissionTemplateSelectComponent
              label="Sous-type"
              optionValue={subType}
              setValue={setSubType}
              disabled={!resourceTypeOid}
              options={subTypeOptions}
            />
          </Col>
          <Col spanPercent={"33%"}>
            <PermissionTemplateSelectComponent
              label="Sous-périmètre"
              optionValue={subPerimeter}
              setValue={setSubPerimeter}
              fetching={isLoadingSubPerimeters}
              options={subPerimeterOptions}
              permissionTemplateSelectList={permissionTemplateItem?.sousPerim}
              portfolioFullName={portfolio?.getFullName()}
              creationParams={creationParamsSubPerimeter}
            />
          </Col>
        </Row>
        <Row>
          <Col spanPercent={"30%"} sx={{ paddingRight: "10px" }}>
            <PermissionTemplateSelectComponent
              label="Zone"
              optionValue={zones}
              setValue={setZones}
              fetching={isLoadingZones}
              options={zonesOptions}
              permissionTemplateSelectList={permissionTemplateItem?.zone}
              portfolioFullName={portfolio?.getFullName()}
              isMulti
            />
          </Col>
          <Col spanPercent={"30%"} sx={{ paddingRight: "10px" }}>
            <PermissionTemplateSelectComponent
              label="Environnement"
              optionValue={environments}
              setValue={setEnvironments}
              options={environmentsOptions}
              fetching={isLoadingEnvironments}
              permissionTemplateSelectList={permissionTemplateItem?.env}
              portfolioFullName={portfolio?.getFullName()}
              isMulti
            />
          </Col>
          <Col spanPercent={"30%"} sx={{ paddingRight: "10px" }}>
            <PermissionTemplateSelectComponent
              label="Valeur"
              optionValue={values}
              setValue={setValues}
              options={valuesOptions}
              fetching={isLoadingValues}
              permissionTemplateSelectList={permissionTemplateItem?.val}
              portfolioFullName={portfolio?.getFullName()}
              creationParams={creationParamsValues}
              prefixName={
                portfolio?.name &&
                permissionTemplateItem?.val.some(
                  (val) =>
                    val.isTypeUserInputValid() &&
                    (val as PermissionTemplateSelectUserInputModel).process ==
                      SUDO_MAP,
                )
                  ? `${portfolio.name}-`
                  : null
              }
              isMulti
              isFemaleLabel
            />
          </Col>
          <Col spanPercent={"10%"}>
            <AddButton
              sx={{ width: "100%" }}
              variant="contained"
              disabled={!isEligibleForFilter}
              onClick={onSubmitFilter}
              data-testid="filterButton"
            >
              Filtrer
            </AddButton>
          </Col>
        </Row>
      </Form>

      {/* Data of permissions */}
      <PermissionsGenerationTable />
      {/* Data of permissions _ END*/}
    </>
  );
};

export default memo(PermissionChoiceComponent);
