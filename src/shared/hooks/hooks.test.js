import { act } from "@testing-library/react";

import { renderHook } from "../../test/utils";
import { useConfirm } from "./useDialog";
import { useModal } from "./useModal";
import { useNavigatingAway } from "./usePrompt";
import { useSnackbar } from "./useSnackbar";

describe("Test all custom hooks", () => {
  test("useConfirm confirm ", () => {
    const { result } = renderHook(() => useConfirm());
    const { confirm, onConfirm, onCancel } = result.current;

    act(() => {
      confirm("abc", "content", "danger");
      onConfirm();

      confirm("abc", "content", "success");
      onCancel();
    });
  });

  test("useModal ", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.onOpenModal();
    });
    expect(result.current.showModal).toBe(true);

    act(() => {
      result.current.onCloseModal();
    });

    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.onOpenRoleModal();
    });
    expect(result.current.showModal).toBe(true);
  });

  test("useNavigatingAway not showing dialog", () => {
    renderHook(() => useNavigatingAway(false));
  });

  test("useNavigatingAway can show dialog", () => {
    const { result } = renderHook(() => useNavigatingAway(true));

    const { showDialogPrompt, confirmNavigation, cancelNavigation } =
      result.current;

    act(() => {
      cancelNavigation();
    });
    expect(showDialogPrompt).toBe(false);

    act(() => {
      confirmNavigation();
    });
  });

  test("useNavigatingAway can show dialog", () => {
    const { result } = renderHook(() => useSnackbar());

    act(() => {
      result.current.openSnackBar();
    });

    expect(result.current.message).toBe("Quelque chose s'est mal passé...");
    expect(result.current.alertType).toBe("error");
    expect(result.current.isActive).toBe(true);

    act(() => {
      result.current.closeSnackBar();
    });
    expect(result.current.isActive).toBe(false);
    expect(result.current.message).toBe("");
  });
});
