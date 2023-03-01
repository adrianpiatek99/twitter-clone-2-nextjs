import {
  HomeIcon,
  HomeOutlinedIcon,
  LoginIcon,
  MailIcon,
  MailOutlinedIcon,
  NotificationIcon,
  NotificationOutlinedIcon,
  SearchIcon,
  SearchOutlinedIcon
} from "icons/index";

export type NavBottomBarItem = {
  text: string;
  href: string;
  icon: SvgrElement;
  activeIcon: SvgrElement;
};

export const navBottomBarItems: NavBottomBarItem[] = [
  {
    text: "Home",
    href: "/home",
    icon: HomeOutlinedIcon,
    activeIcon: HomeIcon
  },
  {
    text: "Search",
    href: "/explore",
    icon: SearchOutlinedIcon,
    activeIcon: SearchIcon
  },
  {
    text: "Notifications",
    href: "/notifications",
    icon: NotificationOutlinedIcon,
    activeIcon: NotificationIcon
  },
  {
    text: "Messages",
    href: "/messages",
    icon: MailOutlinedIcon,
    activeIcon: MailIcon
  }
];

export const navBottomBarSignInItem: NavBottomBarItem = {
  text: "Sign in",
  href: "/",
  icon: LoginIcon,
  activeIcon: LoginIcon
};
