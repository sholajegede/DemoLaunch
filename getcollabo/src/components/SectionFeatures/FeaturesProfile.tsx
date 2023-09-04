import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface FeaturesProfile {
  className?: string;
}

const FeaturesProfile: FC<FeaturesProfile> = ({ className = "" }) => {
  return (
    <div
      className={`nc-FeaturesProfile relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="FeaturesProfile"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5 lg:order-2">
        <Badge className="mb-3" color="blue" name="Rate Cards" />
        <h2 className="text-4xl font-semibold sm:text-5xl md:text-5xl xl:text-5xl">Unleash Your Creativity</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Showcase your unique style, interests, deliverables, and sample deliverables with a personalized and shareable rate card that captivates brands and inspires collaborations.
        </span>

        <div className="relative max-w-sm mt-10">
          <ButtonPrimary href="/pricing" sizeClass="py-2 px-4">
            Build my rate card
          </ButtonPrimary>
        </div>
      </div>
      <div className="flex-grow xl:mr-20 lg:order-1">
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
          <div className="relative flex-shrink-0 ">
            <div>
              <NcImage
                containerClassName="block dark:hidden flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691878220/Landing%20Page%20Images/rate_card_dark_efdiww.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="image-light"
              />
              <NcImage
                containerClassName="hidden dark:block flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691878220/Landing%20Page%20Images/rate_card_light_ax4qbv.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="image-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesProfile;