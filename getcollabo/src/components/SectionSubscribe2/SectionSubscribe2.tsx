import React, { FC } from "react";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center justify-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <section className="flex items-center justify-center bg-white rounded-3xl dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="max-w-screen-md mx-auto text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Join our Awesome Community
            </h2>

            <div className="max-w-sm mx-auto mt-10">
              <iframe
                src="https://embeds.beehiiv.com/bbe7accc-e0ed-4f21-916f-c1816c3e3b76?slim=true"
                data-test-id="beehiiv-embed"
                height={52}
                frameBorder={0}
                scrolling="no"
                style={{
                  margin: 0,
                  borderRadius: "0px !important",
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionSubscribe2;