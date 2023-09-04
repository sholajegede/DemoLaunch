import Heading from "components/Heading/Heading";
import React, { FC } from "react";
import Badge from "shared/Badge/Badge";

export interface SectionHowItWorkInfluencerProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    title: "Create your profile",
    desc: `Click on the "Create a Profile" button to create your account.`,
  },
  {
    id: 2,
    title: "Build your profile",
    desc: "Add your best image, bio, industry, socials, & deliverables.",
  },
  {
    id: 3,
    title: "Share your profile",
    desc: "Copy your booking link & paste it on all your socials.",
  },
  {
    id: 4,
    title: "Start collaborating",
    desc: "Start managing your brand collaborations seamlessly.",
  },
];

const SectionHowItWorkInfluencer: FC<SectionHowItWorkInfluencerProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWorkInfluencer  ${className}`}
      data-nc-id="SectionHowItWorkInfluencer"
    >
      <header className="max-w-2xl mx-auto text-center">
        <h1 className="flex items-center text-4xl leading-[115%] md:text-5xl sm:text-5xl xl:text-6xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          How it Works
        </h1>
      </header>
      <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 xl:gap-20">
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <div className="mt-20 space-y-5 text-center">
              <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "blue"
                    : index === 1
                    ? "pink"
                    : index === 2
                    ? "yellow"
                    : "green"
                }
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="block text-sm sm:text-base xl:text-base text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWorkInfluencer;
