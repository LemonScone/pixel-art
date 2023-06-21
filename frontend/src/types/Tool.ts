type ToolOption = {
  pen: {
    color: string;
    size: number;
  };
  eraser: {
    size: number;
  };
  bucket: {};
};

type Tool = keyof ToolOption;

export type { ToolOption, Tool };
