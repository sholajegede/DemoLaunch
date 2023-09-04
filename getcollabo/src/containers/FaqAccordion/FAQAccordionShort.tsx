import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Linkify from "react-linkify";
import NcImage from 'shared/NcImage/NcImage';

interface FAQAccordionShortItem {
  id: string;
  question: string;
  answer: string;
}

const accordionItems: FAQAccordionShortItem[] = [
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-one',
    question: "Can I get found and booked by brands on GetCollabo?",
    answer: "Absolutely, our goal is to simplify brand collaborations for creators. We've developed an extensive marketplace accessible to brands, enhancing creators' discoverability and expanding their opportunities both locally and globally, all within our platform.",
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-two',
    question: "What benefits does GetCollabo offer to creators like me?",
    answer: 'As a creator, GetCollabo empowers you with tools to simplify your workflow, manage brand collaborations seamlessly, maximize your creative potential, and grow the business side of being a creator.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-three',
    question: "What tools are available for me on GetCollabo?",
    answer: 'We have an array of tools for creators, including a customizable rate card (with a personalized booking link), brand proposals, shareable deliverables, invoicing, contract management, in-app messaging, collaboration tracking, content delivery, and more.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-five',
    question: 'Do the brands I collaborate with need to be signed up on GetCollabo?',
    answer: 'While having collaborating brands on GetCollabo enhances the seamless experience, the platform also lets you work with brands outside it, so your workflow stays complete and organized.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-six',
    question: 'Can GetCollabo assist in simplifying agreements with brands?',
    answer: 'Certainly! GetCollabo offers legal contract templates for creators to choose from, streamlining processes and ensuring a secure and professional collaboration process for both you and brands. Plus, our personalized AI lawyer supports you every step of the way.',
  },
];

const FAQAccordionShort: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-5xl xl:text-5xl lg:text-4xl md:leading-tight dark:text-white">FAQs</h2>
            <p className="mt-1 text-gray-600 md:block dark:text-gray-400">Answers to the most frequently asked questions.</p>
          </div>
          <NcImage className="w-100 h-100" src="https://img.icons8.com/plasticine/100/faq.png" alt="faq" />
        </div>

        <div className="md:col-span-3">
          <div className="divide-y divide-gray-200 hs-accordion-group dark:divide-gray-700">
            {accordionItems.map((item) => (
              <div className={`hs-accordion pt-6 pb-3 ${activeAccordion === item.id ? 'active' : ''}`} key={item.id}>
                <button
                  className="inline-flex items-center justify-between w-full pb-3 font-medium text-left text-gray-800 transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                  onClick={() => toggleAccordion(item.id)}
                  aria-controls={`hs-${item.id}-collapse`}
                  aria-expanded={activeAccordion === item.id}
                >
                  <span className={`hs-accordion-title ${activeAccordion === item.id ? 'text-primary-6000 group-hover:text-primary-6000 dark:text-primary-6000' : 'group-hover:text-gray-500'}`}>{item.question}</span>
                  <svg
                    className={`hs-accordion-active ${activeAccordion === item.id ? 'hidden' : 'block'} w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg
                    className={`hs-accordion-active ${activeAccordion === item.id ? 'block' : 'hidden'} w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  id={`hs-${item.id}-collapse`}
                  className={`hs-accordion-content ${activeAccordion === item.id ? 'block' : 'hidden'} w-full overflow-hidden transition-[height] duration-300`}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Linkify
                      componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a
                          href={decoratedHref}
                          key={key}
                          className="font-semibold underline text-primary-6000"
                        >
                          {decoratedText}
                        </a>
                      )}
                    >
                      {item.answer}
                    </Linkify>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 mb-4">
            <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
              For our full FAQs, {` `}
              <Link
                className="text-green-600 underline hover:no-underline"
                to="/faqs"
              >
                Click here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordionShort;