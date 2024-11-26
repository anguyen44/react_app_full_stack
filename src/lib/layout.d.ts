interface LayoutProps extends React.PropsWithChildren {
  history?: History;
}

interface LayoutWithElementsProps<T> extends LayoutProps {
  elements: ElementsLayoutType<T>;
}

type ElementsLayoutType<T> = T extends IGenericModel ? Array<T> : T | Array<T>;
