import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

const exploreChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/about",
    name: "About Us",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Support",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Collaborate",
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  
  {
    id: ncNanoId(),
    href: "/pricing",
    name: "Pricing",
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Explore",
    type: "dropdown",
    children: exploreChildMenus,
  },
];

{/** 
    id: ncNanoId(),
    href: "/collaborate",
    name: "GetCollabo: For Brands",
*/}