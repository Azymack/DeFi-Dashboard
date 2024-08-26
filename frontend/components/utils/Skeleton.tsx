import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "5px",
}) => {
  return (
    <div
      className="dark:bg-dark-secondary-100 rounded-content animate-pulse"
      style={{
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default Skeleton;
