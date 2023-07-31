import { useAppSelector } from "../hooks/useRedux";
import { ModalType } from "../types/Modal";
import LoadProjectsModal from "./LoadProjectsModal";
import PreviewModal from "./PreviewModal";

type ModalComponent = {
  type: ModalType;
  component: React.ReactElement;
};

const MODAL_COMPONENTS: ModalComponent[] = [
  {
    type: "LoadProjects" as ModalType,
    component: <LoadProjectsModal />,
  },
  {
    type: "Preview",
    component: <PreviewModal />,
  },
];

const GlobalModal = () => {
  const { isOpen, modalType } = useAppSelector((state) => state.modal);

  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => modal.type === modalType);

  return findModal?.component;
};

export default GlobalModal;
