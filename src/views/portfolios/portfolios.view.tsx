import { useEffect } from "react";
import { useAppDispatch, useShallowEqualSelector } from "shared/store";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoadingWithDivComponent } from "shared/components/loading/Loading.component";
import { PORTFOLIOS_PATH } from "shared/config/constants/path.config";
import { getPortfoliosListAction } from "shared/store/sagas/portfolio.saga";
import { sortPortfoliosListByName } from "shared/store/selectors/portfolios.selector";
import SubLayoutPortfolioComponent from "shared/components/sub-layout/portfolios/subLayoutPortfolio.component";
import MESSAGES from "shared/config/constants/message.config";

function PortfoliosView(props: ViewProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const portfolios = useShallowEqualSelector(sortPortfoliosListByName("asc"));

  useEffect(() => {
    dispatch(getPortfoliosListAction());
  }, []);

  useEffect(() => {
    if (portfolios?.length > 0 && pathname === PORTFOLIOS_PATH) {
      const firstPortfolios = portfolios[0];
      navigate(PORTFOLIOS_PATH + "/" + firstPortfolios.oid);
    }
  }, [portfolios, pathname]);

  return (
    <>
      <SubLayoutPortfolioComponent elements={portfolios} {...props}>
        {portfolios ? (
          portfolios.length > 0 ? (
            <Outlet />
          ) : (
            <div style={{ padding: "5px" }}>
              {MESSAGES.SEARCH_PORTFOLIO_NONE}
            </div>
          )
        ) : (
          <LoadingWithDivComponent />
        )}
      </SubLayoutPortfolioComponent>
    </>
  );
}

export default PortfoliosView;
