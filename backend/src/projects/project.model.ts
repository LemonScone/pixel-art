import { Frame } from './frame.model';

export interface Project {
  id: number;
  userId: string;
  animate: boolean;
  cellSize: number;
  gridColumns: number;
  gridRows: number;
  pallete: string[];
  title: string;
  description: string;
  isPublished: boolean;

  frames: Frame[];
}
