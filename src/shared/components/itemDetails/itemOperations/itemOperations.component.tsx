import { FaArrowLeft } from "icons";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomDefaultButton } from "shared/components/CustomButtons/CustomButtons";

interface ItemOperationsComponentProps {}

function ItemOperationsComponent({}: ItemOperationsComponentProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    if (location.state) {
      navigate(location.state.previousUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="operationsSectionBody">
        <div className="operationsSectionTitle">Opérations</div>
        <div className="operationsSectionContent">
          <CustomDefaultButton
            onClick={handleBack}
            $svg
            data-testid="handleBackButton"
          >
            <FaArrowLeft />
            <span>Retour</span>
          </CustomDefaultButton>
        </div>
      </div>
    </>
  );
}

export default ItemOperationsComponent;
