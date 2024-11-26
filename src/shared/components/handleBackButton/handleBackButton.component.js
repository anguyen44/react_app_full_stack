import { FaKeyboardBackSpace } from "icons";
import { useNavigate } from "react-router-dom";

export const HandleBackButton = ({ color, customBackButtonFunc }) => {
  let navigate = useNavigate();
  return (
    <div style={{ cursor: "pointer", color: color }}>
      <FaKeyboardBackSpace
        size={25}
        onClick={() =>
          customBackButtonFunc ? customBackButtonFunc() : navigate(-1)
        }
        data-testid="back-button"
      />
    </div>
  );
};
