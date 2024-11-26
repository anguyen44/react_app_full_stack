import axios, { AxiosResponse } from "axios";
import endpointsConfig from "shared/config/constants/endpoints.config";
import store from "shared/store";
import { triggerAlertCard } from "shared/store/slices/globalUi/globalUi.slice";
import { ErrorCodeTransformToMessage } from "shared/utils/message-traduction.utils";
import endpoints from "shared/config/constants/endpoints.config";
import TokenService from "../token/token.service";
import RegexConfigModel from "shared/model/regexConfig.model";

const instance = axios.create({
  baseURL: endpointsConfig.BASE_URL,
});

instance.interceptors.request.use(
  (request) => {
    const token = TokenService.getToken();

    request.headers["Content-Type"] = "application/json";
    request.headers["accept"] = "application/json";
    request.headers["Authorization"] = "Bearer " + token;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { code, errorMessage, isTriggerCard } =
      ErrorCodeTransformToMessage(error);
    //back to login page when token is unauthorized
    if (code === 401) {
      const { origin } = window.location;
      window.location.href = origin;
    }
    if (isTriggerCard) {
      store.dispatch(
        triggerAlertCard({
          type: "error",
          message: errorMessage,
          duration: 5000,
        }),
      );
    }
    return Promise.reject(error);
  },
);

const GlobalService = {
  getInstance: () => {
    return instance;
  },
  getRegexConfig: () =>
    instance.get(endpoints.ENDPOINT_REGEX_CONFIG).then(getRegexConfigResponse),
};

export const retryWrapper = (axiosInstance, options) => {
  const max_time = options.retry_times;
  const retry_status_code = options.retry_status_code;
  let counter = 0;
  instance.interceptors.response.use(null, (error) => {
    const config = error.config;
    console.error("error", error);
    // you could defined status you want to retry, such as 401
    if (counter < max_time && error.response.status === retry_status_code) {
      counter++;
      return new Promise((resolve) => {
        resolve(axiosInstance(config));
      });
    }
    return Promise.reject(error);
  });
  return axiosInstance;
};

const getRegexConfigResponse = (response: AxiosResponse<RegexConfigModel>) => {
  const regexConfig = response.data;
  return new RegexConfigModel(
    regexConfig.regexName,
    regexConfig.regexDisplayName,
    regexConfig.regexDescription,
  );
};

export default GlobalService;
