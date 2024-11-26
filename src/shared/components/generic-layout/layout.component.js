import { Divider } from "@mui/material";

import { Block, Container, StyledBox, Wrap } from "./layout.styled";

const Layout = ({ header, children: content, footer }) => {
  return (
    <Container>
      <Wrap $header>
        <Block>
          <StyledBox>{header}</StyledBox>
        </Block>
      </Wrap>
      <Wrap $grow>
        <Block>
          <StyledBox>{content}</StyledBox>
        </Block>
      </Wrap>
      <Wrap $footer>
        <Divider></Divider>
        <Block>
          <StyledBox>{footer}</StyledBox>
        </Block>
      </Wrap>
    </Container>
  );
};

export default Layout;
