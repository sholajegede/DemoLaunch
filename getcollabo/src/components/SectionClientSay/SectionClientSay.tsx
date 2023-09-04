// @ts-nocheck
import Glide from "@glidejs/glide";
import Heading from "components/Heading/Heading";
import React, { FC, useId } from "react";
import { useEffect } from "react";
import quotationImg from "images/quotation.png";
import quotationImg2 from "images/quotation2.png";

export interface SectionClientSayProps {
  className?: string;
}

const DEMO_DATA = [
  {
    id: 1,
    clientName: "Zara",
    image: "http://res.cloudinary.com/newlink/image/upload/v1681310412/getcollabo/wtggskryga5nvkn8gibb.jpg?auto",
    description: "Zara's Kitchen",
    clientAddress: "Ikeja, Lagos",
    content:
      "We cannot express how grateful we are for the incredible results we achieved through GetCollabo. Our restaurant's visibility skyrocketed, and we saw a significant increase in online orders. The user-friendly interface and targeted marketing options made it effortless for us to connect with our target audience. Thank you for helping us take our brand to new heights!",
  },
  {
    id: 2,
    clientName: "Kingsley",
    image: "http://res.cloudinary.com/newlink/image/upload/v1681310412/getcollabo/wtggskryga5nvkn8gibb.jpg?auto",
    description: "Naija Fashion Hub",
    clientAddress: "Yaba, Lagos",
    content:
      "Working with your platform has been a game-changer for our fashion brand. The exposure and engagement we received were beyond our expectations. The seamless collaboration with influencers, coupled with the platform's wide user base, helped us reach a vast number of potential customers. We are thrilled with the results and the positive impact it has had on our business.",
  },
  {
    id: 3,
    clientName: "James",
    image: "http://res.cloudinary.com/newlink/image/upload/v1681310412/getcollabo/wtggskryga5nvkn8gibb.jpg?auto",
    description: "AfroTech Solutions",
    clientAddress: "Maitama, Abuja",
    content:
      "As a tech startup, we were searching for a platform that we could use to effectively showcase our innovative products and services to a tech-savvy audience. Your platform provided the perfect solution! The support we received from your team was outstanding, and the analytics and insights offered valuable data for refining our marketing strategy. Thanks to your platform, we gained substantial traction and attracted numerous customers. Highly recommended!",
  },
  {
    id: 4,
    clientName: "Ifeoluwa",
    image: "http://res.cloudinary.com/newlink/image/upload/v1681310412/getcollabo/wtggskryga5nvkn8gibb.jpg?auto",
    description: "Nature's Bounty",
    clientAddress: "V.I, Lagos",
    content:
      "Our organic skincare brand flourished after leveraging the power of your platform. The influencer collaborations, helped us establish a strong brand presence and generate a significant increase in sales. We're truly grateful for GetCollabo!",
  },
  {
    id: 5,
    clientName: "Emily",
    image: "http://res.cloudinary.com/newlink/image/upload/v1681310412/getcollabo/wtggskryga5nvkn8gibb.jpg?auto",
    description: "Power Fitness Club",
    clientAddress: "Lekki, Lagos",
    content:
      "We owe a great deal of our success to your platform's marketing capabilities. Our fitness club experienced a surge in membership sign-ups and class bookings, thanks to the platform's effective targeting options.",
  },
];

const SectionClientSay: FC<SectionClientSayProps> = ({ className = "" }) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    const OPTIONS: Glide.Options = {
      type: 'slider',
      startAt: 0,
      focusAt: 0,
      gap: 0,
      perView: 1,
      autoplay: false,
      hoverpause: false,
      keyboard: true,
      bound: true,
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [UNIQUE_CLASS]);


  return (
    <div
      className={`nc-SectionClientSay relative ${className} `}
      data-nc-id="SectionClientSay"
    >
      <Heading desc="See what creators have to say about GetCollabo" isCenter>
        Creators love us ❤️
      </Heading>
      <div className="relative max-w-2xl mx-auto md:mb-16">
        <div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
          <img
            className="absolute -mr-16 opacity-50 md:opacity-100 lg:mr-3 right-full top-1"
            src={quotationImg}
            alt=""
          />
          <img
            className="absolute -ml-16 opacity-50 md:opacity-100 lg:ml-3 left-full top-1"
            src={quotationImg2}
            alt=""
          />
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
              {DEMO_DATA.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col items-center text-center glide__slide"
                >
                  {/*<img className="object-cover w-16 h-16 mb-8 rounded-full" src={item.image} alt="" />*/}
                  <span className="block text-base">{item.content}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {item.clientName}
                  </span>
                  <span className="block mt-1 text-base text-neutral-400">
                    {item.description}
                  </span>
                  <div className="flex items-center mt-2 space-x-2 text-lg text-neutral-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{item.clientAddress}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex items-center justify-center mt-10 glide__bullets"
            data-glide-el="controls[nav]"
          >
            {DEMO_DATA.map((item, index) => (
              <button
                key={item.id}
                className="w-2 h-2 mx-1 rounded-full glide__bullet bg-neutral-300 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
