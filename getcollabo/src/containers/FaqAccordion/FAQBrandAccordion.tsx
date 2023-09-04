import React, { useState } from 'react';
import Linkify from "react-linkify";

interface FAQBrandAccordionItem {
  id: string;
  question: string;
  answer: string;
}

const accordionItems: FAQBrandAccordionItem[] = [
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-one',
    question: "What is GetCollabo for Brands?",
    answer: "GetCollabo connects brands with content creators for collaborations. Brands can create easily find, contact, and book creators on the platform. We also securely handle communication, deliverables, and payments, making the collaboration process seamless and efficient.",
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-two',
    question: "How can I sign up as a brand on GetCollabo?",
    answer: 'To sign up as a brand on GetCollabo, simply click on this link: GetCollabo.io/create-brand. From there, follow the instructions to create an account and complete your brand registration. Once your account is approved, you get full access to all our features.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-three',
    question: "What types of collaborations can I get with creators on GetCollabo?",
    answer: 'You can get a variety of collaborations with creators on GetCollabo, such as sponsored posts on social media, blog posts, videos, product reviews, and more. You can easily communicate with creators on our platform to specify the type of content you want them to create.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-four',
    question: 'How many creators can I collaborate with at once on GetCollabo?',
    answer: 'There are no limits to the number of creators you can collaborate with on GetCollabo. You can choose to work with one or multiple creators, depending on the needs of your project/campaign.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-five',
    question: 'How does GetCollabo ensure creator content quality?',
    answer: 'We rigorously vet creators that appear on our marketplace to ensure quality and accept only those who meet required standards. Plus, brands can request revisions to ensure content meets their expectations.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-six',
    question: 'How do I communicate with creators throughout the collaboration?',
    answer: 'Our in-app messaging system enables seamless communication between brands and creators throughout the entire collaboration..',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-seven',
    question: 'How does GetCollabo handle disputes that arise during collaborations with creators?',
    answer: 'GetCollabo has a dispute resolution process to handle issues during collaboration. It works with both parties to find a fair solution.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-eight',
    question: 'Can I track the status of my collaborations with creators on GetCollabo?',
    answer: 'Absolutely, GetCollabo provides detailed analytics and performance metrics for each collaboration, allowing you to track the success of your campaigns and adjust your strategy accordingly.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-nine',
    question: 'Is it possible to negotiate rates or terms with creators on GetCollabo?',
    answer: "Yes, brands and creators can negotiate terms via GetCollabo. It provides a way to add custom deliverable, rate, and delivery terms.",
  },
];

const FAQBrandAccordion: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-5xl xl:text-5xl lg:text-4xl md:leading-tight dark:text-white">Brand FAQs</h2>
            <p className="mt-1 text-gray-600 md:block dark:text-gray-400">Answers to the most frequently asked questions.</p>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="divide-y divide-gray-200 hs-accordion-group dark:divide-gray-700">
            {accordionItems.map((item) => (
              <div className={`hs-accordion pt-6 pb-3 ${activeAccordion === item.id ? 'active' : ''}`} key={item.id}>
                <button
                  className="inline-flex items-center justify-between w-full pb-3 font-semibold text-left text-gray-800 transition hs-accordion-toggle group gap-x-3 md:text-lg hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                  onClick={() => toggleAccordion(item.id)}
                  aria-controls={`hs-${item.id}-collapse`}
                  aria-expanded={activeAccordion === item.id}
                >
                  <span className={`hs-accordion-title ${activeAccordion === item.id ? 'text-primary-6000 group-hover:text-gray-500 dark:text-primary-6000' : 'group-hover:text-gray-500'}`}>{item.question}</span>
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
        </div>
      </div>
    </div>
  );
};

export default FAQBrandAccordion;