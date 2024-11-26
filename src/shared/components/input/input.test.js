import { fireEvent, render } from "@testing-library/react";

import { TextInput } from "./input.component";

describe("Testing list of multiple different input (text input, password input, ...)", () => {
  test("TextInput testing", () => {
    const { container } = render(
      <TextInput
        placeholder={"Rechercher par NNI ou email..."}
        onChange={jest.fn()}
        onKeyDown={jest.fn()}
      />,
    );
    const input = container.firstChild;
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
    expect(input.placeholder).toBe("Rechercher par NNI ou email...");
  });
});
