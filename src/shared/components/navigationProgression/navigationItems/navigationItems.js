import { useNavigate } from "react-router-dom";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import styled from "styled-components";

const NavigationItemText = styled.div`
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
  padding: 0px 6px 0px 6px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PrimaryColorText = styled.span`
  color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
`;

const PaddingLeftBy6Text = styled.div`
  padding-left: 6px;
`;

const NavigationItems = ({ paths }) => {
  const navigate = useNavigate();

  const navigateByUrl = (url) => {
    navigate(url);
  };
  return (
    <>
      {paths.length > 0 && (
        <Row>
          {paths.map((item, index) => {
            if (index === paths.length - 1) {
              return (
                <Col key={index}>
                  <PaddingLeftBy6Text>{item.displayName}</PaddingLeftBy6Text>
                </Col>
              );
            }
            return (
              <Col key={index}>
                <Row>
                  <Col>
                    <NavigationItemText
                      onClick={() => navigateByUrl(item.url)}
                      aria-label="clickableNavigationItem"
                    >
                      {item.displayName}
                    </NavigationItemText>
                  </Col>
                  <Col>
                    <PrimaryColorText>{">"}</PrimaryColorText>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default NavigationItems;
