import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface FeaturesChats {
  className?: string;
}

const FeaturesChats: FC<FeaturesChats> = ({ className = "" }) => {
  return (
    <div
      className={`nc-FeaturesChats relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="FeaturesChats"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5 lg:order-2">
        <Badge className="mb-3" color="indigo" name="Messaging" />
        <h2 className="text-4xl font-semibold sm:text-5xl md:text-5xl xl:text-5xl">Collaborate Long-term</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Build authentic relationships through seamless communication. From discussing project details to sharing creative ideas, we bring you closer to the brands/creators you collaborate with.
        </span>

        <div className="relative max-w-sm mt-10">
          <ButtonPrimary href="/pricing" sizeClass="py-2 px-4">
            Try out messages
          </ButtonPrimary>
        </div>
      </div>
      <div className="flex-grow xl:mr-20 lg:order-1">
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
          <div className="relative flex-shrink-0 ">
            <div>
              <NcImage
                containerClassName="block dark:hidden flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691878218/Landing%20Page%20Images/chat_dark_hvm2rj.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="newsletter-image"
              />
              <NcImage
                containerClassName="hidden dark:block flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691878218/Landing%20Page%20Images/chat_light_uh0fe1.png"
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

export default FeaturesChats;