enum ToolActionKind {
  PENCIL = "PENCIL",
  ERASER = "ERASER",
  BUCKET = "BUCKET",
  MOVE = "MOVE",
}

enum GridSizeActionKind {
  INCREASE_COLUMN = "INCREASE_COLUMN",
  DECREASE_COLUMN = "DECREASE_COLUMN",
  INCREASE_ROW = "INCREASE_ROW",
  DECREASE_ROW = "DECREASE_ROW",
}

export { GridSizeActionKind, ToolActionKind };
