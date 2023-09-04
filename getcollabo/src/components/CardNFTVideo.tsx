// @ts-nocheck
import React, { FC } from "react";
import {
  InstagramEmbed,
  YouTubeEmbed,
  TwitterEmbed,
  TikTokEmbed,
  FacebookEmbed,
  LinkedInEmbed,
  PinterestEmbed
} from "react-social-media-embed";

export interface CardNFTVideoProps {
  className?: string;
  url?: { video: string; title: string };
}

const CardNFTVideo: FC<CardNFTVideoProps> = ({
  className = "",
  url = { video: "", title: "" },
}) => {
  return (
    <div
      className={`nc-CardNFTVideo relative flex-col group ${className}`}
      data-nc-id="CardNFTVideo"
    >
      {url.video.includes("res.cloudinary.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] h-[505px] bg-transparent">
          <video
            className="object-cover w-[300px] h-[505px] rounded-2xl overflow-hidden z-0"
            playsInline
            loop
            controls
          >
          <source src={url.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : url.video.includes("instagram.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] bg-transparent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InstagramEmbed url={url.video} width={300} height={505} />
          </div>
        </div>
      ) : url.video.includes("tiktok.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] bg-transparent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TikTokEmbed url={url.video} width={300} height={505} />
          </div>
        </div>
      ) : url.video.includes("youtube.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] bg-transparent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <YouTubeEmbed url={url.video} width={300} height={505} />
          </div>
        </div>
      ) : url.video.includes("facebook.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] bg-transparent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FacebookEmbed url={url.video} width={300} height={505} />
          </div>
        </div>
      ) : url.video.includes("linkedin.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] bg-transparent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LinkedInEmbed url={url.video} width={300} height={505} />
          </div>
        </div>
      ) : url.video.includes("pinterest.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] bg-transparent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PinterestEmbed url={url.video} width={300} height={505} />
          </div>
        </div>
      ) : url.video.includes("twitter.com") || url.video.includes("x.com") ? (
        <div className="rounded-[1.5rem] overflow-hidden w-[300px] bg-transparent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TwitterEmbed url={url.video} width={300} height={505} />
          </div>
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2
            className={`sm:text-base font-medium text-neutral-500 dark:text-neutral-400`}
          >
            {url.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardNFTVideo;