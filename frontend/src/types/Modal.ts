const modalTypes = ["Preview", "LoadProjects"] as const;
type ModalType = (typeof modalTypes)[number];

export type { ModalType };
