import { Container } from "react-bootstrap";
import Layout from "../layout/layout.component";
import {
  SubLayoutChildren,
  SubLayoutWrapper,
  SubMenu,
} from "./subLayout.styled";

function SubLayout({
  elements,
  history,
  children,
}: LayoutWithElementsProps<React.ReactNode>) {
  return (
    <Layout history={history}>
      <Container>
        <SubLayoutWrapper>
          {elements && (
            <SubMenu>
              <nav>
                <ul>{elements}</ul>
              </nav>
            </SubMenu>
          )}
          <SubLayoutChildren>{children}</SubLayoutChildren>
        </SubLayoutWrapper>
      </Container>
    </Layout>
  );
}

export default SubLayout;
