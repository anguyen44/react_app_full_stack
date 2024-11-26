import { UserModel } from "shared/model/user.model";

export const mockUser = new UserModel(
  "NNI_TEST",
  "NOM_USER_TEST",
  "PRENOM_USER_TEST",
  "user.test@enedis.fr",
  true,
  "OID_USER",
);
