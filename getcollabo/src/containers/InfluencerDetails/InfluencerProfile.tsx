// @ts-nocheck
import React, { FC, useState, useEffect } from "react";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import { Helmet } from "react-helmet";
import TimeCountDown from "./TimeCountDown";
import AccordionInfo from "./AccordionInfo";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { InfluencerData } from "routers/types";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import Input from "shared/Input/Input";

export interface InfluencerProfileProps {
  className?: string;
  isPreviewMode?: boolean;
  username?: string;
}

const InfluencerProfile: FC<InfluencerProfileProps> = ({
  className = "",
  isPreviewMode,
  username,
}) => {
  const [influencer, setInfluencer] = useState<InfluencerData>({});
  const [error, setError] = useState({});
  const [copy, setCopy] = useState(false);

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/get/${username}`)
      .then((response) => {
        if (response.data) {
          setInfluencer(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [username]);
  //

  const headerName = influencer?.username
    ? influencer.username.charAt(0).toUpperCase() +
      influencer.username.slice(1).toLowerCase()
    : "Creator";

  return (
    <div className={`nc-NftDetailPage ${className}`} data-nc-id="NftDetailPage">
      <Helmet>
        <title>{`${headerName}'s profile`}</title>
        <meta name="title" content={`${headerName}'s profile`} />
        <meta
          name="description"
          content={`Hi ${headerName}! This is your profile`}
        />
        <meta name="image" content={influencer.img} />

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:title" content={`${headerName}'s profile`} />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta
          property="og:description"
          content={`${influencer.username}'s profile`}
        />
        <meta property="og:image" content={influencer.img} />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@getcollabo" />
        <meta
          name="twitter:title"
          content={`${influencer.username}'s profile`}
        />
        <meta
          name="twitter:description"
          content={`${influencer.username}'s profile`}
        />
        <meta name="twitter:image" content={influencer.img} />
        <meta name="twitter:url" content="https://getcollabo.io/book/teetat" />
      </Helmet>

      <div className="flex flex-col mt-8 space-y-2 xl:pr-[650px] xl:pl-4 sm:space-y-0 sm:space-x-3">
        <FormItem label={<div>Shareable Rate Card Link</div>}>
          <div className="relative">
            <Input
              type="text"
              disabled
              className="w-full pr-10 mt-1"
              placeholder={`getcollabo.io/book/${influencer.username || "**********"}`}
            />
            <CopyToClipboard
              text={`https://getcollabo.io/book/${influencer.username}`}
              onCopy={() => setCopy(true)}
            >
              <button
                type="button"
                className="absolute inset-y-0 right-0 z-10 flex items-center px-3 text-white border-2 bg-primary-6000 dark:bg-primary-6000 border-primary-6000 rounded-2xl focus:outline-none"
              >
                {!copy ? (
                  <>
                    <IoCopyOutline className="mr-2" size={22} />
                    <p title="Copy booking link">Copy</p>
                  </>
                ) : (
                  <>
                    <IoCopy className="mr-2" size={22} />
                    <p title="Link copied">Link copied</p>
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>
        </FormItem>
      </div>

      {/* MAIn */}
      <main className="flex pl-4 pr-4 mt-10">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <div className="relative">
              <NcImage
                src={influencer.img}
                containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
              />
            </div>

            <AccordionInfo dataProp={influencer} />
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {/* ---------- 1 ----------  */}
              <div className="space-y-5 pb-9">
                <div className="flex items-center justify-between">
                  <Badge name="Active" color="green" />
                  <a
                    href={`https://twitter.com/intent/tweet?text=You%20can%20now%20easily%20contact%20and%20book%20me%20at%F0%9F%A4%A9:%0Ahttps%3A//getcollabo.io/book/${influencer?.username}%0A%0A%20%23getcollabo%20%23booking%20%23contactme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share via Twitter"
                  >
                    <div className="inline-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                      </svg>

                      <span className="ml-2 text-sm">Share on Twitter</span>
                    </div>
                  </a>
                </div>
                <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  {influencer.displayName}
                </h2>

                {/* ---------- 4 ----------  */}
                <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
                  <div className="flex items-center ">
                    <img
                      src={influencer.img}
                      alt=""
                      className="rounded-full h-9 w-9"
                    />
                    <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                      <span className="flex items-center font-medium capitalize text-neutral-900 dark:text-neutral-200">
                        <span>{influencer.username}</span>
                        {/**
                         *  <VerifyIcon />
                         */}
                      </span>
                      <span className="mt-1 text-sm capitalize">
                        {influencer.industry} Creator
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* ---------- 6 ----------  */}
              <div className="py-9">
                <TimeCountDown dataProp={influencer} />
              </div>

              {/* ---------- 7 ----------  */}
              {/* PRICE */}
              <div className="pt-9">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                  <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
                    <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                      Min. Book Rate
                    </span>
                    {influencer?.deliverable &&
                      influencer?.deliverable.length > 0 && (
                        <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                          NGN{" "}
                          <span className="ml-1">
                            {influencer.deliverable
                              .reduce(
                                (min, item) =>
                                  item.rate < min ? item.rate : min,
                                Number.MAX_SAFE_INTEGER
                              )
                              .toLocaleString()}
                          </span>
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfluencerProfile;