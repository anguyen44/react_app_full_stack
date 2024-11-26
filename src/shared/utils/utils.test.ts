import MESSAGES from "shared/config/constants/message.config";

import {
  ErrorCodeTransformToMessage,
  ErrorMessageTransformation,
} from "./message-traduction.utils";

describe("test message traduction utils", () => {
  test("test ErrorMessageTransformation function", () => {
    const returnedData = ErrorMessageTransformation({
      response: {
        data: {
          message:
            "This team cannot be deleted because it contains members or roles",
        },
      },
    });
    expect(returnedData).toEqual(
      "Impossible de supprimer une sous équipe qui contient des roles ou des membres",
    );
  });

  test("test ErrorCodeTransformToMessage function", () => {
    const returnedDataCase401Status = ErrorCodeTransformToMessage({
      response: { status: 401 },
    });

    expect(returnedDataCase401Status).toEqual({
      isTriggerCard: true,
      code: 401,
      errorMessage: MESSAGES.UNAUTHORIZED,
    });

    const returnedDataCase403Status = ErrorCodeTransformToMessage({
      response: { status: 403 },
    });

    expect(returnedDataCase403Status).toEqual({
      isTriggerCard: true,
      code: 403,
      errorMessage: MESSAGES.FORBIDDEN,
    });

    const returnedDataCase500Status = ErrorCodeTransformToMessage({
      response: { status: 500 },
    });

    expect(returnedDataCase500Status).toEqual({
      isTriggerCard: true,
      code: 500,
      errorMessage: MESSAGES.TECHNICAL_PROBLEM,
    });
  });
});
