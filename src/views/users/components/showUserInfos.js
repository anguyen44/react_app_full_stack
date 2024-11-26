import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import { HandleBackButton } from "shared/components/handleBackButton/handleBackButton.component";

import {
  ContentWrapper,
  HeaderSection,
  InfoCriteriaInput,
  InfoCriteriaItemWrapper,
  UserInfoSection,
} from "./ShowUserInfo.styled";

const UserInfoCriteria = ({ name, value }) => {
  return (
    <InfoCriteriaItemWrapper>
      <Row>
        <Col spanPercent="20%">{name}</Col>
        <Col spanPercent="80%">
          <InfoCriteriaInput value={value} disabled />
        </Col>
      </Row>
    </InfoCriteriaItemWrapper>
  );
};

const ShowUserInfos = ({ userData, customBackButtonFunc }) => {
  return (
    <>
      <div>
        <HeaderSection>
          <HandleBackButton
            color="#fff"
            customBackButtonFunc={customBackButtonFunc}
          />
        </HeaderSection>
        <ContentWrapper>
          <UserInfoSection>
            <UserInfoCriteria name={"NNI"} value={userData.nni} />
            <UserInfoCriteria name={"Nom complet"} value={userData?.fullName} />
            <UserInfoCriteria name={"Prénom"} value={userData.givenName} />
            <UserInfoCriteria
              name={"Nom de famille"}
              value={userData.familyName?.toUpperCase()}
            />
            <UserInfoCriteria name={"Courriel"} value={userData.email} />
          </UserInfoSection>
        </ContentWrapper>
      </div>
    </>
  );
};
export default ShowUserInfos;
