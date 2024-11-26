import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";
import PortfolioItemComponent from "./portfolioItem.component";
import { RootState } from "shared/store";
import { mockPortfolio } from "test/mocks/mockPortfolio.utils";
import { PortfolioPageReducer } from "shared/store/slices/portfolioPage/portfolioPage.slice";

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

const data = {
  store: {
    portfolioPageReducer: {
      portfolioInfos: mockPortfolio,
      isLoadingPage: false,
      readOnly: false,
      isWriting: true,
    } as PortfolioPageReducer,
    userReducer: userReducerData as any,
  } as RootState,
};

describe("Testing PortfolioItemComponent", () => {
  test("Test display PortfolioItemComponent", async () => {
    render(<PortfolioItemComponent />, null, data);
  });
});
