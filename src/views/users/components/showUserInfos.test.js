import { render } from "test/utils";

import ShowUserInfos from "./showUserInfos";

test("Testing ShowUserInfos component", () => {
  render(
    <ShowUserInfos
      userData={{
        oid: "00000000-0000-0000-0000-000000000002",
        nni: "administrator",
        givenName: "Administrateur",
        email: "dsi-aude-digit-infra-iam@g.enedis.fr",
        familyName: "Midpoint",
        fullName: "Administrateur Midpoint",
      }}
    />,
  );
});
