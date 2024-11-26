import * as ServicesStyleMui from "@mui/material/styles";
import { fireEvent, render } from "@testing-library/react";

import TablePaginationActions from "./tablePaginationActions";

jest.mock("@mui/material/styles", () => {
  return {
    useTheme: jest.fn().mockReturnValue(jest.fn()), //define mock function of jest for useTheme()
    createTheme: jest.fn(),
  };
});

describe("Test pagination of a table", () => {
  test("Testing tablePagniationActions component pagination at the first page in the beginning", () => {
    //must set jest.spyOn inside of the test
    jest.spyOn(ServicesStyleMui, "useTheme").mockImplementation(() => {
      return { direction: "rtl" };
    });
    const { getByLabelText } = render(
      <TablePaginationActions
        count={10}
        page={0}
        rowsPerPage={5}
        onPageChange={jest.fn()}
      />
    );
    const lastPageButton = getByLabelText("last page");
    fireEvent.click(lastPageButton);

    const nextPageButton = getByLabelText("next page");
    fireEvent.click(nextPageButton);
  });

  test("Testing tablePagniationActions component pagination at the last page in the beginning", () => {
    jest.spyOn(ServicesStyleMui, "useTheme").mockImplementation(() => {
      return { direction: "abc" };
    });
    const { getByLabelText } = render(
      <TablePaginationActions
        count={10}
        page={1}
        rowsPerPage={5}
        onPageChange={jest.fn()}
      />
    );

    const firstPageButton = getByLabelText("first page");
    fireEvent.click(firstPageButton);

    const previousPageButton = getByLabelText("previous page");
    fireEvent.click(previousPageButton);
  });
});
