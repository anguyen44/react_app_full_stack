import { format } from "date-fns";
import { CgCalendarDate } from "icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomTextInput } from "shared/components/customInput/customInput.component";
import { CustomTextarea } from "shared/components/customInput/customTextarea.component";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import { ItemDate } from "shared/components/itemDetails/itemInfos/itemInfos.styled";
import ItemStatusComponent from "shared/components/itemDetails/itemInfos/itemStatus.component";
import LoadingComponent from "shared/components/loading/Loading.component";
import { BlueSectionTitle } from "shared/components/text/text.component";
import RoleModel from "shared/model/role.model";

import { RoleInfosSectionWrapper } from "./RoleInfos.styled";

const RoleInfosComponent = ({ onUpdateDisplayName, onUpdateDescription }) => {
  const roleInfo = useSelector((state) => state.rolePageReducer.baseInfo);
  const {
    displayName,
    description,
    isActive,
    createTimestamp,
    owner,
    portfolio,
  } = roleInfo ? roleInfo : new RoleModel();

  const [displayNameForChange, setDisplayNameForChange] = useState("");
  const [descriptionForChange, setDescriptionForChange] = useState("");

  const regexConfig = useSelector((state) => state.globalUiReducer.regexConfig);

  useEffect(() => {
    setDisplayNameForChange(displayName);
  }, [displayName]);

  useEffect(() => {
    setDescriptionForChange(description);
  }, [description]);

  const iconStyle = {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "5px",
    bottom: "2px",
    position: "relative",
  };

  return (
    <>
      {roleInfo ? (
        <RoleInfosSectionWrapper>
          <Row>
            <Col spanPercent={"50%"}>
              <Row>
                <Col>
                  <CustomTextInput
                    value={displayNameForChange}
                    setChangeValue={setDisplayNameForChange}
                    onAction={onUpdateDisplayName}
                    disabled={false}
                    initValue={displayName}
                    regex={regexConfig?.regexName}
                  />
                </Col>
              </Row>
            </Col>
            <Col spanPercent={"50%"}>
              <Row>
                <Col spanPercent={"50%"}>
                  <BlueSectionTitle size={"15px"}>
                    Responsable du rôle
                  </BlueSectionTitle>
                </Col>
                <Col spanPercent={"50%"}>{owner?.fullName}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col spanPercent={"50%"}>
              <ItemDate fontSize={"inherit"}>
                <CgCalendarDate
                  style={iconStyle}
                  title="Date de création"
                  minwidth="120px"
                />
                <span>
                  {createTimestamp
                    ? format(new Date(createTimestamp), "dd/MM/yyyy")
                    : "None"}
                </span>
              </ItemDate>
            </Col>
            <Col spanPercent={"50%"}>
              <Row>
                <Col spanPercent={"50%"}>
                  <BlueSectionTitle size={"15px"}>
                    Responsable de la ressource
                  </BlueSectionTitle>
                </Col>
                <Col spanPercent={"50%"}>{portfolio?.owner?.fullName}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col spanPercent={"50%"}>
              <ItemStatusComponent
                isActive={isActive}
                title={"Etat"}
                displayText={true}
                style={iconStyle}
                fontSize={"inherit"}
              />
            </Col>
            <Col spanPercent={"50%"}>
              <Row>
                <div className="description">
                  <div className="editTitle">
                    <BlueSectionTitle size={"15px"}>
                      <div style={{ padding: "5px 0" }}>Description</div>
                    </BlueSectionTitle>
                  </div>
                  <CustomTextarea
                    value={descriptionForChange || ""}
                    setChangeValue={setDescriptionForChange}
                    onAction={onUpdateDescription}
                    disabled={false}
                    initValue={description}
                    regex={regexConfig?.regexDescription}
                  />
                </div>
              </Row>
            </Col>
          </Row>
        </RoleInfosSectionWrapper>
      ) : (
        <div style={{ padding: "10px" }}>
          <LoadingComponent />
        </div>
      )}
    </>
  );
};

export default RoleInfosComponent;
