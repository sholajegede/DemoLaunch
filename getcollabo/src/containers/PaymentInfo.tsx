// @ts-nocheck
import React, { FC, useContext, useState } from "react";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import Badge from "shared/Badge/Badge";
import MySwitch from "components/MySwitch";
import NcModal from "shared/NcModal/NcModal";

export interface PaymentInfoProps {
  className?: string;
}

const PaymentInfo: FC<PaymentInfoProps> = ({ className = "" }) => {
  const { influencer } = useContext(InfluencerAuthContext);

  const [showDemoModal, setShowDemoModal] = useState(false);

  const editing = [
    {
      name: "Bank Transfer (NGN)",
      link: "/edit-bank",
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -4 28 28"
          fill="none"
        >
          <g clipPath="url(#clip0_503_3076)">
            <rect
              x="0.25"
              y="0.25"
              width="27.5"
              height="19.5"
              rx="1.75"
              fill="white"
              stroke="#F5F5F5"
              strokeWidth="0.5"
            />
            <mask
              id="mask0_503_3076"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="28"
              height="20"
            >
              <rect
                x="0.25"
                y="0.25"
                width="27.5"
                height="19.5"
                rx="1.75"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
              />
            </mask>
            <g mask="url(#mask0_503_3076)">
              <rect x="18.6667" width="9.33333" height="20" fill="#189B62" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 20H9.33333V0H0V20Z"
                fill="#189B62"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_503_3076">
              <rect width="28" height="20" rx="2" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Bank Transfer (USD)",
      link: null,
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -4 28 28"
          fill="none"
        >
          <g clipPath="url(#clip0_503_3486)">
            <rect width="28" height="20" rx="2" fill="white" />
            <mask
              id="mask0_503_3486"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="28"
              height="20"
            >
              <rect width="28" height="20" rx="2" fill="white" />
            </mask>
            <g mask="url(#mask0_503_3486)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28 0H0V1.33333H28V0ZM28 2.66667H0V4H28V2.66667ZM0 5.33333H28V6.66667H0V5.33333ZM28 8H0V9.33333H28V8ZM0 10.6667H28V12H0V10.6667ZM28 13.3333H0V14.6667H28V13.3333ZM0 16H28V17.3333H0V16ZM28 18.6667H0V20H28V18.6667Z"
                fill="#D02F44"
              />
              <rect width="12" height="9.33333" fill="#46467F" />
              <g filter="url(#filter0_d_503_3486)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.66665 1.99999C2.66665 2.36818 2.36817 2.66666 1.99998 2.66666C1.63179 2.66666 1.33331 2.36818 1.33331 1.99999C1.33331 1.63181 1.63179 1.33333 1.99998 1.33333C2.36817 1.33333 2.66665 1.63181 2.66665 1.99999ZM5.33331 1.99999C5.33331 2.36818 5.03484 2.66666 4.66665 2.66666C4.29846 2.66666 3.99998 2.36818 3.99998 1.99999C3.99998 1.63181 4.29846 1.33333 4.66665 1.33333C5.03484 1.33333 5.33331 1.63181 5.33331 1.99999ZM7.33331 2.66666C7.7015 2.66666 7.99998 2.36818 7.99998 1.99999C7.99998 1.63181 7.7015 1.33333 7.33331 1.33333C6.96512 1.33333 6.66665 1.63181 6.66665 1.99999C6.66665 2.36818 6.96512 2.66666 7.33331 2.66666ZM10.6666 1.99999C10.6666 2.36818 10.3682 2.66666 9.99998 2.66666C9.63179 2.66666 9.33331 2.36818 9.33331 1.99999C9.33331 1.63181 9.63179 1.33333 9.99998 1.33333C10.3682 1.33333 10.6666 1.63181 10.6666 1.99999ZM3.33331 3.99999C3.7015 3.99999 3.99998 3.70152 3.99998 3.33333C3.99998 2.96514 3.7015 2.66666 3.33331 2.66666C2.96512 2.66666 2.66665 2.96514 2.66665 3.33333C2.66665 3.70152 2.96512 3.99999 3.33331 3.99999ZM6.66665 3.33333C6.66665 3.70152 6.36817 3.99999 5.99998 3.99999C5.63179 3.99999 5.33331 3.70152 5.33331 3.33333C5.33331 2.96514 5.63179 2.66666 5.99998 2.66666C6.36817 2.66666 6.66665 2.96514 6.66665 3.33333ZM8.66665 3.99999C9.03484 3.99999 9.33331 3.70152 9.33331 3.33333C9.33331 2.96514 9.03484 2.66666 8.66665 2.66666C8.29846 2.66666 7.99998 2.96514 7.99998 3.33333C7.99998 3.70152 8.29846 3.99999 8.66665 3.99999ZM10.6666 4.66666C10.6666 5.03485 10.3682 5.33333 9.99998 5.33333C9.63179 5.33333 9.33331 5.03485 9.33331 4.66666C9.33331 4.29847 9.63179 3.99999 9.99998 3.99999C10.3682 3.99999 10.6666 4.29847 10.6666 4.66666ZM7.33331 5.33333C7.7015 5.33333 7.99998 5.03485 7.99998 4.66666C7.99998 4.29847 7.7015 3.99999 7.33331 3.99999C6.96512 3.99999 6.66665 4.29847 6.66665 4.66666C6.66665 5.03485 6.96512 5.33333 7.33331 5.33333ZM5.33331 4.66666C5.33331 5.03485 5.03484 5.33333 4.66665 5.33333C4.29846 5.33333 3.99998 5.03485 3.99998 4.66666C3.99998 4.29847 4.29846 3.99999 4.66665 3.99999C5.03484 3.99999 5.33331 4.29847 5.33331 4.66666ZM1.99998 5.33333C2.36817 5.33333 2.66665 5.03485 2.66665 4.66666C2.66665 4.29847 2.36817 3.99999 1.99998 3.99999C1.63179 3.99999 1.33331 4.29847 1.33331 4.66666C1.33331 5.03485 1.63179 5.33333 1.99998 5.33333ZM3.99998 5.99999C3.99998 6.36819 3.7015 6.66666 3.33331 6.66666C2.96512 6.66666 2.66665 6.36819 2.66665 5.99999C2.66665 5.6318 2.96512 5.33333 3.33331 5.33333C3.7015 5.33333 3.99998 5.6318 3.99998 5.99999ZM5.99998 6.66666C6.36817 6.66666 6.66665 6.36819 6.66665 5.99999C6.66665 5.6318 6.36817 5.33333 5.99998 5.33333C5.63179 5.33333 5.33331 5.6318 5.33331 5.99999C5.33331 6.36819 5.63179 6.66666 5.99998 6.66666ZM9.33331 5.99999C9.33331 6.36819 9.03484 6.66666 8.66665 6.66666C8.29846 6.66666 7.99998 6.36819 7.99998 5.99999C7.99998 5.6318 8.29846 5.33333 8.66665 5.33333C9.03484 5.33333 9.33331 5.6318 9.33331 5.99999ZM9.99998 8C10.3682 8 10.6666 7.70152 10.6666 7.33333C10.6666 6.96514 10.3682 6.66666 9.99998 6.66666C9.63179 6.66666 9.33331 6.96514 9.33331 7.33333C9.33331 7.70152 9.63179 8 9.99998 8ZM7.99998 7.33333C7.99998 7.70152 7.7015 8 7.33331 8C6.96512 8 6.66665 7.70152 6.66665 7.33333C6.66665 6.96514 6.96512 6.66666 7.33331 6.66666C7.7015 6.66666 7.99998 6.96514 7.99998 7.33333ZM4.66665 8C5.03484 8 5.33331 7.70152 5.33331 7.33333C5.33331 6.96514 5.03484 6.66666 4.66665 6.66666C4.29846 6.66666 3.99998 6.96514 3.99998 7.33333C3.99998 7.70152 4.29846 8 4.66665 8ZM2.66665 7.33333C2.66665 7.70152 2.36817 8 1.99998 8C1.63179 8 1.33331 7.70152 1.33331 7.33333C1.33331 6.96514 1.63179 6.66666 1.99998 6.66666C2.36817 6.66666 2.66665 6.96514 2.66665 7.33333Z"
                  fill="url(#paint0_linear_503_3486)"
                />
              </g>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_503_3486"
              x="1.33331"
              y="1.33333"
              width="9.33331"
              height="7.66667"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_503_3486"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_503_3486"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_503_3486"
              x1="1.33331"
              y1="1.33333"
              x2="1.33331"
              y2="7.99999"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="#F0F0F0" />
            </linearGradient>
            <clipPath id="clip0_503_3486">
              <rect width="28" height="20" rx="2" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Bank Transfer (GPB)",
      link: null,
      icon: (
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -4 28 28"
          fill="none"
        >
          <g clipPath="url(#clip0_503_2952)">
            <rect width="28" height="20" rx="2" fill="white" />
            <mask
              id="mask0_503_2952"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="28"
              height="20"
            >
              <rect width="28" height="20" rx="2" fill="white" />
            </mask>
            <g mask="url(#mask0_503_2952)">
              <rect width="28" height="20" fill="#0A17A7" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M-1.28244 -1.91644L10.6667 6.14335V-1.33333H17.3334V6.14335L29.2825 -1.91644L30.7737 0.294324L21.3263 6.66667H28V13.3333H21.3263L30.7737 19.7057L29.2825 21.9165L17.3334 13.8567V21.3333H10.6667V13.8567L-1.28244 21.9165L-2.77362 19.7057L6.67377 13.3333H2.95639e-05V6.66667H6.67377L-2.77362 0.294324L-1.28244 -1.91644Z"
                fill="white"
              />
              <path
                d="M18.668 6.33219L31.3333 -2"
                stroke="#DB1F35"
                strokeWidth="0.666667"
                strokeLinecap="round"
              />
              <path
                d="M20.0128 13.6975L31.3666 21.3503"
                stroke="#DB1F35"
                strokeWidth="0.666667"
                strokeLinecap="round"
              />
              <path
                d="M8.00555 6.31046L-3.83746 -1.67099"
                stroke="#DB1F35"
                strokeWidth="0.666667"
                strokeLinecap="round"
              />
              <path
                d="M9.29006 13.6049L-3.83746 22.3105"
                stroke="#DB1F35"
                strokeWidth="0.666667"
                strokeLinecap="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 12H12V20H16V12H28V8H16V0H12V8H0V12Z"
                fill="#E6273E"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_503_2952">
              <rect width="28" height="20" rx="2" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Cryptocurrency",
      link: null,
      icon: (
        <svg
          className="h-10 w-9"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 511.998 511.998"
          xmlSpace="preserve"
        >
          <path
            style={{ fill: "#44423E" }}
            d="M503.916,397.661c0,16.188-13.122,29.311-29.309,29.311H37.393  c-16.188,0-29.309-13.124-29.309-29.311V114.336c0-16.188,13.122-29.31,29.309-29.31h437.212c16.188,0,29.309,13.123,29.309,29.31  v283.326L503.916,397.661L503.916,397.661z"
          />
          <circle
            style={{ fill: "#E7E8E3" }}
            cx="341.78"
            cy="256.42"
            r="118.57"
          />
          <g>
            <path
              style={{ fill: "#202121" }}
              d="M341.777,383.074c-69.837,0-126.653-56.816-126.653-126.653s56.816-126.653,126.653-126.653   S468.43,186.582,468.43,256.421S411.613,383.074,341.777,383.074z M341.777,145.936c-60.922,0-110.484,49.563-110.484,110.484   s49.563,110.484,110.484,110.484s110.484-49.563,110.484-110.484S402.698,145.936,341.777,145.936z"
            />
            <path
              style={{ fill: "#202121" }}
              d="M474.607,435.057H37.393C16.775,435.057,0,418.282,0,397.661V114.336   c0-20.62,16.775-37.394,37.393-37.394h437.212c20.619,0,37.393,16.775,37.393,37.394v31.459c0,4.466-3.618,8.084-8.084,8.084   s-8.084-3.618-8.084-8.084v-31.459c0-11.704-9.522-21.226-21.225-21.226H37.393c-11.704,0-21.225,9.522-21.225,21.226v283.326   c0,11.705,9.521,21.227,21.225,21.227h437.212c11.703,0,21.225-9.522,21.225-21.227V172.025c0-4.466,3.618-8.084,8.084-8.084   c4.466,0,8.084,3.618,8.084,8.084v225.637C512,418.282,495.226,435.057,474.607,435.057z"
            />
          </g>
          <g style={{ opacity: "0.15" }}>
            <path
              style={{ fill: "#202121" }}
              d="M28.922,397.661V114.336c0-16.188,13.124-29.31,29.311-29.31h-20.84   c-16.187,0-29.309,13.123-29.309,29.31v283.326c0,16.188,13.122,29.311,29.309,29.311h20.84   C42.047,426.973,28.922,413.849,28.922,397.661z"
            />
          </g>
          <path
            style={{ fill: "#F7931A" }}
            d="M340.257,338.355l5.891-23.565c24.106,4.286,42.314,2.676,49.816-19.284  c6.425-17.676,0-27.853-12.857-34.281c9.641-2.141,16.605-8.571,18.211-20.89c2.675-17.14-10.714-26.246-29.46-32.135l5.892-23.032  l-13.927-3.749l-5.355,22.497c-3.749-1.075-7.499-1.607-11.249-2.679l5.894-22.496l-13.927-3.748l-5.891,23.031  c-3.214-0.538-6.427-1.609-9.109-2.145l-19.281-4.82l-3.749,14.996l10.176,2.68c5.358,1.069,6.429,4.821,6.429,8.032l-6.429,26.247  c0.538,0,1.074,0,1.608,0.536c-0.535,0-1.07-0.536-1.608-0.536l-9.105,36.958c-0.536,1.609-2.676,4.286-6.426,3.214l-10.176-2.679  l-6.964,16.07l18.209,4.819c3.751,1.075,6.964,1.607,10.177,2.678l-5.892,23.569l13.926,3.749l5.892-23.031  c3.75,0.535,7.499,1.603,11.249,2.676l-5.89,23.03L340.257,338.355z M344.005,217.841c8.036,2.143,33.209,5.892,29.461,22.497  c-3.75,16.068-28.387,8.036-36.424,5.891L344.005,217.841z M325.796,291.224l7.499-31.067c9.64,2.675,40.171,6.962,35.884,25.176  C364.893,303.005,335.437,293.364,325.796,291.224z"
          />
          <g>
            <path
              style={{ fill: "#202121" }}
              d="M339.185,174.995l13.927,3.748l-5.894,22.496c3.749,1.071,7.5,1.604,11.249,2.679l5.355-22.497   l13.927,3.749l-5.892,23.032c18.746,5.891,32.136,14.996,29.46,32.135c-1.606,12.318-8.57,18.749-18.211,20.89   c12.857,6.429,19.282,16.604,12.857,34.281c-5.458,15.975-16.582,21.181-31.522,21.181c-5.595,0-11.725-0.731-18.294-1.898   l-5.891,23.565l-13.925-4.285l5.89-23.03c-3.749-1.074-7.499-2.142-11.249-2.676l-5.892,23.031l-13.926-3.749l5.892-23.569   c-3.213-1.07-6.428-1.603-10.177-2.677l-18.209-4.819l6.964-16.07l10.176,2.679c0.597,0.17,1.152,0.247,1.669,0.247   c2.722,0,4.307-2.107,4.758-3.461l9.105-36.958c0.538,0,1.074,0.536,1.608,0.536c-0.535-0.536-1.07-0.536-1.608-0.536l6.429-26.247   c0-3.211-1.07-6.963-6.429-8.032l-10.176-2.68l3.749-14.996l19.281,4.82c2.682,0.536,5.895,1.607,9.109,2.145L339.185,174.995    M358.142,250.134c7.132,0,13.553-2.216,15.323-9.798c3.748-16.605-21.425-20.354-29.461-22.497l-6.963,28.387   C341.285,247.358,350.158,250.134,358.142,250.134 M351.877,295.771c8.156,0,15.347-2.379,17.302-10.438   c4.287-18.214-26.245-22.5-35.884-25.176l-7.499,31.067C331.04,292.388,342.146,295.771,351.877,295.771 M339.185,158.826   c-2.841,0-5.659,0.749-8.155,2.209c-3.734,2.18-6.437,5.766-7.509,9.953l-1.938,7.575l-12.758-3.188   c-1.316-0.33-2.635-0.487-3.933-0.487c-7.245,0-13.836,4.904-15.673,12.25l-3.75,14.996c-2.147,8.587,3.008,17.303,11.568,19.558   l2.697,0.709l-4.1,16.741c0,0.001-0.001,0.003-0.001,0.005l-6.312,25.622c-1.234-0.291-2.476-0.43-3.701-0.43   c-6.313-0.001-12.22,3.714-14.832,9.741l-6.964,16.071c-1.872,4.322-1.768,9.245,0.289,13.484c2.056,4.238,5.857,7.37,10.41,8.575   l12.967,3.432l-2.02,8.083c-2.137,8.553,2.97,17.241,11.482,19.534l13.926,3.749c1.382,0.373,2.796,0.556,4.202,0.556   c0.712,0,1.423-0.047,2.128-0.14c1.311,0.895,2.776,1.61,4.369,2.101l13.925,4.286c1.555,0.477,3.159,0.715,4.756,0.715   c2.757,0,5.497-0.705,7.944-2.086c3.866-2.181,6.666-5.855,7.743-10.161l2.408-9.635c2.122,0.144,4.148,0.216,6.089,0.216   c29.526,0,41.732-17.349,46.771-31.97c5.194-14.394,4.364-27.363-2.05-37.755c4.284-5.557,7.086-12.484,8.163-20.503   c2.005-13.226-1.965-25.058-11.491-34.226c-3.929-3.781-8.817-7.099-14.776-10.011l2.356-9.215   c2.194-8.575-2.916-17.319-11.462-19.619l-13.927-3.749c-1.382-0.373-2.795-0.556-4.202-0.556c-0.556,0-1.109,0.028-1.662,0.085   c-1.443-0.973-3.071-1.73-4.845-2.208l-13.927-3.749C342.005,159.009,340.592,158.826,339.185,158.826L339.185,158.826z"
            />
            <path
              style={{ fill: "#202121" }}
              d="M173.625,156.716H60.389c-4.465,0-8.084-3.618-8.084-8.084s3.62-8.084,8.084-8.084h113.236   c4.465,0,8.084,3.618,8.084,8.084C181.709,153.095,178.09,156.716,173.625,156.716z"
            />
            <path
              style={{ fill: "#202121" }}
              d="M173.625,192.285H60.389c-4.465,0-8.084-3.618-8.084-8.084s3.62-8.084,8.084-8.084h113.236   c4.465,0,8.084,3.618,8.084,8.084S178.09,192.285,173.625,192.285z"
            />
          </g>
        </svg>
      ),
    },
  ];

  const renderDemoContent = () => {
    return (
      <div className="ml-1 mr-1">
        <iframe
          className="w-full h-80 rounded-2xl"
          src="https://www.youtube.com/embed/QmYJUUx0rTM"
          title="Brand Collaboration Management Tool for Creators: GetCollabo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <div className="mt-4 space-x-3">
          <ButtonSecondary
            sizeClass="px-5 py-2"
            onClick={() => {
              setShowDemoModal(false);
            }}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>

            <span>Close</span>
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PaymentInfo ${className}`} data-nc-id="PaymentInfo">
      <Helmet>
        <title>Payments</title>
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
                      Receive Payments
                    </div>
                  )}
                </Tab>
              </Tab.List>
            </div>
          </Tab.Group>

          <p
            onClick={() => setShowDemoModal(true)}
            className="inline-flex mt-4 mb-2 text-primary-6000"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>

            <span className="text-sm">Take a tour of Payments</span>
          </p>

          <div className="max-w-2xl">
            <span className="block mt-4 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
              Kindly update your preferred payment method(s).
            </span>
          </div>

          {/**

            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            <div className="mt-6 mb-6 space-y-5 sm:space-y-6 md:sm:space-y-8">
              <MySwitch label="Bank Transfer (NGN)" desc="Activate/Deactivate" />
              
            * <MySwitch
                label="Cryptocurrency (BTC/ETH)"
                desc="Activate/Deactivate"
              />
              * 
            </div>
          */}

          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

          <div className="mt-10 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div className="space-y-3">
              {editing.map((plan) =>
                plan.link ? (
                  <Link
                    to={plan.link}
                    key={plan.name}
                    typeof="button"
                    tabIndex={0}
                    className="relative flex px-3 py-4 border cursor-pointer rounded-xl hover:shadow-lg bg-gray-50 hover:bg-neutral-50 border-neutral-200 dark:border-neutral-700 sm:px-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                  >
                    <div className="flex items-center w-full">
                      <span>{plan.icon}</span>
                      <div
                        className={`ml-4 sm:ml-8 font-normal text-base sm:text-lg xl:text-lg relative`}
                      >
                        {plan.name}
                      </div>
                    </div>

                    <ButtonPrimary sizeClass="px-5 py-2" type="button">
                      Update
                    </ButtonPrimary>
                  </Link>
                ) : (
                  <div
                    key={plan.name}
                    tabIndex={0}
                    className="relative flex px-3 py-4 border cursor-pointer rounded-xl hover:shadow-lg bg-gray-50 hover:bg-neutral-50 border-neutral-200 dark:border-neutral-700 sm:px-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                  >
                    <div className="flex items-center w-full">
                      <span>{plan.icon}</span>
                      <div
                        className={`ml-4 sm:ml-8 font-normal text-base sm:text-lg xl:text-lg relative`}
                      >
                        {plan.name}

                        <Badge
                          className="absolute px-1 py-0.5 text-center -right-24"
                          color="green"
                          name="Coming soon"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      </div>

      <NcModal
        renderTrigger={() => null}
        isOpenProp={showDemoModal}
        renderContent={renderDemoContent}
        contentExtraClass="max-w-2xl"
        onCloseModal={() => setShowDemoModal(false)}
        modalTitle=""
      />
    </div>
  );
};

export default PaymentInfo;