import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface FeaturesDiscovery {
  className?: string;
}

const FeaturesDiscovery: FC<FeaturesDiscovery> = ({ className = "" }) => {
  return (
    <div
      className={`nc-FeaturesDiscovery relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="FeaturesDiscovery"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5 lg:order-2">
        <Badge className="mb-3" color="red" name="Global Booking Opportunities" />
        <h2 className="text-4xl font-semibold sm:text-5xl md:text-5xl xl:text-5xl">Stay Local, Go Global</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Our collaborative network (for brands) boosts your visibility as a creator locally and globally, enabling exciting collaborations and endless opportunities.
        </span>

        <div className="relative max-w-sm mt-10">
          <ButtonPrimary href="/pricing" sizeClass="py-2 px-4">
            Go global
          </ButtonPrimary>
        </div>
      </div>
      <div className="flex-grow xl:mr-20 lg:order-1">
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
          <div className="relative flex-shrink-0 ">
            <div>
              <NcImage
                containerClassName="block dark:hidden flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691880592/Landing%20Page%20Images/search_dark_ipxlmf.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="newsletter-image"
              />
              <NcImage
                containerClassName="hidden dark:block flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691880591/Landing%20Page%20Images/search_light_k9b91t.png"
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

export default FeaturesDiscovery;