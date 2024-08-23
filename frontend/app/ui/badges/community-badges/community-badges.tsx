"use client";
import { useState, useRef, useCallback, MouseEvent, useEffect } from "react";
import { CommunityBadge } from "./community-badge";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Carousel component
const CommunityBadges: React.FC = () => {
  const items = [
    {
      name: "Discord OG",
      num: 0,
      img: "/badges/1.png",
      reward: "1.15x",
      status: true,
    },
    {
      name: "Liquidity Machine",
      num: 3,
      img: "/badges/2.png",
      reward: "1.15x",
      status: false,
    },
    {
      name: "Income Engineer",
      num: 3,
      img: "/badges/3.png",
      reward: "2x",
      status: true,
    },
    {
      name: "Pudge OG",
      num: 0,
      img: "/badges/4.png",
      reward: "200 Points",
      status: false,
    },
    {
      name: "Pathfinder OG",
      num: 0,
      img: "/badges/5.png",
      reward: "1.15x",
      status: false,
    },
    {
      name: "Rookie Badge",
      num: 1,
      img: "/badges/6.png",
      reward: "?",
      status: false,
    },
    {
      name: "Check Back Soon",
      num: 3,
      img: "/badges/7.png",
      reward: "2x",
      status: false,
    },
  ];

  const responsive = {
    desktop_1: {
      breakpoint: { max: 3000, min: 1600 },
      items: 7,
    },
    desktop_2: {
      breakpoint: { max: 1600, min: 1500 },
      items: 6,
    },
    desktop_3: {
      breakpoint: { max: 1500, min: 1300 },
      items: 5,
    },
    desktop_4: {
      breakpoint: { max: 1300, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 300 },
      items: 2,
    },
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (componentRef.current) {
      // Set the initial width
      setWidth(componentRef.current.offsetWidth);

      // Update width on window resize
      const handleResize = () => {
        if (componentRef.current) {
          setWidth(componentRef.current.offsetWidth);
        }
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="flex flex-col mt-4">
      <div className="dark:bg-dark-elevation-2 rounded-t-content p-2 px-4 dark:text-dark-primary text-xxs">
        Community Badges
      </div>
      <div
        ref={componentRef}
        className="hidden md:block dark:bg-dark-elevation-1 rounded-b-content p-4"
      >
        <Carousel
          responsive={responsive}
          focusOnSelect={true}
          infinite={true}
          removeArrowOnDeviceType={Object.keys(responsive)}
          draggable={true}
          className=" transition-transform duration-500 ease-in-out w-full gap-2"
        >
          {items.map((item, index) => (
            <div key={index} className="justify-center">
              <CommunityBadge item={item} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex md:hidden dark:bg-dark-elevation-1 rounded-b-content p-4">
        <Carousel
          responsive={responsive}
          focusOnSelect={true}
          infinite={true}
          removeArrowOnDeviceType={Object.keys(responsive)}
          draggable={true}
          // partialVisible={true}
          className="flex transition-transform duration-500 ease-in-out w-full gap-2"
        >
          {items
            .filter((val, index) => index % 2 == 0)
            .map((item, index) => (
              <div key={index} className="p-1">
                <CommunityBadge item={items[index]} />
                <CommunityBadge item={items[index + 1]} />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CommunityBadges;
