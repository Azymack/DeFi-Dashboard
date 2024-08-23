import { Badge } from "@radix-ui/themes";
import clsx from "clsx";

// Define the props type
interface ActionDetailProps {
  completed: boolean;
}

export default function ActionDetail({ completed }: ActionDetailProps) {
  return (
    <div className="w-full flex flex-col col-span-3 md:col-span-1 mt-2 md:mt-0">
      <div className="dark:text-dark-secondary px-1">
        <div className="flex items-center justify-between px-4 dark:bg-dark-elevation-3 text-xs rounded-t-content py-2">
          <span className="mr-1">Action</span>
          {completed ? (
            <Badge
              variant="soft"
              className="flex items-center justify-center dark:bg-dark-success-1 dark:text-dark-success rounded-content p-1 px-2 text-xxs min-h-5 max-h-5"
            >
              Completed
            </Badge>
          ) : (
            <div className="w-16 min-h-5" />
          )}
        </div>
        <div className="dark:bg-dark-elevation-2 text-xxs p-2 px-4 rounded-b-content">
          Provide at least $50 Liquidity to USDT/ETH
        </div>
      </div>
      <div
        className={clsx(
          "h-[0.2rem] w-full mt-4 rounded-content hidden md:block",
          { "dark:bg-dark-elevation-3": !completed },
          { "dark:bg-dark-primary": completed }
        )}
      ></div>
    </div>
  );
}
