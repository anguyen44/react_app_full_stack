import { memo } from "react";

import PortfolioModel from "shared/model/portfolio.model";
import GenericItem from "../../item/genericItem.component";
import { PORTFOLIOS_PATH } from "shared/config/constants/path.config";

interface PortfolioItemsProps {
  portfolios: Array<PortfolioModel>;
}

const PortfolioItems = ({ portfolios }: PortfolioItemsProps) => {
  return (
    <>
      {portfolios.map((portfolio) => (
        <GenericItem
          element={portfolio}
          key={portfolio.oid}
          path={PORTFOLIOS_PATH}
          showName
        />
      ))}
    </>
  );
};

export default memo(PortfolioItems);
