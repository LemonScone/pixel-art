const fileTypes = ["PNG", "GIF", "Sprite"] as const;
type FileType = (typeof fileTypes)[number];

export type { FileType };
