import { useEffect } from "react";
import CasesTable from "../components/Table";
import { useTabContext } from "@mui/lab";
import CaseModel from "shared/model/case.model";
import { CasesTableHeaderPreferencesEnum } from "shared/enumeration/tablePreferences.enum";

interface UserCasesByTypeProps {
  cases: CaseModel[];
  isLoading: boolean;
  processCase: (caseOid: string, isApproved: boolean) => void;
  isLoadingProccessCaseList: string[];
  headerPreferences: CasesTableHeaderPreferencesEnum;
  headerBackgroundColor: string;
  handleFetchCasesCallBack: () => void;
  index: number;
}

const UserCasesByType = ({
  cases,
  isLoading,
  processCase,
  isLoadingProccessCaseList,
  headerPreferences,
  headerBackgroundColor,
  handleFetchCasesCallBack,
  index,
}: UserCasesByTypeProps) => {
  const { value: tabPosition } = useTabContext();

  useEffect(() => {
    if (!isLoading && !cases && +tabPosition === index) {
      handleFetchCasesCallBack();
    }
  }, [tabPosition, cases]);

  return (
    <CasesTable
      {...{
        cases,
        processCase,
        isLoading,
        isLoadingProccessCaseList,
        headerPreferences,
        headerBackgroundColor,
      }}
    />
  );
};

export default UserCasesByType;
