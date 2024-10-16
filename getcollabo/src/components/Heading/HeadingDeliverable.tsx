import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, HTMLAttributes, ReactNode, useEffect } from "react";
import NextPrev from "shared/NextPrev/NextPrev";

export interface HeadingDeliverableProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  rightPopoverText?: ReactNode;
  rightPopoverOptions?: typeof solutions;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
}

const solutions = [
  {
    name: "last 24 hours",
    href: "##",
  },
  {
    name: "last 7 days",
    href: "##",
  },
  {
    name: "last 30 days",
    href: "##",
  },
];

const HeadingDeliverable: React.FC<HeadingDeliverableProps> = ({
  children,
  desc = "",
  className = "mb-8 lg:mb-16 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  hasNextPrev = false,
  fontClass = "text-3xl md:text-4xl font-semibold",
  rightPopoverText,
  rightPopoverOptions = solutions,
  ...args
}) => {
  const [value, setValue] = React.useState(rightPopoverOptions[0].name);

  useEffect(() => {
    setValue(rightPopoverOptions[0].name);
  }, [rightPopoverOptions]);

  const renderRightPopoverText = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              as="h3"
              className="flex items-center text-green-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75"
            >
              {value}
              <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-50 w-screen max-w-[240px] mt-3 -translate-x-1/2 left-1/2">
                <div className="overflow-hidden shadow-lg rounded-2xl ring-1 ring-black ring-opacity-5">
                  <div className="relative py-3 bg-white dark:bg-neutral-800">
                    {rightPopoverOptions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setValue(item.name);
                          close();
                        }}
                        className="flex items-center py-3 -my-1 transition duration-150 ease-in-out px-7 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <p className="text-base font-medium">{item.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  return (
    <div
      className={`nc-Section-HeadingDeliverable relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter
            ? "flex flex-col items-center text-center w-full max-w-2xl mx-auto"
            : "max-w-2xl"
        }
      >
        <h2
          className={`flex items-center  flex-wrap ${
            isCenter ? "justify-center" : ""
          } ${fontClass}`}
          {...args}
        >
          {children || ``}
          {rightPopoverText && (
            <>
              <span className="block w-2">{` `}</span>
              {renderRightPopoverText()}
            </>
          )}
        </h2>
        {!!desc && (
          <span className="block mt-2 text-sm font-normal md:mt-3 sm:text-base text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="flex justify-end flex-shrink-0 mt-2 sm:ml-2 sm:mt-0">
          <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
        </div>
      )}
    </div>
  );
};

export default HeadingDeliverable;
