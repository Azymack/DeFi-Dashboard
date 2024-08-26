import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import Logo from "./utils/Logo";

export default function Footer() {
  return (
    <div className="w-full dark:bg-dark-elevation-2 min-h-12 flex justify-center dark:text-dark-secondary text-xs fixed bottom-0">
      <div className="flex flex-col md:flex-row justify-around items-center container p-4 md:px-0">
        <div className="flex justify-between w-full md:w-auto">
          <div className="md:hidden">
            <Logo />
          </div>
          <div className="flex gap-6 items-center">
            <IconButton>
              <DiscordLogoIcon className="w-5 h-5" />
            </IconButton>
            <IconButton>
              <TwitterLogoIcon className="w-5 h-5" />
            </IconButton>
            <IconButton>
              <GitHubLogoIcon className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
        <div className="flex justify-between w-full md:hidden mt-4">
          <div className="hover:dark:text-dark-secondary">Docs</div>
          <div className="hover:dark:text-dark-secondary">Blog</div>
          <div className="hover:dark:text-dark-secondary">Support</div>
          <div className="hover:dark:text-dark-secondary">
            Terms & Conditions
          </div>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <button className="flex items-center footer-gradient rounded-content hover:dark:bg-dark-secondary-100 px-2 py-1">
            <span className="text-xxs dark:text-dark-primary mr-2">
              Powered by
            </span>
            <span className="text-sm dark:text-dark-primary font-bold">
              Absinthe
            </span>
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
