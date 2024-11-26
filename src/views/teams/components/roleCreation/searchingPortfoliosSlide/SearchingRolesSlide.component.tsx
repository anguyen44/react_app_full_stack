import LoadingComponent from "shared/components/loading/Loading.component";
import PortfolioModel from "shared/model/portfolio.model";
import {
  NotFoundSearchItem,
  SearchItemWrapper,
} from "../../../../../shared/components/searchItems/searchItems.styled";

export type FilteringPortfolios = PortfolioModel & { message?: string };

interface SearchingPortfoliosSlideProps {
  activeSearch: boolean;
  dataFiltered: FilteringPortfolios[];
  addItemFunction: (item: FilteringPortfolios) => void;
}

const SearchingPortfoliosSlide = ({
  activeSearch,
  dataFiltered,
  addItemFunction,
}: SearchingPortfoliosSlideProps) => {
  return (
    <div
      style={{ width: "99%" }}
      className={
        activeSearch || dataFiltered.length > 0
          ? "activeSlide"
          : "nonActiveSlide"
      }
    >
      {activeSearch && (
        <div style={{ padding: "10px" }}>
          <LoadingComponent />
        </div>
      )}
      <>
        {dataFiltered.length > 0 &&
          dataFiltered?.map((d, index) => {
            if (d.name !== "error") {
              return (
                <SearchItemWrapper
                  key={index}
                  onClick={() => addItemFunction(d)}
                  aria-label="searchedPortfolioItem"
                >
                  {d.getFullName()}
                </SearchItemWrapper>
              );
            } else {
              return (
                <NotFoundSearchItem key={index}>{d.message}</NotFoundSearchItem>
              );
            }
          })}
      </>
    </div>
  );
};

export default SearchingPortfoliosSlide;
