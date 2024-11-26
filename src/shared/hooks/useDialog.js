import { useState } from "react";

export const useAlertState = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const showConfirm = (titleText, message, dataType) => {
    setShow(true);
    setText(message);
    setTitle(titleText);
    setType(dataType);
  };

  const hideConfirm = () => {
    setShow(false);
    setText("");
    setTitle("");
    setType("");
  };

  return [show, type, title, text, showConfirm, hideConfirm];
};

let resolveCallback;
export const useConfirm = () => {
  const [show, type, title, text, showConfirm, hideConfirm] = useAlertState();
  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = (dataTitle, dataText, dataType) => {
    showConfirm(dataTitle, dataText, dataType);
    return new Promise((res) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    hideConfirm();
  };

  return { confirm, onConfirm, onCancel, show, title, text, type };
};
