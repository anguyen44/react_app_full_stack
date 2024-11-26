import { render } from "test/utils";

import ValidatorsTable from "./ValidatorsTable";

describe("testing render ValidatorsTable component", () => {
  test("rendering ValidatorsTable component", () => {
    render(
      <ValidatorsTable
        validators={[
          {
            oid: "05d07c3b-7ea8-4bdb-883b-c281a880dd7d",
            nni: "A66978",
            givenName: "VIVIEN",
            email: "vivien.duflot@enedis.fr",
            familyName: "DUFLOT",
            fullName: "VIVIEN DUFLOT",
          },
          {
            oid: "05d07c3b-7ea8-4bdb-883b-c281a880dd7s",
            nni: "A66979",
            givenName: "VIVIEN 2",
            email: "vivien2.duflot@enedis.fr",
            familyName: "DUFLOT 2",
            fullName: "VIVIEN 2 DUFLOT",
          },
        ]}
      />,
    );
  });

  test("rendering ValidatorsTable component with no data", () => {
    render(<ValidatorsTable validators={[]} />);
  });
});
