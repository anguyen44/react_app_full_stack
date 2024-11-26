import {
  PageContentWrapper,
  PageTitle,
  SectionContent,
  SectionTitle,
} from "./legalMentionContent.styled";

const LegalMentionContent = () => {
  return (
    <PageContentWrapper>
      <PageTitle>Mentions légales du site</PageTitle>
      <SectionTitle>ARTICLE 1 - Informatique et Liberté</SectionTitle>
      <SectionContent>
        Conformément à la loi n°78-17 du 6 janvier 1978 modifiée et au règlement
        (UE) n°2016/679 du 27 avril 2016, les informations recueillies sont
        enregistrées dans un fichier informatisé par ENEDIS en sa qualité de
        responsable de traitement dans le cadre de la mission de service public
        pour contrôler les accès au Système d&apos;Information. Elles sont
        conservées pendant 18 mois et sont destinées au CERT-ENEDIS
        cert@enedis.fr, à CEGA et au cockpit Cyber360.
      </SectionContent>
      <SectionContent>
        Vous disposez d&apos;un droit d&apos;accès à vos données, de
        rectification, d&apos;opposition et d&apos;effacement pour motifs
        légitimes. Vous disposez, également, d&apos;un droit à la limitation du
        traitement et à la portabilité des données à caractère personnel vous
        concernant. Vous pouvez exercer vos droits par courrier à l&apos;adresse
        suivante : Tour Enedis - 6ème étage - Direction Clients & Territoires -
        Service National Consommateurs - 34, place des Corolles, 92079 Paris La
        Défense Cedex (Adresse à adapter si besoin). Votre courrier doit
        préciser votre nom et prénom, votre adresse actuelle et doit être
        accompagné d&apos;une pièce justificative d&apos;identité.
      </SectionContent>
      <SectionContent>
        Conformément à la loi « informatique et libertés », vous disposez de la
        faculté d&apos;introduire une réclamation auprès de la CNIL.
      </SectionContent>
      <SectionTitle>ARTICLE 2 - Commentaires libres</SectionTitle>
      <SectionContent>
        Les informations saisies dans cette application doivent être licites,
        adéquates, pertinentes et non excessives au regard du contexte.
      </SectionContent>
      <SectionContent>
        Elles ne doivent comporter aucune appréciation sur le comportement ou
        les traits de caractère et aucun jugement de valeur, ni faire
        apparaître, directement ou indirectement, des informations relatives aux
        origines raciales ou ethniques, opinions politiques, philosophiques ou
        religieuses, à l&apos;appartenance syndicale, à la santé, à la vie
        sexuelle ainsi qu&apos;aux sanctions et condamnations de toute personne.
      </SectionContent>
    </PageContentWrapper>
  );
};

export default LegalMentionContent;
