import { css } from "styled-components";

const utilsCss = css`
  .pl-0 {
    padding-left: 0px;
  }

  .pl-15 {
    padding-left: 15px;
  }

  .ml-3 {
    margin-left: 3px;
  }

  .mt-15 {
    margin-top: 15px;
  }

  .mt-40 {
    margin-top: 40px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .df {
    display: flex;
    flex-direction: column;
  }

  .df-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .colr-red {
    color: ${({ theme }) => theme.palette.enedis.secondary.red["400"]};
  }
`;

export default utilsCss;
