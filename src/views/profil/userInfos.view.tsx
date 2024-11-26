import Layout from "shared/components/layout/layout.component";
import UserInfosBasicComponent from "./components/profil-infos-basic/userInfosBasic.component";
import { UserInfosBody, UserInfosContent } from "./userInfos.styled";
import UserInfosHeaderComponent from "./components/userInfosHeader/userInfosHeader.component";
import { useAppSelector } from "shared/store";

function UserInfosView(props: ViewProps) {
  const userInfos = useAppSelector((state) => state.userReducer.user);

  return (
    <Layout history={props.history}>
      <UserInfosContent>
        <UserInfosHeaderComponent pageName="Mon profil" />
        <UserInfosBody>
          <UserInfosBasicComponent
            userInfos={userInfos}
          ></UserInfosBasicComponent>
        </UserInfosBody>
      </UserInfosContent>
    </Layout>
  );
}

export default UserInfosView;
