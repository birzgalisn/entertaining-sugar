import cn from "classnames";
import * as Select from "@radix-ui/react-select";
import dropdown from "@/assets/dropdown.svg";
import "./RadixSelect.scss";

export type TRadixSelectOption = {
  value: string;
  label: string;
};

interface IRadixSelect extends Select.SelectProps {
  placeholder: string;
  items: Array<TRadixSelectOption>;
}

const RadixSelect: React.FC<IRadixSelect> = ({
  placeholder,
  items,
  ...props
}) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className="mp-radix-select-trigger"
        aria-label={placeholder}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon
          className={cn(
            { "mp-radix-select-icon-open": props.open },
            "mp-radix-select-icon"
          )}
        >
          <img src={dropdown} alt="Dropdown icon" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="mp-radix-select-content"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="mp-radix-select-viewport">
            {items.map((i, idx) => (
              <RadixSelectItem key={`${i.value}-${idx}`} value={i.value}>
                {i.label}
              </RadixSelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const RadixSelectItem: React.FC<Select.SelectItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Select.Item className={cn("mp-radix-select-item", className)} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};

export default RadixSelect;
