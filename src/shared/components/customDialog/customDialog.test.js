import { render } from "test/utils";

import { CustomDialog } from "./customDialog";

describe("test list of CustomDialog", () => {
  it("test CustomDialog type danger", () => {
    const { getByText } = render(
      <CustomDialog
        showDialog
        confirmNavigation={jest.fn()}
        cancelNavigation={jest.fn()}
        contentTextElement={"text"}
        titleText={"title"}
        type={"danger"}
      />,
    );

    const title = getByText("title");
    expect(title).toHaveStyle("color: #C91432");
  });
  it("test CustomDialog type success", () => {
    const { getByText } = render(
      <CustomDialog
        showDialog
        confirmNavigation={jest.fn()}
        cancelNavigation={jest.fn()}
        contentTextElement={"text"}
        titleText={"title"}
        type={"success"}
      />,
    );
    const title = getByText("title");
    expect(title).toHaveStyle("color: #10B581");
  });

  it("test CustomDialog type success without title text", () => {
    render(
      <CustomDialog
        showDialog
        confirmNavigation={jest.fn()}
        cancelNavigation={jest.fn()}
        contentTextElement={"text"}
        titleText={""}
        type={"success"}
      />,
    );
  });
});
