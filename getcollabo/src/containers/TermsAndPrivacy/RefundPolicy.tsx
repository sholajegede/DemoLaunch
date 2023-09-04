import React from "react";
import Badge from "shared/Badge/Badge";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="##" color="green" name="Last updated: 21 August  2023" />
          <h1
            className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
            title="Refund Policy"
          >
            Refund policy
          </h1>
          <span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">
            Please read through carefully to understand our refund policy here
            at GetCollabo.
          </span>
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        <h3 className="text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          Who we are?
        </h3>
        <p>
          This website or mobile application (“Application”) is operated by
          Collabo Technologies Limited (“GetCollabo”, “we”, “us” and/or “our”),
          a registered Limited Liability Company registered in Nigeria with
          registration number 6942729. You can contact us as indicated under the
          {" "}<Link to="/contact">“Support”</Link> section in the main navigation.
        </p>

        <p>
          At GetCollabo, we are committed to providing you with an exceptional platform and experience that meets and exceeds your expectations. We understand that there might be instances where our platform might not align with your needs or preferences. To ensure your satisfaction and peace of mind, we offer a comprehensive refund policy that outlines the terms and conditions for requesting a refund within a specified timeframe.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          1. Refund Eligibility Period
        </h3>
        <p>
          Upon signing up and gaining access to our platform, you have a generous window of 14 days to evaluate the features, services, and overall functionality of GetCollabo. This 14-day period is designed to give you ample time to explore and determine whether our platform aligns with your requirements.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          2. Refund Request Process
        </h3>
        <p>Should you find that GetCollabo does not meet your expectations during the 14-day evaluation period, you have the option to request a full refund. The process is simple and user-friendly:</p>

        <ul>
          <li>
            <strong>Contact Support:</strong> Reach out to our dedicated customer support team via email or through our <Link to="/refund">designated refund portal</Link>. Please include your account information, the reason for your refund request, and any relevant details.
          </li>
          <li>
            <strong>Refund Review:</strong> Once we receive your refund request, our team will review the provided information. We may also request additional details to better understand your experience and any potential areas of improvement.
          </li>
          <li>
            <strong>Confirmation and Refund:</strong> After a thorough review, if your request meets our refund policy criteria, we will confirm your refund and initiate the reimbursement process. Depending on your original payment method, it might take a few business days for the funds to reflect in your account.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          3. Refund Policy Conditions
        </h3>
        <p>To ensure a fair and consistent approach to refund requests, certain conditions apply:</p>

        <ul>
          <li>
            Refund requests must be submitted within the initial 14-day evaluation period after gaining access to the GetCollabo platform.
          </li>
          <li>
            The refund will be granted only if you can provide a valid reason for your dissatisfaction with the platform.
          </li>
          <li>
            The refund applies to the cost of the platform subscription and does not cover any additional services, add-ons, or third-party charges.
          </li>
          <li>
            Once the refund is processed, your access to the GetCollabo platform will be deactivated.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          4. Non-Refundable Circumstances
        </h3>
        <p>While we strive to accommodate your needs, there are certain circumstances in which a refund request may not be approved:</p>

        <ul>
          <li>
            If the refund request is submitted after the 14-day evaluation period has expired.
          </li>
          <li>
            If you have previously received a refund for a GetCollabo subscription.
          </li>
          <li>
            If the refund request is not accompanied by a valid reason that aligns with our refund policy conditions.
          </li>
          <li>
            If there is evidence of misuse, abuse, or violation of our terms of service.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          5. Contact Us
        </h3>
        <p>
          If you have any questions or concerns regarding our refund policy or need assistance with the refund request process, our customer support team is here to help. Feel free to reach out to us via email at support@getcollabo.io or through our support portal at support.getcollabo.io.
        </p>
        <p>
          At GetCollabo, we value your trust and are dedicated to delivering a platform that empowers you to collaborate, create, and innovate. We are confident that our commitment to transparency and customer satisfaction, as demonstrated through this refund policy, will contribute to a positive and enriching experience for all our users.
        </p>
        <p>
          Sincerely,
        </p>
        <p>
          The Team at GetCollabo
        </p>
      </div>
    );
  };

  return (
    <div className="pt-8 nc-PageSingle lg:pt-16 ">
      <Helmet>
        <title>Privacy Policy</title>
        
        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getcollabo.io" />
        <meta property="og:title" content="GetCollabo" />
        <meta property="og:description" content="An all-in-one platform for creators to showcase their profiles & rate cards, communicate with brands, create & send invoices, receive payments, manage booking contracts, track multiple collaborations, and deliver content." />
        <meta property="og:image" content="https://res.cloudinary.com/newlink/image/upload/v1687711329/Screenshot_183_nouweo.png" />

        {/*-- Twitter --*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://getcollabo.io" />
        <meta name="twitter:title" content="GetCollabo" />
        <meta name="twitter:description" content="An all-in-one platform for creators to showcase their profiles & rate cards, communicate with brands, create & send invoices, receive payments, manage booking contracts, track multiple collaborations, and deliver content." />
        <meta name="twitter:image" content="https://res.cloudinary.com/newlink/image/upload/v1687711329/Screenshot_183_nouweo.png" />
      </Helmet>
      {renderHeader()}
      <div className="container mt-12 space-y-10 nc-SingleContent">
        {renderContent()}
      </div>
      <div className="relative py-16 lg:py-20"></div>
    </div>
  );
};

export default RefundPolicy;