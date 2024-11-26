import styled from "styled-components";

const SearchWrapper = styled.div`
  & .MuiAutocomplete-root {
    width: 240px;
    padding: 0px 10px 15px 10px;
  }

  & .MuiAutocomplete-input {
    padding: 5px !important;
    font-size: 13px;
  }

  & .MuiFormLabel-root {
    font-size: 14px;
    color: #ababab;
  }
`;

export { SearchWrapper };
