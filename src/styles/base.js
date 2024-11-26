import { css } from "styled-components";

import { floatingInput } from "./cssCustom";

const basesCss = css`
  body {
    font-family: "PublicSans", "Arial", sans-serif;
    color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
  }

  a {
    text-decoration: none;
  }

  .outer-image-area {
    padding-left: 0;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    justify-content: center;
    align-items: flex-start;
    padding-right: 0;
  }

  .dropdown-toggle::after {
    display: none;
  }

  .input-text {
    position: relative;
    margin-bottom: 5px;
  }

  nav > li > a:focus,
  .nav > li > a:hover {
    font-weight: bold;
  }

  // Gestion des Icones
  .deleteIcon {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    height: 15px;
    width: 15px;
  }

  .reloadIcon {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.enedis.grey["50"]};
    height: 15px;
    width: 15px;
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};
    border-radius: 7px;
  }

  // infos section of page
  .description {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .editTitle {
      span {
        font-weight: 600;
        color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
        font-family: ${({ theme }) => theme.typography.fontFamily};
      }

      svg {
        float: right;
        margin-bottom: 2px;
        cursor: pointer;
      }
    }
  }

  // operations section
  .operationsSectionWrapper {
    height: auto;
    padding: 0.7em 1em;
    margin-bottom: 1.5em;
    border-radius: 5px;
    border: 2px solid #f0f0f0;
  }

  .operationsSectionBody {
    border-radius: 5px;
  }

  .operationsSectionTitle {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme: { palette } }) => palette.enedis.grey["800"]};
  }

  .operationsSectionContent {
    a {
      margin-right: 5px;
      margin-top: 5px;
    }
  }

  // actions Section in table
  .confimDeleteWrapper {
    border-radius: 5px;
    background-color: white;
    height: 25px;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.5);
    transition: display 5s ease;

    .actionIcon {
      color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
      cursor: pointer;
      height: 100%;
    }

    .checkIcon {
      margin-right: 8px;

      &:hover {
        color: ${({ theme }) => theme.palette.enedis.secondary.green["400"]};
      }
    }

    .xIcon {
      &:hover {
        color: ${({ theme }) => theme.palette.enedis.secondary.red["400"]};
      }

      font-size: 11px;
    }
  }

  .icon-person-fill {
    vertical-align: top;
  }
  .trashIconWrapper {
    height: 25px;

    &:hover > svg {
      color: ${({ theme }) => theme.palette.enedis.secondary.red["400"]};
    }
  }

  .deletingStatusRow {
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.red["400"]};
    transition: background-color 2s ease;
  }

  .validateStatusRow {
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.green["400"]};
    transition: background-color 2s ease;
  }

  //inner components style in a modal
  .addButton {
    text-align: center;
    margin-top: 20px;
    color: #f7fbff;
  }

  .input {
    height: 50px;
    box-sizing: border-box;
    padding-left: 1.5rem;
  }

  //form styles
  .formWrapper {
    padding: 0.5em;
    border-radius: 5px;
    width: 100%;
    border: 1.5px solid #e9e9e9;
    line-height: 26px;
    font-size: 13.5px;

    &:focus,
    &:hover {
      outline: none;
      box-shadow: 0px 0px 1px #bebebe;
      transition: 0.15s;
    }
  }

  .formWrapperPosition {
    position: relative;
  }

  .searchIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  //searchedItemsSlide

  .activeSlide {
    max-height: 200px;
    transition: max-height 0.25s ease-in;
    background: white;
    min-height: auto;
    box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 20%);
    margin-top: 5px;
    position: absolute;
    width: 96%;
    z-index: 3;
    overflow-y: auto;
    scrollbar-color: #D9D9D9#f5f5f5;
    scrollbar-width: thin;
    scroll-behavior: smooth;
  }

  .nonActiveSlide {
    max-height: 0;
    transition: max-height 0.8s ease-out;
    overflow: hidden;
  }

  /*Styles of gestion table sharing between cases gestion and role gestion pages*/
  .gestionTableConfirm {
    border-radius: 5px;
    background-color: white;

    span {
      font-size: 10px;
    }

    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.5);
    transition: display 5s ease;
    padding: 2px;
  }

  .gestionTableActionIcon {
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    font-size: 18px;
    cursor: pointer;
    margin: 5px;
  }

  .gestionTableDeleteIcon {
    transition: all 0.4s ease-in;

    &:hover {
      color: #c91432;
    }
  }

  .gestionTableCheckIcon:hover {
    color: ${({ theme }) => theme.palette.enedis.secondary.green["400"]};
  }

  .gestionTableTitle {
    color: ${({ theme }) => theme.palette.enedis.secondary.blue["500"]};
    font-weight: 700;
    font-size: 14px;
    margin-left: 5px;
    margin-right: 10px;
    font-family:
      Roboto,
      Helvetica Neue,
      sans-serif;
    overflow-wrap: break-word;
    max-width: 31%;
    margin-bottom: 15px;
  }

  .containerHeader {
    font-weight: 700;
    padding: 5px 10px;
    font-size: 14px;
    margin-bottom: 0px;
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["500"]};
    color: ${({ theme: { palette } }) => palette.enedis.grey["50"]};
  }

  img {
    width: 100%;
    height: 100%;
  }

  .activeModal {
    overflow-y: hidden;
  }

  .validatedMenuItemLi {
    background-color: ${({ theme }) =>
      theme.palette.enedis.secondary.blue["600"]};
    transition: 0.4s;
  }

  ${floatingInput}
`;

export default basesCss;
