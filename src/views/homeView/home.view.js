import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Grid } from "@mui/material";
import homePicture from "images/The-Doors-Logo-black.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "shared/components/generic-layout/layout.component";
import { homepage } from "shared/config/constants/selenium.config";
import { logoutActionSaga } from "shared/store/sagas/oidc.saga";

import packageJson from "../../../package.json";
import { Logo, StyledGrid } from "./home.styled";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => navigate("/dashboard");
  const handleLogout = () => dispatch(logoutActionSaga());

  const Header = () => (
    <StyledGrid container>
      <Grid item>
        <Button
          startIcon={<ArrowForwardIosIcon />}
          variant="outlined"
          data-selenium={homepage.BUTTON_CONNEXION}
          {...{ onClick }}
        >
          Connexion
        </Button>
        <Button onClick={handleLogout}>Déconnexion</Button>
        <Grid item xs />
      </Grid>
    </StyledGrid>
  );

  const Footer = () => (
    <StyledGrid container>
      <Grid item xs />
      <Grid item>
        <div>
          <Button data-selenium={homepage.BUTTON_VERSION} {...{ onClick }}>
            V.{packageJson.version}
          </Button>
          <Button
            disabled
            data-selenium={homepage.BUTTON_CONTACT}
            {...{ onClick }}
          >
            Contact
          </Button>
          <Button
            disabled
            data-selenium={homepage.BUTTON_HELP}
            {...{ onClick }}
          >
            Aide
          </Button>
        </div>
      </Grid>
      <Grid item xs />
    </StyledGrid>
  );

  return (
    <Layout header={<Header />} footer={<Footer />}>
      <Logo src={homePicture} alt="the Doors" />
    </Layout>
  );
};

export default Home;
