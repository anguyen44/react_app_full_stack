import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "shared/components/layout/layout.component";

import { getUserInfosByOidAction } from "../../shared/store/sagas/user.saga";
import ShowUserInfos from "./components/showUserInfos";

const UserItemView = (props) => {
  const { userOid } = useParams();
  const userData = useSelector((state) => state.userReducer.userInfosByOid);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfosByOidAction(userOid));
  }, [userOid]);

  return (
    <Layout history={props.history}>
      <Container className="">
        {userData && <ShowUserInfos userData={userData} />}
      </Container>
    </Layout>
  );
};

export default UserItemView;
