import "jest-styled-components";

import { screen } from "@testing-library/react";
import { render } from "test/utils";

import LegalMentionView from "./LegalMention.view";

describe("group of tests of legal mention view component", () => {
  test("test of rendering legal mention view component", () => {
    render(<LegalMentionView />);

    const pageTitle = screen.getByText("Mentions légales du site");
    expect(pageTitle).toHaveStyleRule("font-size", "1.25rem");
  });
});
