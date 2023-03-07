import cn from "classnames";
import "./Button.scss";

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<IButton> = ({
  type = "button",
  className = "",
  loading = false,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn("mp-button mp-button-primary", className)}
      {...(loading && { disabled: true })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
