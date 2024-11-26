import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addMonths } from "shared/utils/global.utils";

const sortCasesByTimeStamp = (cases, sortType, dateType) => {
  const shadow = [...cases];
  const setSeconds = (date) => new Date(date).getTime() / 1000;

  switch (sortType) {
    case "desc":
      return shadow.sort((a, b) =>
        setSeconds(a[dateType]) > setSeconds(b[dateType]) ? -1 : 1,
      );
    case "asc":
    default:
      return shadow.sort((a, b) =>
        setSeconds(a[dateType]) > setSeconds(b[dateType]) ? 1 : -1,
      );
  }
};

const addnewDescription = (newCase) => {
  let actionType = "{action}";
  switch (newCase.actionType) {
    case "ADD":
      actionType = "Ajout";
      break;
    case "DELETE":
      actionType = "Suppression";
      break;
  }

  let fromType = "Object";
  switch (newCase.objects[0]?.type) {
    case "APPROVER":
      fromType = "du suppléant";
      break;
    case "USER":
      fromType = "de l'utilisateur";
      break;
    case "TEAM":
      fromType = "de l'équipe principale";
      break;
    case "SUBTEAM":
      fromType = "de la sous-équipe";
      break;
    case "ACTIF":
      fromType = "de la ressource";
      break;
    case "ROLE":
      fromType = "du rôle";
      break;
    case "PERMISSION":
      if (newCase.objects.length > 1) {
        fromType = "de permissions";
      } else {
        fromType = "de la permission";
      }
      break;
  }

  let from = newCase.objects[0] ? newCase.objects[0].name : "Inconnu";
  if (newCase.objects.length > 1) {
    from = "";
  }

  let toType = "Target";
  switch (newCase.targets[0]?.type) {
    case "USER":
      toType = "de l'utilisateur";
      break;
    case "TEAM":
      toType = "dans l'équipe principale";
      break;
    case "SUBTEAM":
      toType = "dans la sous-équipe";
      break;
    case "ACTIF":
      toType = "dans la ressource";
      break;
    case "ROLE":
      toType = "dans le rôle";
      break;
    case "PERMISSION":
      toType = "de la permission";
      break;
  }

  const to = newCase.targets[0] ? newCase.targets[0].name : "Inconnu";
  const newDescription = (
    <>
      {actionType} {fromType} <b>{from}</b> {toType} <b>{to}</b>
    </>
  );

  let typologyDisplay = "Inconnue";
  switch (newCase.typology) {
    case "PERMISSION":
      typologyDisplay = "Permission";
      break;
    case "MEMBER":
      typologyDisplay = "Membre";
      break;
    case "ROLE":
      typologyDisplay = "Rôle";
      break;
    case "PORTFOLIO_OWNER_DELEGATION":
      typologyDisplay = "Délégation propriétaire";
      break;
    case "TEAM_OWNER_DELEGATION":
      typologyDisplay = "Délegation gestionnaire";
      break;
  }

  let actionTypeDisplay = "action Type";
  switch (newCase.actionType) {
    case "ADD":
      actionTypeDisplay = "Ajout";
      break;
    case "DELETE":
      actionTypeDisplay = "Suppression";
      break;
  }

  let targetTypeDisplay = "target Type Display";
  switch (newCase.targets[0]?.type) {
    case "USER":
      targetTypeDisplay = "Utilisateur";
      break;
    case "TEAM":
      targetTypeDisplay = "Équipe";
      break;
    case "SUBTEAM":
      targetTypeDisplay = "Sous-équipe";
      break;
    case "ACTIF":
      targetTypeDisplay = "Ressource";
      break;
    case "ROLE":
      targetTypeDisplay = "Rôle";
      break;
    case "PERMISSION":
      targetTypeDisplay = "Permission";
      break;
  }

  const res = {
    ...newCase,
    newDescription,
    typology: typologyDisplay,
    actionType: actionTypeDisplay,
    targetTypeDisplay,
  };
  return res;
};

