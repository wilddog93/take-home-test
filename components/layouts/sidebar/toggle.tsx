import clsx from "clsx";
import { Tooltip } from "@nextui-org/react";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children?: ReactNode;
  onToggle: () => void;
  isIconOnly?: boolean;
  className?: string;
};

export const ToggleButton: React.FC<Props> = ({
  isOpen,
  onToggle,
  children,
  className,
}) => {
  const toggle = () => {
    onToggle();
  };

  return (
    <Tooltip
      content={
        <div className="text-xs">{`${isOpen ? "Close" : "Open"} sidebar`}</div>
      }
      placement="right"
      radius="sm"
      showArrow={true}
    >
      <button className={clsx("border-0", className)} onClick={toggle}>
        {children}
      </button>
    </Tooltip>
  );
};
