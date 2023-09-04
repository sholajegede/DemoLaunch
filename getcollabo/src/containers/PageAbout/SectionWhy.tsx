import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Why {
  id: string;
  heading: string;
  subHeading: string;
}


export interface SectionWhyProps {
  className?: string;
}

const SectionWhy: FC<SectionWhyProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionWhy relative ${className}`}>
      <Heading
        desc=""
      >
        🚀 Our Why
      </Heading>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        We envision a future where Getcollabo becomes an indispensable utility that is vital to the success of content creators. Just as setting up a storefront or website are essential steps when launching a business, we envision Getcollabo will become an integral part of the toolkit required for success as a content creator.
      </div>
    </div>
  );
};

export default SectionWhy;
