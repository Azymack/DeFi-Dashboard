import clsx from "clsx";
import Image from "next/image";

interface Item {
  name: string;
  num: number;
  img: string;
  reward: string;
  status: boolean;
}

interface CommunityBadgeProps {
  item: Item;
  // handleClick: () => void;
}

export function CommunityBadge({ item }: CommunityBadgeProps) {
  return (
    <div className="flex flex-col w-full md:max-w-48 md:min-w-48 mt-1 cursor-pointer">
      <div
        className={clsx(
          "flex items-center justify-between dark:bg-dark-elevation-2 text-xxs rounded-t-lg p-2",
          {
            "border dark:border-b-0 dark:border-dark-success": item.status,
          }
        )}
      >
        <span className="mr-1 dark:text-dark-primary">{item.name}</span>
        <span className="dark:text-dark-secondary hidden md:block">
          {item.num ? `${item.num} Actions` : ``}
        </span>
      </div>
      <div
        className={clsx(
          "flex items-center justify-center dark:bg-dark-elevation-3 p-6",
          { "border border-y-0 dark:border-dark-success": item.status }
        )}
      >
        <Image
          height={100}
          width={100}
          src={item.img}
          alt="carousel badge image"
          className={clsx("rounded-full", {
            // "border dark:border-dark-success": item.status,
          })}
        />
      </div>
      <div
        className={clsx(
          "dark:bg-dark-success-1 dark:text-dark-success text-xxs text-center py-1 rounded-b-lg",
          { "border border-t-0 dark:border-dark-success": item.status }
        )}
      >
        {item.reward}
      </div>
    </div>
  );
}
