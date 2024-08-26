"use client";
import { useState, useRef, useEffect } from "react";
import { CommunityBadge } from "./community-badge";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  communityBadgeArr,
  communityBadgeCarouselResponsive,
} from "./../../../lib/constants";

// Carousel component
const CommunityBadges: React.FC = () => {
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
          responsive={communityBadgeCarouselResponsive}
          focusOnSelect={true}
          infinite={true}
          removeArrowOnDeviceType={Object.keys(
            communityBadgeCarouselResponsive
          )}
          draggable={true}
          className=" transition-transform duration-500 ease-in-out w-full gap-2"
        >
          {communityBadgeArr.map((item, index) => (
            <div key={index} className="justify-center">
              <CommunityBadge item={item} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex md:hidden dark:bg-dark-elevation-1 rounded-b-content p-4">
        <Carousel
          responsive={communityBadgeCarouselResponsive}
          focusOnSelect={true}
          infinite={true}
          removeArrowOnDeviceType={Object.keys(
            communityBadgeCarouselResponsive
          )}
          draggable={true}
          // partialVisible={true}
          className="flex transition-transform duration-500 ease-in-out w-full gap-2"
        >
          {communityBadgeArr
            .filter((val, index) => index % 2 == 0)
            .map((item, index) => (
              <div key={index} className="p-1">
                <CommunityBadge item={communityBadgeArr[index]} />
                <CommunityBadge item={communityBadgeArr[index + 1]} />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CommunityBadges;
