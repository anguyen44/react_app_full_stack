import { GenericModel } from "shared/model/generic.model";
import Col from "../grid/col/col.component";
import Row from "../grid/row/row.component";
import CartTableComponent, {
  CommonCartComponentProps,
} from "./cartTable.component";
import { ContainerWrapper } from "./cart.styled";

interface CartComponentProps<T extends GenericModel>
  extends CommonCartComponentProps<T> {
  children: React.ReactNode;
}

function CartComponent<T extends GenericModel>({
  children,
  ...props
}: CartComponentProps<T>) {
  return (
    <Row height="100%">
      <Col spanPercent={"40%"}>
        <ContainerWrapper>{children}</ContainerWrapper>
      </Col>
      <Col spanPercent={"60%"} sx={{ height: "100%" }}>
        <CartTableComponent {...props} />
      </Col>
    </Row>
  );
}

export default CartComponent;
