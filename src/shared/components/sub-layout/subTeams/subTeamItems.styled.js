import styled from "styled-components";

const SubMenuUl = styled.div`
  padding-left: 20px;
  padding-top: 5px;

  & li {
    margin-bottom: 5px;
    padding-left: 15px;
    border-radius: 15px 0px 0px 15px;

    &:hover {
      //   padding-left: 13px;
    }
  }

  & li:last-child {
    margin-bottom: 0;
  }
`;

export { SubMenuUl };
