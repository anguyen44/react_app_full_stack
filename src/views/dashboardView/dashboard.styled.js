import { Container } from "react-bootstrap";
import styled from "styled-components";
import { boxShadowWrapper } from "styles/cssCustom";

const DashboardContent = styled(Container)`
  width: 100%;
  min-height: 300px;
  border-radius: 5px;
  background: #f2edf3;
  padding: 42px 25px 50px 25px;
  ${boxShadowWrapper}
  margin-bottom: 30px;
`;

export { DashboardContent };
