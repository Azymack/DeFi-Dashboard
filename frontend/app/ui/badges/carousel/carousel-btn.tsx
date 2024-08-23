import { ArrowProps } from "react-multi-carousel";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

interface CustomLeftArrowProps extends ArrowProps {
  type: string;
  action: () => void;
}

const CarouselBtn = ({
  type,
  action,
  onClick,
  ...rest
}: CustomLeftArrowProps) => {
  return (
    <button
      className={clsx(
        { "left-0": type == "prev" },
        { "right-0": type == "next" },
        ` flex justify-center items-center h-full rounded-full w-12 dark:bg-dark-elevation-3 dark:hover:bg-dark-secondary-100 absolute z-10`
      )}
      onClick={() => {
        action();
      }}
    >
      {type === "prev" ? (
        <CaretLeftIcon className="w-6 h-6" /> // Adjust size and weight here
      ) : (
        <CaretRightIcon className="w-6 h-6" /> // Adjust size and weight here
      )}
    </button>
  );
};

export default CarouselBtn;
