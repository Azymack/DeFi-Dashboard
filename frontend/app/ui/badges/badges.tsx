import {
  ExternalLinkIcon,
  LoopIcon,
  MoveIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";
import clsx from "clsx";
import MainCarousel from "./carousel/main-carousel";
import CommunityBadges from "./community-badges/community-badges";

export default function Badges() {
  return (
    <div className="container flex flex-col mt-4 p-4 md:p-0">
      <div className="dark:text-dark-secondary text-sm">Badges</div>
      <div className="mt-3">
        <MainCarousel />
        <CommunityBadges />
      </div>
    </div>
  );
}
