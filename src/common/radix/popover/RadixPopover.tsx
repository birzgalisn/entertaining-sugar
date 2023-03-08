import * as Popover from "@radix-ui/react-popover";
import "./RadixPopover.scss";

export interface IRadixPopover extends Popover.PopoverProps {
  trigger: React.ReactNode;
}

const RadixPopover: React.FC<IRadixPopover> = ({
  trigger,
  children,
  ...props
}) => {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger className="mp-radix-popover-trigger">
        {trigger}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="mp-radix-popover" sideOffset={5}>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RadixPopover;
