import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import SearchedUsersSlide from "./searchedUsersSlide.component";
import { UserModel } from "shared/model/user.model";
import IntlMessageFormat from "intl-messageformat";

test("Testing SearchedUsersSlide component", () => {
  render(
    <SearchedUsersSlide
      dataFiltered={[
        new UserModel(
          "AN0F039L",
          "NGUYEN",
          "Anh",
          "anh-externe.nguyen@enedis.fr",
          true,
          "cf85ccdf-8706-4bd8-abb8-f52413a3f7c7",
        ),
      ]}
      dataAdded={[]}
      dataBeingAdded={[]}
      addMember={jest.fn()}
      userAlreadyExistMessage={new IntlMessageFormat("")}
    />,
  );
  const items = screen.getAllByLabelText("searched-user-item");
  fireEvent.click(items[0]);
});
