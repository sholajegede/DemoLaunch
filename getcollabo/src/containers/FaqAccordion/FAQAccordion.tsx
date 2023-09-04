import React, { useState } from 'react';

interface FAQAccordionItem {
  id: string;
  question: string;
  answer: string;
}

const accordionItems: FAQAccordionItem[] = [
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
    id: 'hs-basic-with-title-and-arrow-stretched-heading-four',
    question: 'Is GetCollabo exclusively for content creators, or can other professionals use it too?',
    answer: 'GetCollabo is designed to cater to a wide range of professionals, including content creators, influencers, and even brands looking to collaborate efficiently.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-five',
    question: 'Do the brands I collaborate with need to be registered on GetCollabo for a comprehensive experience?',
    answer: 'While having collaborating brands on GetCollabo enhances the seamless experience, the platform also lets you work with brands outside it, so your workflow stays complete and organized.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-six',
    question: 'Can GetCollabo assist in simplifying negotiation and agreement processes with brands?',
    answer: 'Certainly! GetCollabo offers legal contract templates for creators to choose from, streamlining processes and ensuring a secure and professional collaboration process for both you and brands. Plus, our personalized AI lawyer supports you every step of the way.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-seven',
    question: 'How does GetCollabo enhance the monetization potential of my creative projects?',
    answer: 'GetCollabo provides insights and tools to optimize your monetization strategies, helping you make the most of your creative projects and brand partnerships.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-eight',
    question: 'Is GetCollabo suitable for creators with various levels of experience?',
    answer: 'Absolutely, GetCollabo caters to creators at all experience levels, offering intuitive features that can be customized to match your unique workflow.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-nine',
    question: 'Can GetCollabo help me expand my network within the industry?',
    answer: "Yes, GetCollabo's networking and co-collaboration features allow you to connect with brands and fellow creators, and professionals, fostering valuable relationships that can lead to exciting collaborations.",
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-ten',
    question: 'Can GetCollabo assist me in tracking the performance of my collaborative content?',
    answer: 'Certainly, GetCollabo provides analytics that allow you to monitor the performance and impact of your collaborative content, helping you refine your strategies.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-eleven',
    question: 'Is GetCollabo suitable for creators working across multiple platforms and content types?',
    answer: 'Yes, GetCollabo is designed to support creators working across various platforms and content types, providing versatility and adaptability to your creative endeavors.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-twelve',
    question: 'How can GetCollabo help me in negotiating fair compensation for my collaborations?',
    answer: 'GetCollabo equips you with resources and insights to understand industry standards, aiding you in negotiating compensation that aligns with your value and reach.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-thirteen',
    question: 'Is GetCollabo a subscription-based service, and what are the pricing options?',
    answer: 'Yes, GetCollabo offers subscription plans with varying features and pricing tiers to accommodate different needs and budgets. Click here to view our pricing options.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-fourteen',
    question: 'Can GetCollabo assist me in post-collaboration activities, such as tracking deliverables and measuring success?',
    answer: 'Absolutely, GetCollabo provides tools to track project milestones, deliverables, and performance metrics, helping you gauge the success of your collaborations.',
  },
  {
    id: 'hs-basic-with-title-and-arrow-stretched-heading-fifteen',
    question: 'How can GetCollabo help me stay updated on the latest trends and opportunities in the creator industry?',
    answer: 'GetCollabo offers resources, insights, and industry updates, keeping you informed about emerging trends and opportunities for growth.',
  },
];

const FAQAccordion: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-5xl xl:text-5xl lg:text-4xl md:leading-tight dark:text-white">Creator FAQs</h2>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;