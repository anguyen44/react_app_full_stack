import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActionWrapper,
  CustomFaCheck,
  CustomFaTimes,
} from "./customInput.styled";
import { FaPencilAlt } from "icons";
import { Spin } from "antd";
import useAlertDialogCurrentEdit from "shared/store/slices/globalUi/useAlertDialogCurrentEdit";

const useFocus = () => {
  const ref = useRef(null);
  const setFocus = () => {
    ref.current && ref.current.focus();
  };

  return { setFocus, ref };
};

const useModifForm = (
  initValue,
  value,
  setChangeValue,
  onAction,
  disabled,
  regex: string,
) => {
  const refModifBox = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [focusing, setFocusing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isChangingInfo, setIsChangingInfo] = useState(false);
  const { ref: inputRef, setFocus } = useFocus();
  const [isValidInput, setIsValidInput] = useState(true);

  const initState = () => {
    setHovering(false);
    setFocusing(false);
    setIsFetching(false);
    setIsChangingInfo(false);
  };

  const handleFocus = () => {
    setFocusing(true);
    setHovering(false);
  };

  const checkIsChangingInfo = () => {
    if (inputRef?.current?.value?.trim() !== initValue?.trim()) {
      setIsChangingInfo(true);
    } else {
      setIsChangingInfo(false);
    }
  };

  const handleChange = (e) => {
    setChangeValue(e.target.value);
    checkIsChangingInfo();
    if (regex) {
      const regexObject = new RegExp(regex);
      setIsValidInput(regexObject.test(e.target.value));
    }
  };

  const handleAcceptClick = () => {
    setIsChangingInfo(false);
    setIsFetching(true);

    onAction(value, () => {
      setIsFetching(false);
      setFocusing(false);
      setChangeValue(value);
    });
  };

  const handleRefusClick = () => {
    setChangeValue(initValue);
    setIsChangingInfo(false);
    setFocusing(false);
  };

  const handleClickOnActionWrapper = () => {
    setFocusing(false);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const handleClickOutOfModifBox = (e) => {
    if (refModifBox.current && !refModifBox.current.contains(e.target)) {
      setFocusing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutOfModifBox, true);
    initState();
    return () =>
      document.removeEventListener("click", handleClickOutOfModifBox);
  }, [initValue]);

  const ActionComponent = useCallback(
    () => (
      <>
        {focusing && !disabled && !isFetching && isValidInput && (
          <ActionWrapper onClick={handleClickOnActionWrapper}>
            <CustomFaCheck onClick={handleAcceptClick} />
            <CustomFaTimes onClick={handleRefusClick} />
          </ActionWrapper>
        )}
      </>
    ),
    [focusing, disabled, isFetching, value],
  );

  const renderSpinnerIconSection = (Wrapper) => (
    <>
      {isFetching && !disabled && (
        <Wrapper aria-label="search-user-icon">
          <Spin size="small" />
        </Wrapper>
      )}
    </>
  );

  const renderModifyIconSection = (Wrapper) => (
    <>
      {hovering && !focusing && !disabled && !isFetching && (
        <Wrapper onClick={setFocus} aria-label="search-user-icon">
          <FaPencilAlt className="searchIcon" size={12} />
        </Wrapper>
      )}
    </>
  );

  const renderAlertDialogCurrentEdit = () =>
    useAlertDialogCurrentEdit({
      isChangingInfo: isChangingInfo,
      title: "Modifications non enregistrées",
      description: (
        <>
          <span>Vos modifications n&apos;ont pas été enregistrées.</span>
          <br />
          <span>Êtes-vous sûr de vouloir quitter cette page ?</span>
          <br />
        </>
      ),
    });

  return {
    handleChange,
    focusing,
    hovering,
    isFetching,
    inputRef,
    refModifBox,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    ActionComponent,
    renderSpinnerIconSection,
    renderModifyIconSection,
    renderAlertDialogCurrentEdit,
    isValidInput,
  };
};

export default useModifForm;
