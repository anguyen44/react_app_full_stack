type ServiceListCallBack<T> = OnSuccessCallbackWithParam<T> & OnFailureCallback;

type ServiceVoidCallBack = OnSuccessCallback & OnFailureCallback;

type OnSuccessCallback = { onSuccessCallback: VoidFunction };

type OnSuccessCallbackWithParam<T> = {
  onSuccessCallback: (data: T[] | T) => void;
};

type OnFailureCallback = { onFailureCallback: VoidFunction };

type ParametersList = { params: [...any] };

type ServiceVoidCallBackWithParams = ServiceVoidCallBack & ParametersList;

type ServiceLoading = { setIsLoading: SetState<boolean> };

type ServiceLoadingWithParams<T> = ParametersType<T> & ServiceLoading;
