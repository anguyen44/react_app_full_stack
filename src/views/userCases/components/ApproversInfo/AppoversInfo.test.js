fireEvent;
import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import AppoversInfo from "./AppoversInfo.component";

const approverData = [
  {
    oid: "05d07c3b-7ea8-4bdb-883b-c281a880dd7d",
    nni: "A66978",
    givenName: "VIVIEN",
    email: "vivien.duflot@enedis.fr",
    familyName: "DUFLOT",
    fullName: "VIVIEN DUFLOT",
  },
];

const approversData = [
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
];

describe("render AppoversInfo component", () => {
  test("testing render AppoversInfo with readable mode", () => {
    render(
      <AppoversInfo
        approvers={[...approverData]}
        action={jest.fn()}
        readableMode={false}
      />,
    );

    const approver = screen.getByLabelText("approver");
    fireEvent.click(approver);
  });

  test("testing render AppoversInfo with readable mode and multiple approvers", () => {
    render(
      <AppoversInfo
        approvers={[...approversData]}
        action={jest.fn()}
        readableMode={false}
      />,
    );
  });

  test("testing render AppoversInfo with not readable mode", () => {
    render(
      <AppoversInfo
        approvers={[...approverData]}
        action={jest.fn()}
        readableMode={true}
      />,
    );
  });

  test("testing render AppoversInfo with not readable mode  and multiple approvers", () => {
    render(
      <AppoversInfo
        approvers={[...approversData]}
        action={jest.fn()}
        readableMode={true}
      />,
    );
  });
});
