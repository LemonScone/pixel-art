import { render, screen } from "@testing-library/react";
import ProjectsListItem from "./ProjectsListItem";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = () => {
  render(<ProjectsListItem project={projectsStore.data[0]} />);
};

describe("ProjectsListItem", () => {
  describe("when rendered", () => {
    it("should render a delete button", () => {
      renderComponent();

      const deleteButton = screen.getByRole("button", {
        name: /delete/i,
      });
      expect(deleteButton).toBeInTheDocument();

      const title = screen.getByText(projectsStore.data[0].title);
      expect(title).toBeInTheDocument();
    });
  });
});
