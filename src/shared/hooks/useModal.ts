import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [roleOid, setRoleOid] = useState<string>(null);
  const onCloseModal = () => {
    setShowModal(false);
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onOpenRoleModal = (oid: string) => {
    setShowModal(true);
    setRoleOid(oid);
  };

  return { showModal, onCloseModal, onOpenModal, onOpenRoleModal, roleOid };
};
