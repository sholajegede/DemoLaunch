import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import { Tab } from "@headlessui/react";
import Monthly from "./Monthly";
import Yearly from "./Yearly";
import BadgePricing from "shared/Badge/BadgePricing";

export interface ChangePlanProps {
  className?: string;
}

const ChangePlan: FC<ChangePlanProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("monthly");

  const [tabActive, setTabActive] = React.useState("Billing Monthly");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const renderMonthlyPricing = () => {
    return <Monthly />;
  };

  const renderYearlyPricing = () => {
    return <Yearly />;
  };

  return (
    <div className={`nc-ChangePlan ${className}`} data-nc-id="ChangePlan">
      <Helmet>
        <title>Change Plan</title>
      </Helmet>
      <div className="py-16 mt-4 mb-24 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          {/* HEADING */}
          <Tab.Group>
            <div className="flex flex-col justify-between lg:flex-row ">
              <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2">
                <Tab>
                  {() => (
                    <div className="flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                      Change Plan
                    </div>
                  )}
                </Tab>
              </Tab.List>
            </div>
          </Tab.Group>

          <p className="mt-4 mb-2 font-normal text-gray-500 dark:text-gray-400">
            Get the best plan that fits how you collaborate.
          </p>

          <span className="block max-w-2xl mt-4 mb-2 text-sm text-neutral-500 dark:text-neutral-400"></span>

          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          <Nav
            className="p-1 mt-8 rounded-full shadow-lg bg-gray-50 dark:bg-neutral-800"
            containerClassName="mb-2 relative flex justify-center w-full text-sm md:text-base"
          >
            {[
              {
                name: "Billing Monthly",
                user: "monthly",
              },
              {
                name: "Billing Yearly",
                user: "yearly",
              },
            ].map((item, index) => (
              <NavItem2
                key={index}
                isActive={tabActive === item.name}
                onClick={() => {
                  setTabActive(item.name);
                  handleUserSelection(item.user);
                }}
              >
                <div className="flex items-center justify-center sm:space-x-2.5 text-sm ">
                  <span>{item.name}</span>
                </div>
                {item.name === "Billing Yearly" ? (
                  <BadgePricing
                    className="absolute bottom-[32px] px-2 py-1 text-center left-[50px] sm:left-[110px] lg:left-[110px] xl:left-[110px]"
                    color="green"
                    name="🎉 1 Month FREE 🎉"
                  />
                ) : null}
              </NavItem2>
            ))}
          </Nav>

          <div className="flex items-center justify-center">
            <div className="grid w-full grid-cols-1 gap-8 mt-6">
              {selectedUser === "monthly"
                ? renderMonthlyPricing()
                : renderYearlyPricing()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChangePlan;