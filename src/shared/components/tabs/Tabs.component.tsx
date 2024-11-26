import { TabList } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { Box, BoxProps } from "@mui/material";
import { useMemo, useState } from "react";

import { CustomTab, CustomTabPanel } from "./Tabs.styled";

interface TabsComponentProps extends Omit<BoxProps, "title" | "content"> {
  title: React.ReactNode[];
  content: React.ReactNode[];
  withBackground?: boolean;
  colors?: string[];
  tabPanelHeight?: string;
  tabPanelMaxHeight?: string;
  indexOfLastTitleOnLeftSide?: number;
}

function TabsComponent({
  title,
  content,
  withBackground = false,
  colors,
  tabPanelHeight,
  tabPanelMaxHeight,
  indexOfLastTitleOnLeftSide,
  ...rest
}: TabsComponentProps) {
  const [value, setValue] = useState(0);

  const handleTabChange = (_, newTabIndex) => {
    setValue(newTabIndex);
  };

  useMemo(() => {
    if (value >= title.length) {
      setValue(0);
    }
  }, [title]);

  const getColor = (index: number, defaultValue?: string) => {
    return colors && colors.length > index ? colors[index] : defaultValue;
  };

  return (
    <Box {...rest} sx={{ width: "100%" }}>
      <TabContext value={String(value)}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleTabChange}
            TabIndicatorProps={
              colors
                ? {
                    style: {
                      backgroundColor: getColor(value, "inherit"),
                    },
                  }
                : undefined
            }
          >
            {title.map((label, index) => (
              <CustomTab
                data-testid={`tab-content-${label}`}
                label={label}
                key={index}
                value={String(index)}
                $withBackground={withBackground}
                color={getColor(index)}
                sx={
                  indexOfLastTitleOnLeftSide &&
                  index + 1 === indexOfLastTitleOnLeftSide
                    ? { mr: "auto" }
                    : undefined
                }
              />
            ))}
          </TabList>
        </Box>
        {content.map((component, index) => (
          <CustomTabPanel
            key={index}
            value={String(index)}
            height={tabPanelHeight}
            maxheight={tabPanelMaxHeight}
          >
            {component}
          </CustomTabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default TabsComponent;
