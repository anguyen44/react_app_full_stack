import { Container, Row } from "react-bootstrap";
import styled from "styled-components";

const LayoutBody = styled(Row)`
  padding-top: 1em;
  min-height: 84vh;
  margin-bottom: 20px;
`;

const LayoutNavigation = styled(Row)`
  padding-top: 2em;
`;

const CustomContainer = styled(Container)`
  overflow: hidden;
`;

export { CustomContainer, LayoutBody, LayoutNavigation };
