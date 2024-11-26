import { render } from "test/utils";

import SubLayout from "./subLayout.component";
import { team_mock_data } from "./teams/teamItems/teamItems.test";

test("test subLayout rendering correctly", () => {
  render(<SubLayout teams={team_mock_data}>Text</SubLayout>);
});

test("test subLayout rendering correctly without teams props data", () => {
  render(<SubLayout teams={[]}>Text</SubLayout>);
});
