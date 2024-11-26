import {
  HeaderContentItem,
  HeaderContentPageNameWrapper,
  UserInfosHeader,
  UserInfosHeaderContainer,
  UserInfosHeaderEmail,
  UserInfosHeaderNNI,
  UserInfosHeaderName,
  UserInfosHeaderWrapper,
  UserProfilIconeWrapper,
} from "../../userInfos.styled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import { Row } from "react-bootstrap";
import { useAppSelector } from "shared/store";
import {
  CircleCustom,
  ContentItemWrapper,
} from "views/dashboardView/components/DashboardPage.styled";

interface UserInfosHeaderComponent {
  pageName: string;
}

function UserInfosHeaderComponent({ pageName }: UserInfosHeaderComponent) {
  const userInfos = useAppSelector((state) => state.userReducer.user);

  return (
    <UserInfosHeader>
      <ContentItemWrapper margin={0} $disableHover $bluebackground={true}>
        <CircleCustom />
        <HeaderContentItem>
          <HeaderContentPageNameWrapper>
            {pageName}
          </HeaderContentPageNameWrapper>
        </HeaderContentItem>
      </ContentItemWrapper>
      <UserInfosHeaderWrapper>
        <UserProfilIconeWrapper>
          <PersonIcon className="w-75 h-75" />
        </UserProfilIconeWrapper>
        <UserInfosHeaderContainer>
          <Row>
            <UserInfosHeaderName>
              <span>
                {userInfos?.givenName} {userInfos?.name}
              </span>
              <UserInfosHeaderNNI>{userInfos?.nni}</UserInfosHeaderNNI>
            </UserInfosHeaderName>
          </Row>
          <Row>
            <UserInfosHeaderEmail>
              <MailOutlineIcon
                style={{
                  marginRight: "10px",
                }}
              />
              {userInfos?.email}
            </UserInfosHeaderEmail>
          </Row>
        </UserInfosHeaderContainer>
      </UserInfosHeaderWrapper>
    </UserInfosHeader>
  );
}

export default UserInfosHeaderComponent;
