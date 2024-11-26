import { CaretRight } from "icons";
import Modal from "shared/components/modal/modal.component";
import { useModal } from "shared/hooks/useModal";

import { CaretRightIconWrapper } from "./AppoversInfo.styled";
import ValidatorsTable from "./ValidatorsTable/ValidatorsTable";

const AppoversInfo = ({ approvers, action, readableMode }) => {
  const { showModal, onCloseModal, onOpenModal } = useModal();

  const approversNumber = approvers?.length;

  return (
    <>
      <Modal
        visible={showModal}
        width={800}
        headerDivide
        onCancel={onCloseModal}
        title={<p style={{ margin: 0 }}>Liste des valideurs de la demande</p>}
      >
        <ValidatorsTable validators={approvers} />
      </Modal>
      <>
        {approversNumber && approversNumber > 0 && (
          <>
            {readableMode ? (
              <span>{approvers[0].fullName}</span>
            ) : (
              <a
                key={approvers[0].fullName}
                href="#"
                onClick={(e) => action(e, approvers[0])}
                aria-label="approver"
              >
                {approvers[0].fullName}
              </a>
            )}
          </>
        )}
      </>
      <>
        {approversNumber && approversNumber > 1 && (
          <CaretRightIconWrapper $readableMode={readableMode}>
            {readableMode ? (
              <CaretRight />
            ) : (
              <CaretRight onClick={onOpenModal} />
            )}
          </CaretRightIconWrapper>
        )}
      </>
    </>
  );
};

export default AppoversInfo;
