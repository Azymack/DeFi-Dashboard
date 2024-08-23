import { Badge } from "@radix-ui/themes";
import ActionDetail from "./action-detail";
import clsx from "clsx";

export default function BadgeDetail() {
  return (
    <div className="container flex flex-col mt-2">
      <div className="flex flex-col md:flex-row justify-between items-center dark:text-dark-secondary text-xs">
        <div>
          <span className="dark:text-dark-primary mr-1">How to Earn:</span>
          <span className="">
            Complete teh actions for the badges, no specific order needed.
          </span>
        </div>
        <div className="flex gap-2 mt-2 w-full md:w-auto">
          <Badge
            variant="soft"
            className="dark:bg-dark-elevation-3 text-xxs p-1 px-2 rounded-content w-1/2 md:w-auto text-center"
          >
            1/3 Completed
          </Badge>
          <Badge
            variant="soft"
            className="dark:bg-dark-success-1 text-xxs p-1 px-2 rounded-content w-1/2 md:w-auto text-center"
          >
            Total Earnings: 3,000
          </Badge>
        </div>
      </div>
      <div className="mt-2 w-full grid grid-cols-3 gap-1">
        <ActionDetail completed={true} />
        <ActionDetail completed={false} />
        <ActionDetail completed={false} />
      </div>
      <div className="md:hidden flex gap-1">
        <div className="h-[0.2rem] w-full mt-4 rounded-content dark:bg-dark-primary"></div>
        <div className="h-[0.2rem] w-full mt-4 rounded-content dark:bg-dark-elevation-3"></div>
        <div className="h-[0.2rem] w-full mt-4 rounded-content dark:bg-dark-elevation-3"></div>
      </div>
    </div>
  );
}
