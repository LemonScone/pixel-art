const fileTypes = ["PNG", "GIF", "Sprite", "SVG"] as const;
type FileType = (typeof fileTypes)[number];

export type { FileType };
