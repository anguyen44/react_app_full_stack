import { css } from "styled-components";

const boxShadowWrapper = css`
  border: 1px solid #e5e5e5;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  border-bottom: 0;
`;

const contentWidthMargin = css`
  width: 48%;
  margin: 0 auto;
`;

const floatingInput = css`
  .float-label {
    position: relative;
  }

  .label {
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 12px;
    top: 8px;
    transition: 0.2s ease all;
  }

  .as-placeholder {
    color: #bfc5c9;
  }

  .as-label {
    top: -13px;
    font-size: 12px;
    background: white;
    padding: 0 4px;
    margin-left: -4px;
    color: gray;
    font-weight: 500;
  }

  .ant-select .ant-select-selector {
    padding: 5px 10px 4px 11px;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 39px;
  }

  .ant-select .ant-select-arrow {
    top: 20px;
    right: 10px;
  }

  .ant-select .ant-select-clear {
    top: 20px;
    right: 10px;
  }

  .ant-table
    .ant-table-container
    .ant-table-header
    table
    thead.ant-table-thead
    .ant-table-cell {
    background: #bfbfbf;
  }

  .float-label
    .ant-select.ant-select-outlined:not(.ant-select-customize-input):not(
      .ant-select-disabled
    )
    .ant-select-selector {
    border: 1px solid #4096ff;

    .ant-select-selection-item span {
      cursor: help;
    }
  }

  .table-row-light {
    background-color: #d9f7be;
    opacity: 0.8;

    .ant-table-cell-row-hover {
      background: #d9f7be !important;
    }
  }
`;

export { boxShadowWrapper, contentWidthMargin, floatingInput };
