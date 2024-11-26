import PortfolioModel from "shared/model/portfolio.model";
import { mockUser } from "./mockUser.utils";

export const mockPortfolio = new PortfolioModel(
  "ae7ecc31-c635-4d25-ac9d-d1c75ae69f66",
  "D0R",
  "DOORS",
  "Description DOORS",
  mockUser,
  true,
  false,
);
