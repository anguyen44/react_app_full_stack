import { useState } from "react";
import MESSAGES from "shared/config/constants/message.config";
import { UserModel } from "shared/model/user.model";
import { useAppDispatch } from "shared/store";
import { OrgPageState } from "shared/store/slices/common/orgPageReducers";
import useUsersSearchTemplateModal from "views/users/components/searchTemplateModal/useUsersSearchTemplateModal";
import useApproverContext from "./useApproversContext";
import useAlertCard from "shared/store/slices/globalUi/useAlertCard";

interface ApproverSearchModalProps<S extends OrgPageState> {
  orgOid: string;
  currentUsers: UserModel[];
  reducerState: S;
}

const ApproverSearchModal = <S extends OrgPageState>({
  orgOid,
  currentUsers,
  reducerState,
}: ApproverSearchModalProps<S>) => {
  const dispatch = useAppDispatch();
  const [isLoadingAddApproverApi, setIsLoadingAddApproverApi] = useState(false);

  const { dispatchAlertSuccess, dispatchAlertError } = useAlertCard();

  const { isOwner } = reducerState;

  const { isPortfolioPage, displayName, orgSlice, addApproverToOrgAction } =
    useApproverContext<S>({
      reducerState,
    });

  const {
    render: renderUserSearchModal,
    usersInDemande,
    onCloseUsersSearchModal,
  } = useUsersSearchTemplateModal({
    ...{ currentUsers, reducerState, orgSlice, isPortfolioPage },
    isApproverSearchModal: true,
  });

  const onAddApproverToOrg = () => {
    if (isOwner) {
      setIsLoadingAddApproverApi(true);
      fetchAddApproverToOrgAction();
    } else {
      dispatchAlertError(MESSAGES.FORBIDDEN, 5000);
    }
  };

  const usersInDemandeToUserOids = (usersInDemande: UserModel[]) => {
    return usersInDemande.map((u) => u.oid);
  };

  const fetchAddApproverToOrgAction = () => {
    const userOids = usersInDemandeToUserOids(usersInDemande);
    dispatch(
      addApproverToOrgAction({
        params: [orgOid, userOids],
        onSuccessCallback: () => {
          dispatchAlertSuccess(
            MESSAGES.ADD_APPROVER_TO_ORG_SUCCESS_NEED_VALIDATION(
              userOids.length > 1,
            ),
          );
          onCloseUsersSearchModal();
          setIsLoadingAddApproverApi(false);
        },
        onFailureCallback: () => {
          console.error(
            "Calling the api AddApproverToOrg in addUsersToCurrentOrg function",
          );
          setIsLoadingAddApproverApi(false);
        },
      } as any),
    );
  };

  const modalTitle = `Ajout de suppléants dans ${isPortfolioPage ? "la ressource" : "l'équipe"} ${displayName}`;

  return (
    <>
      {renderUserSearchModal(
        modalTitle,
        onAddApproverToOrg,
        isLoadingAddApproverApi,
      )}
    </>
  );
};

export default ApproverSearchModal;
