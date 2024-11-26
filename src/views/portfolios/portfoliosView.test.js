import { act } from "@testing-library/react";
import PortfolioModel from "shared/model/portfolio.model";
import PortfolioService from "shared/services/portfolio/portfolio.service";
import { render } from "test/utils";

import PortfoliosView from "./portfolios.view";

const mockAxios = jest.genMockFromModule("axios");
mockAxios.create = jest.fn(() => mockAxios);

jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

jest.mock("../../shared/services/portfolio/portfolio.service", () => {
  return {
    getPortfolios: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/teams",
  }),
}));

const mockData = [
  new PortfolioModel(
    "b573821a-2602-43fe-84ba-e8b2afd4b2c9",
    "6YN",
    "CACCIA",
    null,
    null,
    null,
    false,
  ),
  new PortfolioModel(
    "75296e99-216c-4498-8cd0-15b1cae1dc5b",
    "D0R",
    "THE DOORS",
    null,
    null,
    null,
    false,
  ),
];

describe("Testing Portfolios view service", () => {
  beforeEach(() => {
    PortfolioService.getPortfolios.mockResolvedValue([...mockData]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Testing PortfoliosView component", async () => {
    await act(async () => render(<PortfoliosView />));
  });
});
