type ToolOption = {
  pen: {
    color: string;
    size: number;
  };
  eraser: {
    size: number;
  };
};

type Tool = keyof ToolOption;

export type { ToolOption, Tool };
