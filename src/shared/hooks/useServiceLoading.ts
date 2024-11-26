import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useAppDispatch } from "shared/store";

type Params<P> = Omit<P, "setIsLoading">;

const useServiceLoading = <P extends ServiceLoading>(
  getElementsAction: ActionCreatorWithPayload<P>,
  params: Params<P>,
) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      getElementsAction({
        ...(params as unknown as ParametersType<Params<P>> as any),
        setIsLoading,
      }),
    );
  }, [JSON.stringify(params)]);

  return { isLoading };
};

export default useServiceLoading;