const casesGestionPageSlice = createSlice({
  name: "casesGestionPageReducer",
  initialState: {
    minimumValidationDateClosedValidationCases: addMonths(new Date(), -7),
    maximumValidationDateClosedValidationCases: new Date(),
    minimumValidationDateClosedTreatedCases: addMonths(new Date(), -7),
    maximumValidationDateClosedTreatedCases: new Date(),
    userReadingMode: false,
    userInfos: null,

    casesOpenToValidate: null,
    isLoadingCasesOpenToValidate: false,
    casesOpenCurrent: null,
    isLoadingCasesOpenCurrent: false,
    closedValidationCases: null,
    isLoadingClosedValidationCases: false,
    closedTreatedCases: null,
    isLoadingClosedTreatedCases: false,
  },
  selectors: {
    selectCasesOpenToValidateSortedByTimeStamp: createSelector(
      (state) => state.casesGestionPageReducer.casesOpenToValidate,
      (casesOpenToValidate) => {
        const shadowCasesOpenToValidate = casesOpenToValidate
          ? [...casesOpenToValidate]
          : null;
        if (shadowCasesOpenToValidate?.length > 0) {
          return sortCasesByTimeStamp(
            shadowCasesOpenToValidate,
            "desc",
            "createTimestamp",
          );
        }
        return shadowCasesOpenToValidate;
      },
    ),
    selectCasesOpenCurrentSortedByTimeStamp: createSelector(
      (state) => state.casesGestionPageReducer.casesOpenCurrent,
      (casesOpenCurrent) => {
        const shadowCasesOpenCurrent = casesOpenCurrent
          ? [...casesOpenCurrent]
          : null;
        if (shadowCasesOpenCurrent?.length > 0) {
          return sortCasesByTimeStamp(
            shadowCasesOpenCurrent,
            "desc",
            "createTimestamp",
          );
        }
        return shadowCasesOpenCurrent;
      },
    ),
    selectClosedValidationCasesSortedByTimeStamp: createSelector(
      (state) => state.casesGestionPageReducer.closedValidationCases,
      (closedValidationCases) => {
        const shadowClosedValidationCases = closedValidationCases
          ? [...closedValidationCases]
          : null;
        if (shadowClosedValidationCases?.length > 0) {
          return sortCasesByTimeStamp(
            shadowClosedValidationCases,
            "desc",
            "closeTimestamp",
          );
        }
        return shadowClosedValidationCases;
      },
    ),
    selectClosedTreatedCasesSortedByTimeStamp: createSelector(
      (state) => state.casesGestionPageReducer.closedTreatedCases,
      (closedTreatedCases) => {
        const shadowClosedTreatedCases = closedTreatedCases
          ? [...closedTreatedCases]
          : null;
        if (shadowClosedTreatedCases?.length > 0) {
          return sortCasesByTimeStamp(
            shadowClosedTreatedCases,
            "desc",
            "closeTimestamp",
          );
        }
        return shadowClosedTreatedCases;
      },
    ),
  },

  reducers: {
    initDataStatesFirstAccess: (state) => {
      state.minimumValidationDateClosedValidationCases = addMonths(
        new Date(),
        -7,
      );
      state.maximumValidationDateClosedValidationCases = new Date();
      state.minimumValidationDateClosedTreatedCases = addMonths(new Date(), -7);
      state.maximumValidationDateClosedTreatedCases = new Date();
    },
    resetCasesState: (state) => {
      state.casesOpenToValidate = null;
      state.casesOpenCurrent = null;
      state.closedValidationCases = null;
      state.closedTreatedCases = null;
    },
    setCasesOpenToValidate: (state, action) => {
      state.casesOpenToValidate = action.payload?.map((el) =>
        addnewDescription(el),
      );
    },
    setIsLoadingCasesOpenToValidate: (state, action) => {
      state.isLoadingCasesOpenToValidate = action.payload;
    },
    setCasesOpenCurrent: (state, action) => {
      state.casesOpenCurrent = action.payload?.map((el) =>
        addnewDescription(el),
      );
    },
    setIsLoadingCasesOpenCurrent: (state, action) => {
      state.isLoadingCasesOpenCurrent = action.payload;
    },
    setClosedValidationCases: (state, action) => {
      state.closedValidationCases = action.payload?.map((el) =>
        addnewDescription(el),
      );
    },
    setIsLoadingClosedValidationCases: (state, action) => {
      state.isLoadingClosedValidationCases = action.payload;
    },
    setClosedTreatedCases: (state, action) => {
      state.closedTreatedCases = action.payload?.map((el) =>
        addnewDescription(el),
      );
    },
    setIsLoadingClosedTreatedCases: (state, action) => {
      state.isLoadingClosedTreatedCases = action.payload;
    },

    initMinimumValidationDateClosedValidationCases: (state) => {
      state.minimumValidationDateClosedValidationCases = addMonths(
        new Date(),
        -7,
      );
    },
    initMaximumValidationDateClosedValidationCases: (state) => {
      state.maximumValidationDateClosedValidationCases = new Date();
    },
    setMinimumValidationDateClosedValidationCases: (state, action) => {
      state.minimumValidationDateClosedValidationCases = action.payload;
    },
    setMaximumValidationDateClosedValidationCases: (state, action) => {
      state.maximumValidationDateClosedValidationCases = action.payload;
    },

    initMinimumValidationDateClosedTreatedCases: (state) => {
      state.minimumValidationDateClosedTreatedCases = addMonths(new Date(), -7);
    },
    initMaximumValidationDateClosedTreatedCases: (state) => {
      state.maximumValidationDateClosedTreatedCases = new Date();
    },
    setMinimumValidationDateClosedTreatedCases: (state, action) => {
      state.minimumValidationDateClosedTreatedCases = action.payload;
    },
    setMaximumValidationDateClosedTreatedCases: (state, action) => {
      state.maximumValidationDateClosedTreatedCases = action.payload;
    },

    setUserReadingMode: (state, action) => {
      state.userReadingMode = action.payload;
    },
    setUserInfos: (state, action) => {
      state.userInfos = action.payload;
    },
    initCaseStateByOid: (state, action) => {
      const caseOid = action.payload;

      state.casesOpenToValidate = state.casesOpenToValidate.map((d) =>
        d.oid === caseOid ? { ...d, validate: false, deleted: false } : d,
      );
    },
    removeCaseByOidTemporarily: (state, action) => {
      const caseOid = action.payload;

      state.casesOpenToValidate = state.casesOpenToValidate.filter(
        (d) => d.oid !== caseOid,
      );
    },
  },
});

