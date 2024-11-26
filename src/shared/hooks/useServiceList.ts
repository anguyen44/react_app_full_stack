import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { GenericDisplayModel } from "shared/model/genericDisplay.model";
import { useAppDispatch } from "shared/store";
import { sortItemsByDisplayName } from "shared/utils/sort.utils";
import useServiceListCallback from "./useServiceListCallback";

type Params<P> = Omit<P, "onSuccessCallback" | "onFailureCallback">;

const useServiceList = <
  E extends GenericDisplayModel,
  P extends ServiceListCallBack<E>,
>(
  getElementsAction: ActionCreatorWithPayload<ServiceListCallBack<E>>,
  sortItemsCallback?: (data: E[]) => E[],
  params?: Params<P>,
) => {
  const dispatch = useAppDispatch();

  const {
    elements,
    setElements,
    isLoading,
    onSuccessCallback,
    onFailureCallback,
    setIsLoading,
  } = useServiceListCallback<E>(
    true,
    sortItemsCallback ?? sortItemsByDisplayName,
  );

  useEffect(() => {
    dispatch(
      getElementsAction({
        onSuccessCallback,
        onFailureCallback,
        setIsLoading,
        ...params,
      }),
    );
  }, [JSON.stringify(params)]);

  return { elements, setElements, isLoading };
};

export default useServiceList;
