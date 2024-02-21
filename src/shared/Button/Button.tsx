import Button from "@mui/material/Button";
interface ButtonProps {
  label: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  onClick?: () => void;
  classes: Object;
  children: React.ReactNode;
}
const MuiButton: React.FC<ButtonProps> = ({
  label,
  classes,
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  onClick,
  ...otherProps
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default MuiButton;
