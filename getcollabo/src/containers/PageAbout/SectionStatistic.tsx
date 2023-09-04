import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "Our Mission",
    subHeading:
      "We exist to create a sense of possibility that anyone, anywhere at anytime can become a creator and be successful.",
  },
  {
    id: "2",
    heading: "Our Vision",
    subHeading:
      "We envision a future where GetCollabo becomes an indispensable utility that is vital to the success of content creators. Just as setting up a storefront or website are essential steps when launching a business, we envision GetCollabo will become an integral part of the toolkit required for success as a content creator.",
  },
  {
    id: "3",
    heading: "Whom We Build For",
    subHeading: `There's a special group of people we call "Content Creators". They're like the artists and pioneers of our online era, shaping the internet with their creative genius. Through various mediums like writing, photos, videos, and design, they create mind-blowing experiences. They have the power to connect with people, inspire change, and grab our attention. These creators obsess over perfection, always pushing boundaries and polishing their work. Our job is to ensure their success because when they win, we all win, and together we can create an extraordinary digital world.`,
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading desc="">🚀 Why We Ship</Heading>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block mt-3 text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;