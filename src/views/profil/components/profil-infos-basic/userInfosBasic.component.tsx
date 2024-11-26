import {
  UserInfosBasicContainer,
  UserInfosBasicData,
  UserInfosBasicLabel,
  UserInfosClock,
  UserInfosDesc,
  UserInfosRow,
} from "./userInfosBasic.styled";
import { UserModel } from "shared/model/user.model";

interface UserInfosBasicProps {
  userInfos: UserModel;
}

function UserInfosBasicComponent({ userInfos }: UserInfosBasicProps) {
  return (
    <UserInfosBasicContainer>
      <UserInfosRow>
        <UserInfosBasicLabel md="3">
          Dernière connexion réussie
        </UserInfosBasicLabel>
        <UserInfosBasicData md="8">
          <UserInfosClock fontSize="small" />
          <span>{userInfos?.lastSuccessfulLogin}</span>
        </UserInfosBasicData>
      </UserInfosRow>
      <UserInfosRow>
        <UserInfosBasicLabel md="3">
          Dernière connexion échouée
        </UserInfosBasicLabel>
        <UserInfosBasicData md="8">
          <UserInfosClock fontSize="small" />
          <span>{userInfos?.lastFailedLogin}</span>
        </UserInfosBasicData>
      </UserInfosRow>
      <UserInfosRow>
        <UserInfosBasicLabel md="3">Mot de passe modifié</UserInfosBasicLabel>
        <UserInfosBasicData md="8">
          <UserInfosClock fontSize="small" />
          <span>{userInfos?.lastModifyPassword}</span>
        </UserInfosBasicData>
      </UserInfosRow>
      <UserInfosRow>
        <UserInfosBasicLabel md="3">Description</UserInfosBasicLabel>
        <UserInfosBasicData md="8">
          <UserInfosDesc />
          <span>{userInfos?.description}</span>
        </UserInfosBasicData>
      </UserInfosRow>
    </UserInfosBasicContainer>
  );
}

export default UserInfosBasicComponent;
