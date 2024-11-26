import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

const CustomTitle = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e0e0e0;
  height: 50px;
  align-items: center;
  display: flex;
`;

interface CustomRowComponentProps {
  text: string;
  value: any;
}

const CustomRowComponent = ({ text, value }: CustomRowComponentProps) => (
  <Row data-testid={text}>
    <CustomColText>{text}</CustomColText>
    <CustomColValue>{value}</CustomColValue>
  </Row>
);

const CustomColText = styled(Col)`
  text-align: left;
  font-weight: 600;
  width: 50%;
`;

const CustomColValue = styled(Col)`
  text-align: left;
`;

export { CustomTitle, CustomRowComponent };
