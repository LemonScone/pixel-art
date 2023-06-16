import { fireEvent } from "@testing-library/react";
import { render } from "../utils/test-utils";
import Pencil from "./Pencil";

describe("Pencil", () => {
  describe("when rendered", () => {
    it("should render buttons with the numbers 1, 2, 3, 4, 5", () => {
      const { getAllByRole } = render(<Pencil />);

      const buttons = getAllByRole("button");
      buttons.forEach((button, idx) => {
        expect(button).toHaveTextContent(idx + 1 + "");
      });
    });
  });
  describe("when click then button", () => {
    it("should show popover", () => {
      const { getByRole, queryByRole } = render(<Pencil />);

      const button = getByRole("button");
      expect(button).toBeInTheDocument();

      expect(queryByRole("tooltip")).toBeNull();

      fireEvent.click(button);

      expect(queryByRole("tooltip")).toBeVisible();
    });
  });
});
