import { CSSProperties, ReactNode } from "react";
import SpinIcon from "./icon/SpinIcon";

type ButtonProps = {
  style?: CSSProperties;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
};

const Button = ({ children, className, loading, ...rest }: ButtonProps) => {
  return (
    <button {...rest} disabled={loading} className={className}>
      {loading ? <SpinIcon /> : children}
    </button>
  );
};

export default Button;
