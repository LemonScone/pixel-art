import { screen } from "@testing-library/react";
import Bucket from "./Bucket";
import { renderWithProviders } from "../utils/test-utils";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = () => {
  renderWithProviders(<Bucket />, {
    preloadedState: {
      projects: { ...projectsStore, selectedTool: "bucket" },
    },
  });
};

describe("Bucket", () => {
  describe("when rendered", () => {
    it("should render a bucket button", () => {
      renderComponent();

      const bucketButton = screen.getByRole("button", {
        name: /bucket/i,
      });
      expect(bucketButton).toBeInTheDocument();
      expect(bucketButton).toHaveClass("bg-primary-color-600");
      expect(bucketButton).toHaveClass("hover:bg-primary-color");
      expect(bucketButton).toHaveClass("focus:ring-offset-primary-color");
      expect(bucketButton).toHaveClass("text-gray-900");
    });
  });
});
