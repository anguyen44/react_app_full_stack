import styled from "styled-components";

const WrapperCircularProgress = styled.div<{ padding?: string }>`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100%;
  ${({ padding }) => padding && `padding: ${padding}`};

  & svg {
    margin: auto;
  }
`;

const LoadingWrapperCustom = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.palette.enedis.grey["600"]};
`;

export { LoadingWrapperCustom, WrapperCircularProgress };
