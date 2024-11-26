import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import NavigationItems from "./navigationItems";

const mockData = [
  {
    displayName: "Dashboard",
    url: "/dashboard",
  },
  {
    displayName: "Équipes",
    url: "/teams",
  },
  {
    displayName: "DIGIT - IAM",
    url: "/teams/e5681c41-a6a3-48d7-bfcb-549494da7f1a",
  },
  {
    displayName: "Administrateurs CACCIA",
    url: "/teams/e827cc0c-efac-46ce-9392-3a0dac5185e8",
  },
];

describe("list of tests on NavigationItems component", () => {
  test("render NavigationItems with mock data", () => {
    render(<NavigationItems paths={mockData} />);

    const clickableNavigationItems = screen.getAllByLabelText(
      "clickableNavigationItem",
    );
    fireEvent.click(clickableNavigationItems[0]);
  });
});
