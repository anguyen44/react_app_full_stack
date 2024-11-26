import { TabContext, TabList } from "@mui/lab";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import TabsComponent from "./Tabs.component";
import { CustomTab, CustomTabPanel } from "./Tabs.styled";

describe("Tabs tests", () => {
  test("TabsComponent testing params", () => {
    render(
      <TabsComponent
        title={["Title1", "Title2"]}
        content={[<div key="1">Text1</div>, <div key="2">Text2</div>]}
      />,
    );

    const title = screen.getByText("Title1");
    expect(title).toBeInTheDocument();
    fireEvent.click(title);
    const content = screen.getByText("Text1");
    expect(content).toBeInTheDocument();

    const title2 = screen.getByText("Title2");
    expect(title2).toBeInTheDocument();
    fireEvent.click(title2);
    const content2 = screen.getByText("Text2");
    expect(content2).toBeInTheDocument();
  });

  test("Render CustomTabPanel", () => {
    const { getByText } = render(
      <TabContext value={0}>
        <TabList>
          <CustomTab label="title" value={0} $withBackground />
        </TabList>
        <CustomTabPanel value={0}>content</CustomTabPanel>
      </TabContext>,
    );

    const title = getByText("title");
    expect(title).toBeInTheDocument();

    const content = getByText("content");
    expect(content).toBeInTheDocument();
  });
});
