import Divider from "../divider/divider.component";
import {
  BackDrop,
  ModalClosure,
  ModalContentWrapper,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
  StyleModalProps,
  StyledIoMdClose,
} from "./modal.styled";

interface ModalProps extends StyleModalProps {
  title: React.ReactNode;
  visible: boolean;
  onCancel: VoidFunction;
  footer?: React.ReactNode;
  children: React.ReactNode;
  headerDivider?: boolean;
  enableHeader?: boolean;
  contentpadding?: string;
  isFullScreen?: boolean;
}

const Modal = ({
  title,
  visible,
  onCancel,
  footer,
  width,
  children,
  headerDivider = false,
  enableHeader = true,
  contentpadding = "15px",
  height,
  maxwidth = "1396px",
  top,
  isFullScreen,
}: ModalProps) => {
  if (visible) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  const adpatedWidth: string = width
    ? (width as string).includes &&
      ["%", "px", "em", "rem", "vh"].some((c) => (width as string).includes(c))
      ? (width as string)
      : `${width}px`
    : "95%";
  const adpatedHeight: string = height ?? (isFullScreen ? "85%" : "auto");

  return (
    <>
      {visible && (
        <>
          {/* backdrop background of modal */}
          <BackDrop />

          {/* Modal section */}
          <ModalWrapper
            width={adpatedWidth}
            height={adpatedHeight}
            {...{ maxwidth, top }}
            data-testid="modal-section"
          >
            {/* Modal header */}
            {enableHeader && (
              <ModalHeader>
                {title}
                <ModalClosure>
                  <StyledIoMdClose
                    onClick={onCancel}
                    size={32}
                    data-testid="close-modal"
                  />
                </ModalClosure>
              </ModalHeader>
            )}
            {headerDivider && <Divider />}

            {/* Modal body */}
            <ModalContentWrapper {...{ contentpadding }}>
              {children}
            </ModalContentWrapper>

            {/* Modal footer */}
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default Modal;
