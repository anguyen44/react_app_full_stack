import { GenericModel } from "shared/model/generic.model";
import CustomTableComponent, {
  CustomTableComponentProps,
} from "../customTable/customTable.component";
import { CustomPaper } from "../CustomPaper/CustomPaper";
import { AddButton } from "../CustomButtons/CustomButtons";
import LoadingComponent from "../loading/Loading.component";
import { FaCartDown, FaTrash } from "icons";
import {
  HeaderCartWrapper,
  HeaderCartIcon,
  TableContentWrapper,
  HeaderCartContent,
  LoadingWrapper,
  HeaderDeleteAllCartElementsWrapper,
} from "./cart.styled";
import { theme } from "shared/config/theme/theme";
import { IconButton, TableTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface CommonCartComponentProps<T extends GenericModel>
  extends CustomTableComponentProps<T> {
  deleteCartElement: (oid: string) => void;
  deleteAllCartElements: VoidFunction;
  handleValidCart: VoidFunction;
  isLoadingAddElementApi: boolean;
  cartLabel: string;
}

function CartTableComponent<T extends GenericModel>({
  columns,
  deleteCartElement,
  deleteAllCartElements,
  handleValidCart,
  isLoadingAddElementApi,
  cartLabel,
  ...props
}: CommonCartComponentProps<T>) {
  const deleteAction = (row: T) => (
    <IconButton
      className="trashIconWrapper"
      onClick={() => deleteCartElement(row.oid)}
    >
      <FaTrash data-testid="delete-icon" className="deleteIcon" />
    </IconButton>
  );

  const columnWithAction = [...columns];
  columnWithAction.push({
    name: "Action",
    field: "Action",
    customField: deleteAction,
    width: "10%",
    isAction: true,
  });

  const tableProps = {
    sx: { minWidth: 550 },
    "aria-label": "simple table",
    stickyHeader: true,
  } as unknown as OverridableComponent<TableTypeMap>;

  const isDisabled = props.data.length === 0 || isLoadingAddElementApi;

  return (
    <>
      <HeaderCartWrapper>
        <HeaderCartIcon />
        <HeaderCartContent>
          {cartLabel} ajoutés au panier
          {props.data?.length > 0 ? ` (${props.data.length})` : ""}
        </HeaderCartContent>
        {!isDisabled && (
          <HeaderDeleteAllCartElementsWrapper>
            <IconButton
              onClick={deleteAllCartElements}
              className="trashIconWrapper"
            >
              <FaCartDown title="Vider mon panier" minwidth="max-content" />
            </IconButton>
          </HeaderDeleteAllCartElementsWrapper>
        )}
      </HeaderCartWrapper>
      <CustomPaper
        sx={{
          padding: "10px",
          height: "calc(100% - 35px)",
          borderTopLeftRadius: "0!important",
          borderTopRightRadius: "0!important",
          overflow: "auto",
        }}
      >
        <TableContentWrapper>
          <CustomTableComponent
            columns={columnWithAction}
            headerColor={theme.palette.enedis.secondary.blue[500]}
            tableProps={tableProps}
            sxTableContainer={{
              maxHeight: "100%",
              scrollbarWidth: "thin",
              scrollbarColor: "#D9D9D9 #f5f5f5",
              scrollBehavior: "smooth",
            }}
            sxTableRow={{ "&:last-child td, &:last-child th": { border: 0 } }}
            hideFooter
            {...props}
          />
        </TableContentWrapper>
        <div className="addButton" style={{ display: "flow" }}>
          <AddButton
            variant="contained"
            onClick={handleValidCart}
            color="info"
            data-testid="ajouter-button-api"
            disabled={isDisabled}
            sx={{ width: "175px" }}
          >
            <LoadingWrapper>
              {isLoadingAddElementApi && <LoadingComponent />}
            </LoadingWrapper>
            Valider le panier
          </AddButton>
        </div>
      </CustomPaper>
    </>
  );
}

export default CartTableComponent;
