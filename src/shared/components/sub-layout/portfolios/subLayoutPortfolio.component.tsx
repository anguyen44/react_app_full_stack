import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import SubLayout from "../subLayout.component";
import PortfolioModel from "shared/model/portfolio.model";
import PortfolioItems from "./portfolioItems/portfolioItems.component";

function SubLayoutPortfolioComponent({
  elements,
  history,
  children,
}: LayoutWithElementsProps<PortfolioModel>) {
  const { pathname } = useLocation();

  const portfoliosItemsList = useMemo(() => {
    if (elements && elements.length > 0) {
      return <PortfolioItems portfolios={elements} />;
    }
  }, [JSON.stringify(elements), pathname]);

  return (
    <SubLayout history={history} elements={portfoliosItemsList}>
      {children}
    </SubLayout>
  );
}

export default SubLayoutPortfolioComponent;
