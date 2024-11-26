import { CaretRight } from "icons";
import Modal from "shared/components/modal/modal.component";
import { useModal } from "shared/hooks/useModal";

import { CaretRightIconWrapper } from "./ObjectsInfo.styled";
import ObejectsTable from "./ObjectsTable/ObjectsTable";
//import ValidatorsTable from "./ValidatorsTable/ValidatorsTable";

const ObjectsInfo = ({ objects, readableMode }) => {
  const { showModal, onCloseModal, onOpenModal } = useModal();

  const objectsNumber = objects?.length;

  return (
    <>
      <Modal
        visible={showModal}
        width={800}
        headerDivide
        onCancel={onCloseModal}
        title={<p style={{ margin: 0 }}>Liste des objets</p>}
      >
        <ObejectsTable objects={objects} />
      </Modal>
      <>
        {objectsNumber &&
          objectsNumber > 0 &&
          (objectsNumber === 1 ? (
            <span>{objects[0].name}</span>
          ) : (
            <CaretRightIconWrapper $readableMode={readableMode}>
              <a
                key={objects[0].name}
                href="#"
                onClick={onOpenModal}
                aria-label="object"
              >
                <span>Objets</span>
                <CaretRight />
              </a>
            </CaretRightIconWrapper>
          ))}
      </>
    </>
  );
};

export default ObjectsInfo;
