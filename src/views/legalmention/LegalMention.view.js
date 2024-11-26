import { Container } from "react-bootstrap";
import Layout from "shared/components/layout/layout.component";

import LegalMentionContent from "./components/legalMentionContent";

const LegalMentionView = () => {
  return (
    <Layout>
      <Container>
        <LegalMentionContent />
      </Container>
    </Layout>
  );
};

export default LegalMentionView;
