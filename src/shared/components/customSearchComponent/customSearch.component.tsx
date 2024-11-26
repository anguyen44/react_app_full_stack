import Col from "../grid/col/col.component";
import Row from "../grid/row/row.component";
import { TextInput } from "../input/input.component";
import { CustomSearchIcon, SearchBox } from "./customSearch.styled";

interface CustomSearchComponentProps {
  searchKeyWord: string;
  onChangeSearchBox: React.ChangeEventHandler<HTMLInputElement>;
  additionalComponent?: React.ReactNode;
  dataSelenium?: string;
  isLoading?: boolean;
}

function CustomSearchComponent({
  searchKeyWord,
  onChangeSearchBox,
  additionalComponent,
  dataSelenium,
  isLoading = false,
}: CustomSearchComponentProps) {
  return (
    <Row>
      <Col spanPercent={"25%"} sx={{ marginBottom: "10px" }}>
        <SearchBox>
          <TextInput
            placeholder={"Rechercher par nom"}
            onChange={onChangeSearchBox}
            value={searchKeyWord}
            disabled={isLoading}
            data-selenium={dataSelenium}
          />
        </SearchBox>
      </Col>
      <Col
        spanPercent={"75%"}
        sx={{ position: "relative", marginBottom: "10px" }}
      >
        <CustomSearchIcon size={18} />
        {additionalComponent && additionalComponent}
      </Col>
    </Row>
  );
}

export default CustomSearchComponent;
