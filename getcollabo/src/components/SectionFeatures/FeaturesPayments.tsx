import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface FeaturesPayments {
  className?: string;
}

const FeaturesPayments: FC<FeaturesPayments> = ({ className = "" }) => {
  return (
    <div
      className={`nc-FeaturesPayments relative flex flex-col lg:flex-row lg:items-center  ${className}`}
      data-nc-id="FeaturesPayments"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:ml-10 lg:w-2/5">
        <Badge className="mb-3" color="green" name="Payments" />
        <h2 className="text-4xl font-semibold sm:text-5xl md:text-5xl xl:text-5xl">Receive Payments Globally</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Choose how you want to get paid. Leave financial worries behind and focus on your passion, knowing that your talent is valued and rewarded no matter where you are in the world.
        </span>

        <div className="relative max-w-sm mt-10">
          <ButtonPrimary href="/pricing" sizeClass="py-2 px-4">
            Start accepting payments
          </ButtonPrimary>
        </div>
      </div>
      <div className="flex-grow xl:ml-20 lg:order-last">
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5">
          <div className="relative flex-shrink-0">
            <div>
              <NcImage
                containerClassName="block dark:hidden flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691876964/Landing%20Page%20Images/payments-dark_k5wezn.png"
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                alt="newsletter-image"
              />
              <NcImage
                containerClassName="hidden dark:block flex aspect-w-11 aspect-h-7 w-full h-0 rounded-xl sm:rounded-3xl xl:rounded-3xl overflow-hidden"
                src="https://res.cloudinary.com/newlink/image/upload/v1691876963/Landing%20Page%20Images/payments-light_cabcnw.png"
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

export default FeaturesPayments;