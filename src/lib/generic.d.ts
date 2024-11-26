type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type ParametersType<T> = Parameters<(...args: any) => T>;