const {
  selectClosedCasesToValidateSortedByTimeStamp,
  selectClosedCasesMadeByUserSortedByTimeStamp,
  selectCasesOpenToValidateSortedByTimeStamp,
  selectCasesOpenCurrentSortedByTimeStamp,
  selectClosedValidationCasesSortedByTimeStamp,
  selectClosedTreatedCasesSortedByTimeStamp,
} = casesGestionPageSlice.getSelectors();
const {
  setUserReadingMode,
  setUserInfos,
  initCaseStateByOid,
  removeCaseByOidTemporarily,
  initMinimumValidationDateClosedValidationCases,
  initMaximumValidationDateClosedValidationCases,
  setMinimumValidationDateClosedValidationCases,
  setMaximumValidationDateClosedValidationCases,
  initMinimumValidationDateClosedTreatedCases,
  initMaximumValidationDateClosedTreatedCases,
  setMinimumValidationDateClosedTreatedCases,
  setMaximumValidationDateClosedTreatedCases,
  setCasesOpenToValidate,
  setIsLoadingCasesOpenToValidate,
  setCasesOpenCurrent,
  setIsLoadingCasesOpenCurrent,
  setClosedValidationCases,
  setIsLoadingClosedValidationCases,
  setClosedTreatedCases,
  setIsLoadingClosedTreatedCases,
  initDataStatesFirstAccess,
  resetCasesState,
} = casesGestionPageSlice.actions;
export {
  initCaseStateByOid,
  initDataStatesFirstAccess,
  initMaximumValidationDateClosedTreatedCases,
  initMaximumValidationDateClosedValidationCases,
  initMinimumValidationDateClosedTreatedCases,
  initMinimumValidationDateClosedValidationCases,
  removeCaseByOidTemporarily,
  resetCasesState,
  selectCasesOpenCurrentSortedByTimeStamp,
  selectCasesOpenToValidateSortedByTimeStamp,
  selectClosedCasesMadeByUserSortedByTimeStamp,
  selectClosedCasesToValidateSortedByTimeStamp,
  selectClosedTreatedCasesSortedByTimeStamp,
  selectClosedValidationCasesSortedByTimeStamp,
  setCasesOpenCurrent,
  setCasesOpenToValidate,
  setClosedTreatedCases,
  setClosedValidationCases,
  setIsLoadingCasesOpenCurrent,
  setIsLoadingCasesOpenToValidate,
  setIsLoadingClosedTreatedCases,
  setIsLoadingClosedValidationCases,
  setMaximumValidationDateClosedTreatedCases,
  setMaximumValidationDateClosedValidationCases,
  setMinimumValidationDateClosedTreatedCases,
  setMinimumValidationDateClosedValidationCases,
  setUserInfos,
  setUserReadingMode,
};
export default casesGestionPageSlice.reducer;
