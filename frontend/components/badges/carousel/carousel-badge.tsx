import Image from "next/image";
import Skeleton from "../../utils/Skeleton";
import { useEffect, useState } from "react";

interface Badge {
  label: string;
  img: string;
}

interface CarouselBadgeProps {
  index: number;
  currentIndex: number;
  badge: Badge;
  len: number;
}

export default function CarouselBadge({
  index,
  badge,
  currentIndex,
  len,
}: CarouselBadgeProps) {
  const [showMainBadge, setShowMainBadge] = useState(index === currentIndex);

  useEffect(() => {
    // Trigger a re-render when the index or currentIndex changes
    setShowMainBadge(index === currentIndex);
  }, [currentIndex]);
  return (
    <div className="flex w-full h-full justify-center items-center">
      {showMainBadge ? (
        <MainBadge
          index={index}
          currentIndex={currentIndex}
          badge={badge}
          len={len}
        />
      ) : (
        <SubBadge
          index={index}
          currentIndex={currentIndex}
          badge={badge}
          len={len}
        />
      )}
    </div>
  );
}

export function MainBadge({ badge }: CarouselBadgeProps) {
  return (
    <div className="flex flex-col w-3/5 justify-center md:max-w-48 md:min-w-48 mt-1 cursor-pointer transition-all duration-300 ease-in-out">
      <div className="flex flex-col justify-start">
        <div className="flex items-center justify-between dark:bg-dark-elevation-2 text-xxs rounded-t-content p-2">
          <span className="mr-1 dark:text-dark-primary">{badge.label}</span>
          <span className="dark:text-dark-secondary">3 Actions</span>
        </div>
        <div className="flex items-center justify-center dark:bg-dark-elevation-3 p-6">
          <Image
            height={100}
            width={100}
            src={badge.img}
            alt="carousel badge image"
            className="rounded-full"
          />
        </div>
        <div className="dark:bg-dark-success-1 dark:text-dark-success text-xxs text-center py-2 rounded-b-content">
          1.15x
        </div>
      </div>
      <div className="rounded-content text-center dark:bg-dark-elevation-2 mt-2 py-1">
        <div className="text-xxs dark:text-dark-primary">Reward Details</div>
        <div className="text-xxs dark:text-dark-secondary px-6 text-wrap break-words">
          Liquidity Provision to ETH/USDC
        </div>
      </div>
    </div>
  );
}

export function SubBadge({
  index,
  badge,
  currentIndex,
  len,
}: CarouselBadgeProps) {
  // Calculate the difference
  const difference =
    Math.abs(index - currentIndex) < 3
      ? Math.abs(index - currentIndex)
      : len - Math.abs(index - currentIndex);

  const size = Math.max(100 - difference * 20, 50) / 10;
  const opacity = Math.max(1 - difference * 0.2, 0.4);

  return (
    <div className="flex items-center transition-all duration-300 ease-in-out">
      <div
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
          opacity: opacity,
        }}
      >
        <div className="flex items-center justify-center dark:bg-dark-elevation-3 p-6 rounded-content h-full cursor-pointer">
          <img
            // height={100}
            // width={100}
            src={badge.img}
            alt="carousel badge image"
            className="rounded-full"
          />
        </div>
        <div className="rounded-content text-center dark:bg-dark-elevation-3 mt-2 p-2">
          <div className="flex gap-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="flex mt-1">
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
