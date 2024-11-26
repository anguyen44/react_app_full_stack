import styled from "styled-components";

const PermissionsCheckBoxWrapper = styled.div`
  & .MuiCheckbox-root {
    bottom: 1px;
  }

  & .MuiFormControlLabel-label {
    font-size: 14px;
  }
`;

const RotateIconPermissionsWrapper = styled.span`
  cursor: pointer;
  display: flex;
`;

const InfoRightWrapper = styled.div`
  float: right;
  display: flex;
  height: 100%;
  position: relative;
  top: 1px;
`;

const InfoIconWrapper = styled.div`
  margin: auto 1px auto 0;
  position: relative;
  bottom: 2px;
`;

export {
  PermissionsCheckBoxWrapper,
  RotateIconPermissionsWrapper,
  InfoRightWrapper,
  InfoIconWrapper,
};
