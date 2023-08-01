const modalTypes = ["Preview", "LoadProjects", "Export"] as const;
type ModalType = (typeof modalTypes)[number];

export type { ModalType };
