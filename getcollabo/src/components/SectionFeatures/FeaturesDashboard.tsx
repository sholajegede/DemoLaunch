import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface FeaturesDashboard {
  className?: string;
}

const FeaturesDashboard: FC<FeaturesDashboard> = ({ className = "" }) => {
  return (
    <div
      className={`nc-FeaturesDashboard relative flex flex-col lg:flex-row lg:items-center  ${className}`}
      data-nc-id="FeaturesDashboard"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:ml-10 lg:w-2/5">
        <Badge className="mb-3" color="gray" name="Booking Management" />
        <h2 className="text-4xl font-semibold sm:text-5xl md:text-5xl xl:text-5xl">Manage Collabs Anywhere</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Effortlessly manage multiple collaborations. Our tracking and management system helps you stay on track with different projects, so you never miss a beat.
        </span>

        <div className="relative max-w-sm mt-10">
          <ButtonPrimary href="/pricing" sizeClass="py-2 px-4">
            Start collaborating
          </ButtonPrimary>
        </div>
      </div>
      <div className="flex-grow xl:ml-20 lg:order-last">
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
          <div className="relative flex-shrink-0">
            <div>
              <NcImage
                containerClassName="block dark:hidden flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691876963/Landing%20Page%20Images/dashboard_dark_io6cyd.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="newsletter-image"
              />
              <NcImage
                containerClassName="hidden dark:block flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691876963/Landing%20Page%20Images/dashboard_light_yh0fwu.png"
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

export default FeaturesDashboard;