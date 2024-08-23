"use client";
import React, { useState, useRef, useEffect } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Carousel, { ArrowProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselBtn from "./carousel-btn";
import CarouselBadge from "./carousel-badge";
import BadgeDetail from "./badge-detail";

interface Badge {
  id: number;
  label: string;
  img: string;
}

const badges: Badge[] = [
  { id: 1, label: "Badge 1", img: "/badges/1.png" },
  { id: 2, label: "Badge 2", img: "/badges/2.png" },
  { id: 3, label: "Badge 3", img: "/badges/3.png" },
  { id: 4, label: "Badge 4", img: "/badges/4.png" },
  { id: 5, label: "Badge 5", img: "/badges/5.png" },
  { id: 6, label: "Badge 6", img: "/badges/6.png" },
  { id: 7, label: "Badge 7", img: "/badges/7.png" },
];

const MainCarousel: React.FC = () => {
  const responsive = {
    desktop_1: {
      breakpoint: { max: 3000, min: 1600 },
      items: 7,
    },
    desktop_2: {
      breakpoint: { max: 1600, min: 1300 },
      items: 5,
    },
    desktop_3: {
      breakpoint: { max: 1300, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 300 },
      items: 1,
    },
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (componentRef.current) {
      // Set the initial width
      setWidth(componentRef.current.offsetWidth);

      // Update width on window resize
      const handleResize = () => {
        if (componentRef.current) {
          let componentWidth = componentRef.current.offsetWidth;
          setWidth(componentWidth);
        }
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // const CarouselBtn = () => {
  //   return <button>bdsbbsdbdb</button>;
  // };
  interface CarouselBtnProps {
    type: string;
    action: () => void;
  }

  const CarouselBtn = ({ type, action, ...rest }: CarouselBtnProps) => {
    return (
      <button
        className={clsx(
          { "top-0 left-0": type == "prev" },
          { "top-0 right-0": type == "next" },
          ` flex justify-center items-center h-full rounded-full w-12 dark:bg-dark-elevation-3 dark:hover:bg-dark-secondary-100 absolute z-10`
        )}
        onClick={action}
      >
        {type === "prev" ? (
          <CaretLeftIcon className="w-6 h-6" /> // Adjust size and weight here
        ) : (
          <CaretRightIcon className="w-6 h-6" /> // Adjust size and weight here
        )}
      </button>
    );
  };

  return (
    <div
      ref={componentRef}
      className="w-full flex flex-col items-center rounded-corner dark:bg-dark-elevation-1 p-4 relative"
    >
      <div className="w-full relative">
        <Carousel
          responsive={responsive}
          focusOnSelect={true}
          infinite={true}
          draggable={false}
          arrows
          additionalTransfrom={width < 1024 ? 0 : Math.floor(width / 2) - 125}
          customLeftArrow={
            <CarouselBtn type="prev" action={() => console.log("left")} />
          }
          customRightArrow={
            <CarouselBtn type="next" action={() => console.log("right")} />
          }
        >
          {badges.map((item, index) => (
            <div
              key={index}
              className="w-full h-full flex justify-center items-center"
              onClick={() => setCurrentIndex(index)}
            >
              <CarouselBadge
                currentIndex={currentIndex}
                key={index}
                index={index}
                len={badges.length}
                badge={item}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <BadgeDetail />
    </div>
  );
};

export default MainCarousel;
