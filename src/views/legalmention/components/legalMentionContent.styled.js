import styled from "styled-components";

const PageTitle = styled.h2`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 0;
`;

const SectionTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 30px;
`;

const SectionContent = styled.p`
  font-size: 0.85rem;
`;

const PageContentWrapper = styled.div`
  margin: 0 5px;
  text-align: justify;
`;

export { PageContentWrapper, PageTitle, SectionContent, SectionTitle };
