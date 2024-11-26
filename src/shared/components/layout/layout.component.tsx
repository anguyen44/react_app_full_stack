import { Container, Row } from "react-bootstrap";

import Footer from "../footer/footer.component";
import Header from "../header/header.component";
import NavigationProgression from "../navigationProgression/NavigationProgression";
import { CustomContainer, LayoutBody, LayoutNavigation } from "./layout.styled";

interface LayoutComponentProps extends LayoutProps {
  activeFooter?: boolean;
}

function Layout({ children, activeFooter }: LayoutComponentProps) {
  return (
    <CustomContainer fluid>
      <Row>
        <Header />
      </Row>
      <LayoutNavigation>
        <Container>
          <Container>
            <NavigationProgression />
          </Container>
        </Container>
      </LayoutNavigation>
      <LayoutBody>
        <Container>{children}</Container>
      </LayoutBody>
      {activeFooter && (
        <Row>
          <Footer />
        </Row>
      )}
    </CustomContainer>
  );
}

export default Layout;
