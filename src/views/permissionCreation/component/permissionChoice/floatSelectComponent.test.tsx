import { fireEvent } from "@testing-library/react";
import { render } from "test/utils";

import FloatSelect from "./floatSelect.component";

const mockedOptions = [
  { label: "Dog", value: "dog" },
  { label: "Cat", value: "cat" },
];

describe("test FloatSelect component", () => {
  test("render FloatSelect component with single value mode", () => {
    const { getByRole } = render(
      <FloatSelect options={mockedOptions} setValue={() => null} />,
    );
    // 1. find the select element and click it
    const selectElement = getByRole("combobox");
    fireEvent.click(selectElement);

    fireEvent.blur(selectElement);

    fireEvent.change(selectElement, { target: { value: "dog" } });

    fireEvent.focus(selectElement);
  });

  test("render FloatSelect component with single value mode and selected value", () => {
    render(
      <FloatSelect
        options={mockedOptions}
        optionValue={"dog"}
        setValue={() => null}
      />,
    );
  });

  test("render FloatSelect component with multi values mode", () => {
    const { getByRole } = render(
      <FloatSelect
        options={mockedOptions}
        optionValue={[]}
        setValue={() => null}
        isMulti={true}
      />,
    );
    // 1. find the select element and click it
    const selectElement = getByRole("combobox");
    fireEvent.click(selectElement);

    fireEvent.blur(selectElement);

    fireEvent.change(selectElement, { target: { value: "dog" } });

    fireEvent.focus(selectElement);
  });

  test("render FloatSelect component with multi values mode and selected values", () => {
    render(
      <FloatSelect
        options={mockedOptions}
        optionValue={["dog"]}
        setValue={() => null}
        isMulti={true}
      />,
    );
  });
});
