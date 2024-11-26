import TabsComponent from "shared/components/tabs/Tabs.component";
import { initState } from "shared/store/slices/permissionCreation/permissionCreation.slice";

import PermissionChoiceComponent from "./component/permissionChoice/permissionChoice.component";
import PermissionsInCardTable from "./component/permissionsInCardTable/permissionsInCardTable.component";
import { useEffect } from "react";
import Layout from "shared/components/layout/layout.component";
import { useAppDispatch, useAppSelector } from "shared/store";
import { getRoleByOidAction } from "shared/store/sagas/role.saga";
import { useParams } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import { CustomPaper } from "shared/components/CustomPaper/CustomPaper";
import {
  CardNumberWrapper,
  CardTabWrapper,
  CardTitleWrapper,
  InfosWrapper,
  ResourceIcon,
  ResourceLabelWrapper,
  RoleIcon,
  TabsWrapper,
} from "./permissionCreationView.styled";
import CustomLabel from "shared/components/customLabel/customLabel.component";
import Skeleton from "@mui/material/Skeleton";
import useAlertDialogCurrentEdit from "shared/store/slices/globalUi/useAlertDialogCurrentEdit";
import { getPermissionTemplateAction } from "shared/store/sagas/permissionTemplate.saga";

function PermissionCreationView(props: ViewProps) {
  const dispatch = useAppDispatch();

  const roleInfos = useAppSelector((state) => state.rolePageReducer.baseInfo);
  const isFetching = useAppSelector(
    (state) => state.rolePageReducer.isFetching,
  );

  const { roleOid } = useParams();

  const portfolio = roleInfos?.portfolio;
  const portfolioOid = portfolio?.oid;

  const { permissionsPosibilitiesInCart, isFetchingPermissionCreationApi } =
    useAppSelector((state) => state.permissionCreationReducer);

  useAlertDialogCurrentEdit({
    isChangingInfo:
      permissionsPosibilitiesInCart &&
      permissionsPosibilitiesInCart.length > 0 &&
      !isFetchingPermissionCreationApi,
    title: "Permissions non enregistrées",
    description: (
      <>
        Les permissions ajoutées en panier n'ont pas été soumises à une demande.
        <br />
        Êtes-vous sûr de vouloir quitter cette page ?
      </>
    ),
  });

  useEffect(() => {
    if (roleOid && (!roleInfos || roleInfos.oid !== roleOid)) {
      dispatch(getRoleByOidAction({ roleOid }));
    }
    return () => {
      dispatch(initState());
    };
  }, []);

  //fetching permission templates by an action in redux-saga
  useEffect(() => {
    if (portfolio?.name) {
      dispatch(getPermissionTemplateAction(portfolio.name));
    }
  }, [portfolio?.name]);

  const cardTabComponent = (
    <CardTabWrapper>
      <CardTitleWrapper>Mon panier</CardTitleWrapper>
      {permissionsPosibilitiesInCart?.length > 0 && (
        <CardNumberWrapper>
          {permissionsPosibilitiesInCart.length}
        </CardNumberWrapper>
      )}
    </CardTabWrapper>
  );

  return (
    <Layout history={props.history}>
      {isFetching ? (
        <Skeleton
          variant="rounded"
          height={"75%"}
          width={"75%"}
          sx={{ margin: "auto" }}
        />
      ) : (
        <Container>
          <CustomPaper>
            <InfosWrapper>
              <Col>
                <CustomLabel
                  label={
                    <ResourceLabelWrapper>
                      <RoleIcon />
                      Rôle
                    </ResourceLabelWrapper>
                  }
                >
                  {roleInfos?.displayName}
                </CustomLabel>
              </Col>
              <Col>
                <CustomLabel
                  label={
                    <ResourceLabelWrapper>
                      <ResourceIcon />
                      Ressource
                    </ResourceLabelWrapper>
                  }
                >
                  {roleInfos?.portfolio?.getFullName()}
                </CustomLabel>
              </Col>
            </InfosWrapper>
            <TabsWrapper>
              <TabsComponent
                title={["Choix de permissions", cardTabComponent]}
                content={[
                  <div key="1">
                    <PermissionChoiceComponent {...{ portfolio }} />
                  </div>,

                  <div key="2">
                    <PermissionsInCardTable {...{ portfolioOid }} />
                  </div>,
                ]}
                tabPanelHeight={"80vh"}
              />
            </TabsWrapper>
          </CustomPaper>
        </Container>
      )}
    </Layout>
  );
}

export default PermissionCreationView;
