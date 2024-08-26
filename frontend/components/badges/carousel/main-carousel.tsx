"use client";
import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselBtn from "./carousel-btn";
import CarouselBadge from "./carousel-badge";
import BadgeDetail from "./badge-detail";
import {
  mainBadgeArr,
  mainBadgeCarouselResponsive,
} from "../../../lib/constants";

const MainCarousel: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleCurrentIndex = (dir: number) => {
    if (dir === 1) {
      if (currentIndex === mainBadgeArr.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(mainBadgeArr.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

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

  return (
    <div
      ref={componentRef}
      className="w-full flex flex-col items-center rounded-corner dark:bg-dark-elevation-1 p-4 relative"
    >
      <div className="w-full relative">
        <Carousel
          responsive={mainBadgeCarouselResponsive}
          focusOnSelect={true}
          infinite={true}
          draggable={false}
          swipeable={false}
          arrows
          additionalTransfrom={width < 1024 ? 0 : Math.floor(width / 2) - 125}
          customLeftArrow={
            <CarouselBtn
              type="prev"
              action={() => handleCurrentIndex(-1)}
              onClick={() => {}}
            />
          }
          customRightArrow={
            <CarouselBtn
              type="next"
              action={() => handleCurrentIndex(1)}
              onClick={() => {}}
            />
          }
        >
          {mainBadgeArr.map((item, index) => (
            <div
              key={index}
              className="w-full h-full flex justify-center items-center"
              onClick={() => setCurrentIndex(index)}
            >
              <CarouselBadge
                currentIndex={currentIndex}
                key={index}
                index={index}
                len={mainBadgeArr.length}
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
