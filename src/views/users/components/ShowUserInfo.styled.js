import styled from "styled-components";

const ContentWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 4px #00172e4d;
`;

const UserInfoSection = styled.div`
  width: 60%;
  margin: 0px auto 0px;
`;

const InfoCriteriaItemWrapper = styled.div`
  margin-bottom: 10px;
`;

const InfoCriteriaInput = styled.input`
  padding: 0.5em;
  color: #1f1a28;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #cfcfcf;
`;

const HeaderSection = styled.div`
  padding: 5px 10px;
  background-color: ${({ theme }) =>
    theme.palette.enedis.secondary.blue["500"]};
  border-radius: 8px 8px 0 0;
`;

export {
  ContentWrapper,
  HeaderSection,
  InfoCriteriaInput,
  InfoCriteriaItemWrapper,
  UserInfoSection,
};
