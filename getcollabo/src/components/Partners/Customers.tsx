import React, { FC, useState } from "react";
import NcModal from "shared/NcModal/NcModal";

export interface CustomersProps {
  className?: string;
}

export interface CustomerItem {
  id: string;
  name: string;
  image: string;
  text: string;
  niche: string;
}

const Customers: FC<CustomersProps> = ({ className = "" }) => {
  const [showModal, setShowModal] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const customerData: CustomerItem[] = [
    {
      id: "creator-1",
      name: "thelagostourist",
      niche: "Lifestyle & Travel Creator",
      image:
        "https://www.zikoko.com/wp-content/uploads/zikoko/2023/03/A77ADDE9-3E30-4B7D-8CC8-B05F44C014BA-1152x1536.jpeg",
      text: "So, I'm more convinced than before. I got sold on the fact where I can chat with brands. I also saw that brands can setup accounts. I also really liked the fact that you can create contracts...with templates that can be tweaked. I love it!",
    },
    {
      id: "creator-2",
      name: "machioflagos",
      niche: "Fashion & Lifestyle Creator",
      image:
        "https://res.cloudinary.com/newlink/image/upload/v1684841814/Snapinsta.app_344809615_1842226729494174_2994107679396212740_n_1080_qhhmy7.jpg?auto",
      text: "I think it's brilliant and anyone sleeping on it now is not wise. I'd definitely use and recommend it.",
    },
    {
      id: "creator-4",
      name: "teetat",
      niche: "Lifestyle Creator",
      image:
        "http://res.cloudinary.com/newlink/image/upload/v1681310412/getcollabo/wtggskryga5nvkn8gibb.jpg?auto",
      text: "At first, I was skeptical about the brand cos I felt this is nothing new. Until I got acquainted and realised the massive solution Getcollabo is providing. Making working with brands more professional, also giving me a platform where all my deliverables, rates, invoices can be seen and accessed without stress. Getcollabo is the future.",
    },
    {
      id: "creator-6",
      name: "dammypep",
      niche: "Storyteller",
      image:
        "http://res.cloudinary.com/newlink/image/upload/v1681293546/getcollabo/pzfhnhwkhymjl66hmcoy.jpg?auto",
      text: "As a creative, it's great to know that you have an online space ready to help you build a proposal, create an invoice and draft a contract, all while you work with the brands you love. It's that creative work space you need. I love Getcollabo and I recommend it.",
    },
  ];

  {/** 
    id: "creator-3",
    name: "peaceitimi",
    niche: "Business Creator",
    image:
      "https://yt3.googleusercontent.com/ytc/AOPolaSlavORZPjLgUM8tsIwsWrbcMcPzVkt3YAz0MR4fQ=s900-c-k-c0x00ffffff-no-rj",
    text: "Peace is yet to say something",
  */}
  {/** 
    id: "creator-5",
    name: "faizat_hussein",
    niche: "Business Creator",
    image:
      "http://res.cloudinary.com/newlink/image/upload/v1688228755/getcollabo/kqafwyip1ctlmhmlipo5.jpg?auto",
    text: "Peace is yet to say something",
  */}

  const handleViewText = (itemId: string) => {
    setCustomerId(itemId);
    setShowModal(true);
  };

  const renderContent = () => {
    const selectedItem = customerData.find((item) => item.id === customerId);
    if (selectedItem) {
      return (
        <div>
          <section>
            <div className="max-w-screen-xl px-4 py-4 mx-auto text-center lg:px-6">
              <figure className="max-w-screen-md mx-auto">
                <svg
                  className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>
                  <p className="text-lg font-medium text-gray-900 xl:text-xl dark:text-white">
                    "{selectedItem.text}"
                  </p>
                </blockquote>
                <figcaption className="flex items-center justify-center mt-6 space-x-3">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={selectedItem.image}
                  />
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-white">
                      {selectedItem.name}
                    </div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                      {selectedItem.niche}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`nc-Customers ${className}`} data-nc-id="Customers">
      <header className="max-w-2xl mx-auto mb-4 text-center">
        <h2 className="flex items-center justify-center text-4xl font-semibold sm:text-4xl xl:text-5xl lg:text-5xl text-neutral-900 dark:text-neutral-100">
          ❤️ Loved by Multiple Creators
        </h2>
      </header>
      <div className="max-w-2xl mx-auto text-center">
         <span className="flex items-center justify-center mt-4 mb-6 text-gray-500 dark:text-gray-400">Click on any to see what they think about us</span>
      </div>
     
      <div className="overflow-x-scroll scroll-smooth scrollbar dark:scrollbar-thumb-neutral-900 :scrollbar-thumb-white dark:scrollbar-track-neutral-900 scrollbar-track-white">
        <div className="py-10 lg:py-14">
          <div className="mx-auto">
            <ul className="flex space-x-6 xl:items-center sm:justify-center sm:items-center md:justify-center md:items-center lg:justify-center lg:items-center xl:justify-center">
              {customerData.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleViewText(item.id)}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600">
                    <div className="block p-1 transition transform bg-white rounded-full hover:-rotate-6">
                      <img
                        className="object-cover w-32 h-32 rounded-full max-w-none"
                        src={item.image}
                        alt="cute kitty"
                      />
                    </div>
                    <button className="absolute bottom-0 flex items-center justify-center w-10 h-10 font-mono text-2xl font-medium text-white bg-white border-4 border-white rounded-full right-1 hover:bg-white focus:outline-none">
                      <div className="transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-8 h-8 fill-red-500 animate-spin"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showModal}
        renderContent={renderContent}
        contentExtraClass="max-w-xl"
        onCloseModal={() => setShowModal(false)}
        modalTitle=""
      />
    </div>
  );
};

export default Customers;