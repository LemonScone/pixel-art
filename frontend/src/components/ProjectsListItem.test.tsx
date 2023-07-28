import { screen } from "@testing-library/react";
import ProjectsListItem from "./ProjectsListItem";
import projectsStore from "../tests/fixtures/projectsStore";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/test-utils";

const renderComponent = () => {
  renderWithProviders(
    <MemoryRouter>
      <ProjectsListItem project={projectsStore.data[0]} />
    </MemoryRouter>,
    {
      preloadedState: {
        projects: projectsStore,
      },
    }
  );
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
