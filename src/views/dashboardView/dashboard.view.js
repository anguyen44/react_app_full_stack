import { useSelector } from "react-redux";
import Layout from "shared/components/layout/layout.component";

import LegalMentionContent from "../legalmention/components/legalMentionContent";
import DashboardPage from "./components/DashboardPage";
import { DashboardContent } from "./dashboard.styled";

function Dashboard(props) {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <Layout history={props.history} activeFooter={true}>
      <DashboardContent>
        <DashboardPage user={user} />
      </DashboardContent>
      <DashboardContent>
        <LegalMentionContent />
      </DashboardContent>
    </Layout>
  );
}

export default Dashboard;
