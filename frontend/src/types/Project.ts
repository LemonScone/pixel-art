export type Frame = {
  id: number;
  projectId: number;
  grid: string[];
  animateInterval: number;
};

export type Project = {
  id: number;
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
