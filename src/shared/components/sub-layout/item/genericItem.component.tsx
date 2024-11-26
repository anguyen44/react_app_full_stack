import { useLocation, useNavigate } from "react-router-dom";
import Col from "shared/components/grid/col/col.component";
import Row from "shared/components/grid/row/row.component";
import { SidebarMenuItem } from "shared/components/sub-layout/subLayout.styled";
import { MenuItemWrapper } from "../teams/teamItem/teamItem.styled";
import { GenericDisplayModel } from "shared/model/genericDisplay.model";

interface GenericItem {
  element: GenericDisplayModel;
  path: string;
  showName?: boolean;
}

const GenericItem = ({ element, path, showName }: GenericItem) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const onClickItem = () => {
    navigate(`${path}/${element.oid}`);
  };

  const currentItemCheck = () =>
    pathname === `${path}/${element.oid}` ? true : false;

  return (
    <MenuItemWrapper data-testid="genericItem">
      <SidebarMenuItem
        className={currentItemCheck() ? "validatedMenuItemLi" : ""}
        style={{ paddingLeft: "10px" }}
      >
        <Row>
          <Col spanPercent={"88%"}>
            <div onClick={onClickItem}>
              {element.displayName?.toUpperCase() +
                (showName ? " (".concat(element.name).concat(")") : "")}
            </div>
          </Col>
        </Row>
      </SidebarMenuItem>
    </MenuItemWrapper>
  );
};

export default GenericItem;
