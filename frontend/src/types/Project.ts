export type Frame = {
  id: number | string;
  projectId: number | string;
  grid: string[];
  animateInterval: number;
};

export type Project = {
  id: number | string;
  animate: boolean;
  cellSize: number;
  gridColumns: number;
  gridRows: number;
  pallete: string[];
  title: string;
  description: string;
  isPublished: boolean;

  frames: Frame[];
};

export type Artwork = Project & { username: string; createdAt: string };
