import { useState } from "react";
import { CollapseText, ReducedDescriptionDiv } from "./moreDescription.styled";

interface MoreDescriptionProps {
  description: string;
}

const MoreDescription = ({ description }: MoreDescriptionProps) => {
  const [collapse, setCollapse] = useState(false);

  const MoreOrLessButtonText = ({ children }): React.ReactNode => (
    <CollapseText
      onClick={() => setCollapse(!collapse)}
      data-name="descriptionCollapse"
    >
      {children}
    </CollapseText>
  );

  const dataMin: React.ReactNode =
    description?.length > 100 ? (
      <>
        <ReducedDescriptionDiv>{description}</ReducedDescriptionDiv>
        <MoreOrLessButtonText>...Lire la suite</MoreOrLessButtonText>
      </>
    ) : (
      <div>{description}</div>
    );
  const dataMax: React.ReactNode = (
    <>
      <div>{description}</div>
      <MoreOrLessButtonText>Lire moins</MoreOrLessButtonText>
    </>
  );
  return description ? !collapse ? dataMin : dataMax : <></>;
};

export default MoreDescription;
