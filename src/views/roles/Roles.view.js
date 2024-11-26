import { Container } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import Layout from "shared/components/layout/layout.component";

import RolesGestion from "./component/rolesGestion/rolesGestion.component";

function RolesView(props) {
  const { roleOid } = useParams();
  const condition = roleOid ? true : false;

  return (
    <Layout history={props.history}>
      {condition ? (
        <Outlet />
      ) : (
        <Container>
          <RolesGestion />
        </Container>
      )}
    </Layout>
  );
}

export default RolesView;
