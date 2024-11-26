import { Tooltip } from "antd";

interface CustomTooltipAntdProps {
  text: string;
  title: string;
  children?: React.ReactNode;
  color?: string;
}

const CustomTooltipAntd = ({
  text,
  title,
  children,
  color = "#2382d2",
}: CustomTooltipAntdProps) => {
  function formatTitle(titleToFormat: string) {
    const br = "<br/>";
    if (titleToFormat?.includes(br)) {
      let tabTitle = titleToFormat.split(br);
      return (
        <>
          {tabTitle.map((line) => (
            <div>{line}</div>
          ))}
        </>
      );
    } else {
      return titleToFormat;
    }
  }

  return (
    <Tooltip
      placement="bottom"
      title={formatTitle(title?.length ? title : text)}
      color={color}
      mouseEnterDelay={0.5}
      mouseLeaveDelay={0}
    >
      {text}
      {children}
    </Tooltip>
  );
};

export default CustomTooltipAntd;
