import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface FeaturesQuestions {
  className?: string;
}

const FeaturesQuestions: FC<FeaturesQuestions> = ({ className = "" }) => {
  return (
    <div
      className={`nc-FeaturesQuestions relative flex flex-col lg:flex-row lg:items-center  ${className}`}
      data-nc-id="FeaturesQuestions"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:ml-10 lg:w-2/5">
        <Badge className="mb-3" color="purple" name="Brand Proposals" />
        <h2 className="text-4xl font-semibold sm:text-5xl md:text-5xl xl:text-5xl">Personalize Your Collaborations</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Easily evaluate brands with our flexible questionnaire tool. Identify fitting opportunities based on your style and values by choosing between our preset questions or adding yours.
        </span>

        <div className="relative max-w-sm mt-10">
          <ButtonPrimary href="/pricing" sizeClass="py-2 px-4">
            Design brand proposals
          </ButtonPrimary>
        </div>
      </div>
      <div className="flex-grow xl:ml-20 lg:order-last">
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
          <div className="relative flex-shrink-0">
            <div>
              <NcImage
                containerClassName="block dark:hidden flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691880245/Landing%20Page%20Images/proposal_dark_edxsci.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="newsletter-image"
              />
              <NcImage
                containerClassName="hidden dark:block flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691880246/Landing%20Page%20Images/proposal_light_lva9gf.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="newsletter-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesQuestions;