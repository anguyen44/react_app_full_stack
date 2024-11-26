import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

import { SearchWrapper } from "./search.styled";

export default function Search({
  options,
  selected: value,
  setSelected,
  disabled,
}) {
  const onChange = (_, newValue) => {
    setSelected(newValue);
  };

  return (
    <SearchWrapper>
      <Autocomplete
        {...{ onChange, value, options }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Oid" size="small" />
        )}
        noOptionsText={"Aucun oid"}
        disabled={disabled}
      />
    </SearchWrapper>
  );
}
