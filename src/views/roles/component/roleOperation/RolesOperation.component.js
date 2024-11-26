import { FaArrowLeft } from "icons";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomDefaultButton } from "shared/components/CustomButtons/CustomButtons";

const RoleOperationComponent = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleBack = (e) => {
    e.preventDefault();
    if (location.state) {
      navigate(location.state.previousUrl);
    }
  };

  return (
    <>
      <div className="operationsSectionBody">
        <div className="operationsSectionTitle">Opérations</div>
        <div className="operationsSectionContent">
          <CustomDefaultButton
            onClick={handleBack}
            data-testid="returnButton"
            $svg
          >
            <FaArrowLeft />
            <span>Retour</span>
          </CustomDefaultButton>
        </div>
      </div>
    </>
  );
};

export default RoleOperationComponent;
