import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Bucket from "./Bucket";

const renderComponent = () => {
  const onChageTool = vi.fn();

  render(<Bucket selected={true} onChangeTool={onChageTool} />);
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
