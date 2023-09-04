// @ts-nocheck
import Logo from "shared/Logo/Logo";
import { CustomLink } from "data/types";
import React from "react";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CgCopyright } from "react-icons/cg";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Company",
    menus: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact Us" },
      { href: "/pricing", label: "Pricing" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
  {
    id: "2",
    title: "Products",
    menus: [
      { href: "/signup", label: "Signup" },
      { href: "/login", label: "Login" },
      { href: "/creators", label: "Find a Creator" },
      {
        href: "https://getcollabo.beehiiv.com/subscribe",
        label: "Join our Newsletter",
      },
    ],
  },
  {
    id: "3",
    title: "Resources",
    menus: [
      { href: "https://getcollabo.medium.com/", label: "Blog" },
      { href: "https://anchor.fm/getcollabo", label: "Podcast" },
      {
        href: "https://www.youtube.com/@getcollabo",
        label: "Youtube Channel",
      },
      {
        href: "https://wzsaky8c1l4.typeform.com/to/VzUv3I6c",
        label: "Customer Survey",
      },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  {
    id: "4",
    title: "Connect With Us",
    menus: [
      { href: "https://www.twitter.com/getcollabo", label: "Twitter" },
      { href: "https://www.instagram.com/getcollabo", label: "Instagram" },
      { href: "https://www.tiktok.com/@getcollabo", label: "Tiktok" },
      {
        href: "https://www.linkedin.com/company/getcollabo",
        label: "LinkedIn",
      },
      { href: "https://www.facebook.com/getcollabo", label: "Facebook" },
    ],
  },
];

const Footer: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const location = useLocation();

  const isChatPage = (() => {
    const chatRoutes = [
      "/payment-notification",
      //
      "/chat",
      "/convo/:chatId",
      "/messages",
      "/welcome",
      "/dashboard",
      "/invoices",
      "/support",
      "/card",
      "/payments",
      "/settings",
      "/proposals",
      "/contracts",
      "/deliverables",
      "/tasks",
      "/edit-deliverables",
      "/invoice",
      "/edit-bank",
      "/general-info",
      "/password-update",
      "/edit-card",
      "/preview-card",
      "/view/:username/:deliverableId",
      "/preview/:invoiceId",
      "/invoiceNew/:deliverableId",
      "/socials",
      "/videos",
      "/subscription",
      "/submit/:username/:indexId",
      "/chatInvoice/:businessName",
      "/change-plan",
      "/edit-contract",
      "/message/:chatId",
    ];

    const currentPath = decodeURIComponent(location.pathname); // Decode the URL to handle encoded characters like %20

    const isChatRoute = chatRoutes.some((route) => {
      const routeSegments = route.split("/");
      const currentSegments = currentPath.split("/");

      if (routeSegments.length !== currentSegments.length) {
        return false;
      }

      for (let i = 0; i < routeSegments.length; i++) {
        const routeSegment = routeSegments[i];
        const currentSegment = currentSegments[i];

        if (routeSegment.startsWith(":")) {
          continue; // Skip parameter segments
        }

        if (routeSegment !== currentSegment) {
          return false;
        }
      }

      return true;
    });

    return isChatRoute;
  })();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-sm text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    !isChatPage && (
      <div className="relative py-20 border-t nc-Footer lg:pt-32 lg:pb-28 border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 col-span-2 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="flex items-center col-span-2 md:col-span-3">
              <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
        {isDesktopOrLaptop && (
          <div className="container flex flex-row items-start justify-start mt-10 gap-y-10 gap-x-5 sm:gap-x-8 lg:gap-x-10">
            <p className="inline-flex mr-2 text-sm">
              <CgCopyright size={20} />
              Copyright 2023 Collabo Technologies LTD
            </p>
            <p className="inline-flex text-sm">All rights reserved.</p>
          </div>
        )}
        {isBigScreen && (
          <div className="container flex flex-row items-start justify-start mt-10 gap-y-10 gap-x-5 sm:gap-x-8 lg:gap-x-10">
            <p className="inline-flex mr-2 text-sm">
              <CgCopyright size={20} />
              Copyright 2023 Collabo Technologies LTD
            </p>
            <p className="inline-flex text-sm">All rights reserved.</p>
          </div>
        )}
        {isTablet && !isPortrait && (
          <div className="container flex flex-row items-start justify-start mt-10 gap-y-10 gap-x-5 sm:gap-x-8 lg:gap-x-10">
            <p className="inline-flex mr-2 text-sm">
              <CgCopyright size={20} />
              Copyright 2023 Collabo Technologies LTD
            </p>
            <p className="inline-flex text-sm">All rights reserved.</p>
          </div>
        )}
        {isPortrait && (
          <div className="container mt-8 gap-y-10 gap-x-5 sm:gap-x-8 lg:gap-x-10 ">
            <p className="inline-flex text-sm">
              <CgCopyright size={20} />
              Copyright 2023 Collabo Technologies LTD
            </p>
            <p className="inline-flex text-sm">All rights reserved.</p>
          </div>
        )}
      </div>
    )
  );
};

export default Footer;