import { configureStore } from "@reduxjs/toolkit";
import { shallowEqual, useDispatch, useSelector, useStore } from "react-redux";
import createSagaMiddleWare from "redux-saga";

import rootSaga from "./sagas/root.saga";
import casesGestionPageReducer from "./slices/casesGestionPage/casesGestionPage.slice";
import dashboardPageReducer from "./slices/dashboardPage/dashboardPage.slice";
import globalUiReducer from "./slices/globalUi/globalUi.slice";
import permissionCreationReducer from "./slices/permissionCreation/permissionCreation.slice";
import rolePageReducer from "./slices/rolePage/rolePage.slice";
import teamMenuReducer from "./slices/teamMenu/teamMenu.slice";
import teamPageReducer from "./slices/teamPage/teamPage.slice";
import userReducer from "./slices/user/user.slice";
import portfolioPageReducer from "./slices/portfolioPage/portfolioPage.slice";
import tablePreferencesReducer from "./slices/tablePreferences/tablePreferences.slice";

export const sagaMiddleware = createSagaMiddleWare();

export const reducers = {
  userReducer,
  teamMenuReducer,
  teamPageReducer,
  rolePageReducer,
  casesGestionPageReducer,
  dashboardPageReducer,
  globalUiReducer,
  permissionCreationReducer,
  portfolioPageReducer,
  tablePreferencesReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
  } as any);
};

sagaMiddleware.run(rootSaga);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useShallowEqualSelector = <T>(selector: (...params) => T): T =>
  useAppSelector(selector, shallowEqual);

export default store;
