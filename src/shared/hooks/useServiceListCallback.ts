import { useState } from "react";

const useServiceListCallback = <E>(
  initLoading = false,
  sortItems?: (data: E[]) => E[],
) => {
  const [elements, setElements] = useState<E[]>([]);
  const [isLoading, setIsLoading] = useState(initLoading);

  const onSuccessCallback = (data: E[]) => {
    setElements(sortItems ? sortItems(data) : data);
    setIsLoading(false);
  };

  const onFailureCallback = () => {
    setElements([]);
    setIsLoading(false);
  };

  return {
    elements,
    setElements,
    isLoading,
    setIsLoading,
    onSuccessCallback,
    onFailureCallback,
  };
};

export default useServiceListCallback;
