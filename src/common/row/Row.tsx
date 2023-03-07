import { PropsWithChildren } from "react";
import cn from "classnames";
import "./Row.scss";

interface IRow extends PropsWithChildren {
  title: string;
  required?: boolean;
  center?: boolean;
  className?: string;
}

const Row: React.FC<IRow> = ({
  title,
  required,
  center,
  className,
  children,
}) => {
  return (
    <div className="mp-report-row">
      <h2
        className={cn("mp-report-row-title", {
          "mp-align-center": center,
        })}
      >
        {title} {required && <span className="mp-required">*</span>}
      </h2>
      <div className={cn("mp-report-row-content", className)}>{children}</div>
    </div>
  );
};

export default Row;
