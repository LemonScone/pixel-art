import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Tab } from "./Tab";

const renderComponent = () => {
  render(
    <Tab.Frame>
      <Tab.TabPane display="tab1">
        <h1>content 1</h1>
      </Tab.TabPane>
      <Tab.TabPane display="tab2">
        <h2>content 2</h2>
      </Tab.TabPane>
    </Tab.Frame>
  );
};

describe("Tab", () => {
  describe("when rendered", () => {
    it("should render tabs", () => {
      renderComponent();

      const tabs = screen.getAllByRole("listitem");
      expect(tabs).toHaveLength(2);
    });

    it("should render content 1", () => {
      renderComponent();

      const content1 = screen.getByRole("heading", {
        name: /content 1/i,
      });

      expect(content1).toBeInTheDocument();
    });

    it("should not render content 2", () => {
      renderComponent();

      const content2 = screen.queryByRole("heading", {
        name: /content 2/i,
      });
      expect(content2).not.toBeInTheDocument();
    });
  });

  describe("when click tab2", () => {
    it("should not render content 1", async () => {
      renderComponent();

      const [_tab1, tab2] = screen.getAllByRole("listitem");

      await user.click(tab2);

      const content1 = screen.queryByRole("heading", {
        name: /content 1/i,
      });

      expect(content1).not.toBeInTheDocument();
    });

    it("should render content 2", async () => {
      renderComponent();

      const [_tab1, tab2] = screen.getAllByRole("listitem");

      await user.click(tab2);

      const content2 = screen.getByRole("heading", {
        name: /content 2/i,
      });
      expect(content2).toBeInTheDocument();
    });
  });
});
