import ItemInfosComponent from "shared/components/itemDetails/itemInfos/ItemInfos.component";
import { NameTeamLogo } from "./TeamInfos.styled";
import { useAppSelector } from "shared/store";
import { teamPageSlice } from "shared/store/slices/teamPage/teamPage.slice";

function TeamInfosComponent({
  onUpdateTeamDisplayName,
  onUpdateTeamDescription,
  isSubTeamPage,
}) {
  const teamPageReducer = useAppSelector((state) => state.teamPageReducer);
  const { readOnly } = teamPageReducer;
  const icon = <NameTeamLogo />;

  return (
    <ItemInfosComponent
      item={teamPageReducer.teamInfo}
      reducerState={teamPageReducer}
      slice={teamPageSlice as any}
      icon={icon}
      disableEditName={!isSubTeamPage || readOnly}
      disableEditDescription={!isSubTeamPage || readOnly}
      onUpdateDisplayName={onUpdateTeamDisplayName}
      onUpdateDescription={onUpdateTeamDescription}
    />
  );
}

export default TeamInfosComponent;
