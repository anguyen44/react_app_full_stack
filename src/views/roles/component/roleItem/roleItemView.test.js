import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import PermissionService from "shared/services/permission/permission.service";
import { ErrorMessageTransformation } from "shared/utils/message-traduction.utils";
import { render } from "test/utils";

import RoleItemComponent from "./roleItem.component";

jest.mock("shared/services/permission/permission.service", () => {
  return {
    deletePermissionInRoleByOid: jest.fn(),
  };
});

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

const data = {
  rolePageReducer: {
    baseInfo: {
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      name: "000003-6YN-000001",
      displayName: "CACCIA_N3",
      description: "description",
      portfolio: null,
      isActive: true,
      createTimestamp: "2023-07-13T14:52:31.981+02:00",
      deleted: false,
    },
    isChangingInfo: true,
    changingInfo: {
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      displayName: "CACCIA_N3",
      description: "descriptionRole",
    },
    isFetching: false,
    permissions: [
      {
        oid: "6b8ab1eb-1b60-4348-b4df-d654bd456d05",
        name: "6YN_ZSEv2-ZA_PROD_Kyss_appli_Read",
        isActive: true,
        type: null,
        zone: null,
        value: null,
        environment: null,
        description: null,
        deleted: true,
      },
      {
        oid: "e13b1885-5e51-4d77-9762-b10de9de7286",
        name: "6YN_ZSEv2-ZA_POD1_Kyss-appli_Read",
        isActive: true,
        type: null,
        zone: null,
        value: null,
        environment: null,
        description: null,
        deleted: false,
      },
    ],
  },
};

describe("Testing RoleItemView", () => {
  test("Launching PermissionService with success", async () => {
    PermissionService.deletePermissionInRoleByOid.mockImplementation(() =>
      Promise.resolve({ data: "ok" }),
    );
    render(<RoleItemComponent />, null, { store: data });

    const confirmRemoveButton = await waitFor(() =>
      screen.getByTestId(
        `deletePermissionBtn-${data.rolePageReducer.permissions[0].oid}`,
      ),
    );
    waitFor(() => {
      act(() => {
        fireEvent.click(confirmRemoveButton);
      });
    });
  });

  test("Launching PermissionService with success but not having response", async () => {
    PermissionService.deletePermissionInRoleByOid.mockImplementation(() =>
      Promise.resolve(null),
    );
    render(<RoleItemComponent />, null, { store: data });

    const confirmRemoveButton = await waitFor(() =>
      screen.getByTestId(
        `deletePermissionBtn-${data.rolePageReducer.permissions[0].oid}`,
      ),
    );
    waitFor(() => {
      act(() => {
        fireEvent.click(confirmRemoveButton);
      });
    });
  });

  test("Launching PermissionService with failure", async () => {
    PermissionService.deletePermissionInRoleByOid.mockImplementation(() =>
      Promise.reject({ response: { data: "error" } }),
    );
    render(<RoleItemComponent />, null, { store: data });

    const confirmRemoveButton = await waitFor(() =>
      screen.getByTestId(
        `deletePermissionBtn-${data.rolePageReducer.permissions[0].oid}`,
      ),
    );
    act(() => {
      fireEvent.click(confirmRemoveButton);
    });
  });

  test("testing function ErrorMessageTransformation", () => {
    const case1 = ErrorMessageTransformation({
      response: {
        data: { message: "The user not authorized for operation !" },
      },
    });
    expect(case1).toEqual(
      "L'utilisateur n'est pas authorisé pour cette opération !",
    );

    const case2 = ErrorMessageTransformation({
      response: {
        data: {
          message: "A technical problem occurred when calling midpoint !",
        },
      },
    });
    expect(case2).toEqual(
      "Un problème technique est survenu lors de l'appel du midpoint !",
    );

    const case3 = ErrorMessageTransformation({
      response: {
        data: { message: "Not found resource in midpoint !" },
      },
    });
    expect(case3).toEqual("Ressource introuvable dans midpoint !");

    const case4 = ErrorMessageTransformation({
      response: {
        data: { message: "Missing option !" },
      },
    });
    expect(case4).toEqual("Option manquante !");

    const case5 = ErrorMessageTransformation({
      response: {
        data: { message: "Invalid credentials !" },
      },
    });
    expect(case5).toEqual("Les informations d'identification invalides !");

    const case6 = ErrorMessageTransformation({
      response: {
        data: { message: "bad token option !" },
      },
    });
    expect(case6).toEqual("Mauvaise option de token !");

    const case7 = ErrorMessageTransformation({
      response: {
        data: { message: "Bad nni or email !" },
      },
    });
    expect(case7).toEqual("Mauvais NNI ou email !");

    const case8 = ErrorMessageTransformation({
      response: {
        data: { message: "default" },
      },
    });
    expect(case8).toEqual("Erreur inconnu !");
  });

  test("testing function ErrorMessageTransformation", () => {
    const case1 = ErrorMessageTransformation({
      response: {
        data: { message: "The user not authorized for operation !" },
      },
    });
    expect(case1).toEqual(
      "L'utilisateur n'est pas authorisé pour cette opération !",
    );

    const case2 = ErrorMessageTransformation({
      response: {
        data: {
          message: "A technical problem occurred when calling midpoint !",
        },
      },
    });
    expect(case2).toEqual(
      "Un problème technique est survenu lors de l'appel du midpoint !",
    );

    const case3 = ErrorMessageTransformation({
      response: {
        data: { message: "Not found resource in midpoint !" },
      },
    });
    expect(case3).toEqual("Ressource introuvable dans midpoint !");

    const case4 = ErrorMessageTransformation({
      response: {
        data: { message: "Missing option !" },
      },
    });
    expect(case4).toEqual("Option manquante !");

    const case5 = ErrorMessageTransformation({
      response: {
        data: { message: "Invalid credentials !" },
      },
    });
    expect(case5).toEqual("Les informations d'identification invalides !");

    const case6 = ErrorMessageTransformation({
      response: {
        data: { message: "bad token option !" },
      },
    });
    expect(case6).toEqual("Mauvaise option de token !");

    const case7 = ErrorMessageTransformation({
      response: {
        data: { message: "Bad nni or email !" },
      },
    });
    expect(case7).toEqual("Mauvais NNI ou email !");

    const case8 = ErrorMessageTransformation({
      response: {
        data: { message: "default" },
      },
    });
    expect(case8).toEqual("Erreur inconnu !");
  });
});
