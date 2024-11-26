import { useEffect, useRef, useState } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";

const useResizeContainer = <T extends HTMLElement>(
  disableObserver?: boolean,
) => {
  const ref = useRef<T>();
  const [{ width, height }, setSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (ref.current && isInit && !disableObserver) {
      const size = ref.current.getBoundingClientRect();
      setSize({ width: size.width, height: size.height });
      setIsInit(false);
    }
  }, [ref?.current]);

  const onResize = useDebounceCallback(setSize, 50);

  if (!disableObserver) {
    useResizeObserver({
      ref,
      onResize,
    });
  }

  return { ref, width, height };
};

export default useResizeContainer;
