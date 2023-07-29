import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

import user from "@testing-library/user-event";
import { vi } from "vitest";

const renderComponent = ({
  head = "modal head",
  body = "modal body",
  onClose,
}: {
  head?: string;
  body?: string;
  onClose: () => void;
}) => {
  render(
    <Modal.Frame open={true} onClose={onClose}>
      <Modal.Head>{head}</Modal.Head>
      <Modal.Body>{body}</Modal.Body>
    </Modal.Frame>
  );
};

describe("Modal", () => {
  describe("when rendered", () => {
    const handleClose = vi.fn();

    it("should render close button", () => {
      renderComponent({ onClose: handleClose });

      const closeButton = screen.getByRole("button", {
        name: /×/i,
      });
      expect(closeButton).toBeInTheDocument();
    });

    it("calls onClose function when click close button", async () => {
      renderComponent({ onClose: handleClose });

      const closeButton = screen.getByRole("button", {
        name: /×/i,
      });

      await user.click(closeButton);
      expect(handleClose).toBeCalled();
    });

    it("calls onClose function when press ESC key", async () => {
      renderComponent({ onClose: handleClose });

      await user.keyboard("{Esc}");
      expect(handleClose).toBeCalled();
    });
  });
});
