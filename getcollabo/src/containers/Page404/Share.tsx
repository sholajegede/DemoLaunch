import React, { useState } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import ShareUs from "images/search.png";
import { useParams } from "react-router-dom";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FormItem from "components/FormItem";
import Input from "shared/Input/Input";

const Share: React.FC = () => {
  const { searchName } = useParams<{ searchName: string }>();

  const [copy, setCopy] = useState(false);

  const userName = searchName
    ? searchName.charAt(0).toUpperCase() +
      searchName.slice(1).toLowerCase()
    : null;

  return (
    <div className="nc-Share">
      <Helmet>
        <title>Share GetCollabo</title>
      </Helmet>
      <div className="container flex justify-center max-w-3xl mt-10 mb-10 text-center sm:max-w-xl lg:max-w-3xl xl:max-w-3xl md:max-w-xl">
        {/* HEADER */}
        <section>
          <div className="justify-center mb-4 text-center text-7xl">😢</div>
          <span className="text-base text-neutral-800 dark:text-neutral-200">
            Oops! We couldn't find{" "}
            <span className="font-semibold text-primary-6000">
              "{userName}"
            </span>{" "}
            on GetCollabo. How about you send them a link to sign up - IT'S FREE🎉
          </span>
          <div className="mt-10 mb-4">
            <FormItem label={`${userName}'s personalized invite link:`}>
              <div className="relative">
                <CopyToClipboard
                  text={`https://getcollabo.io/onboard/${searchName}`}
                  onCopy={() => {
                    setCopy(true);
                  }}
                >
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 z-10 flex items-center px-3 text-white border-2 bg-primary-6000 dark:bg-primary-6000 border-primary-6000 rounded-2xl focus:outline-none"
                  >
                    {!copy ? (
                      <>
                        <IoCopyOutline className="mr-1.5" size={18} />
                        <p title="Copy" className="text-sm">
                          Copy
                        </p>
                      </>
                    ) : (
                      <>
                        <IoCopy className="mr-1.5" size={18} />
                        <p title="Link copied" className="text-sm">
                          Link copied
                        </p>
                      </>
                    )}
                  </button>
                </CopyToClipboard>
                <Input
                  type="text"
                  disabled
                  className="w-full pr-10 mb-2 bg-transparent placeholder:text-black dark:placeholder:text-white"
                  placeholder={`getcollabo.io/onboard/${searchName}`}
                />
              </div>
            </FormItem>
          </div>
          <NcImage src={ShareUs} />
        </section>
      </div>
    </div>
  );
};

export default Share;