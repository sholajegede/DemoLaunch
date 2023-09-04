import React from "react";
import Badge from "shared/Badge/Badge";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="##" color="green" name="Last updated: 21 August  2023" />
          <h1
            className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
            title="Cookie Policy"
          >
            Cookie Policy
          </h1>
          <span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">
            This Cookie Policy explains how [GetCollabo] ("we," "us," or "our") uses cookies and similar tracking technologies on our website [https://getcollabo.io]. By using our website, you consent to the use of cookies as described in this policy.
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
          1. What are Cookies?
        </h3>
        <p>
          Cookies are small text files that are stored on your device (computer, tablet, smartphone) when you visit a website. They are widely used to make websites work efficiently, improve user experience, and provide website owners with valuable information about how users interact with their site.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          2. How We Use Cookies
        </h3>
        <p>
          We use cookies for the following purposes:
        </p>

        <ul>
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and provide basic features, such as page navigation and access to secure areas of the website. Without these cookies, the website may not perform as intended.
          </li>

          <li>
            <strong>Functional Cookies:</strong> These cookies allow the website to remember choices you make and provide enhanced, more personalized features. For example, remembering your username, language preferences, or region.
          </li>

          <li>
            <strong>Performance Cookies:</strong> We use these cookies to collect information about how visitors use our website. This data helps us understand how users interact with our content, identify areas for improvement, and optimize the website's performance.
          </li>

          <li>
            <strong>Analytics Cookies:</strong> These cookies are used to gather information about website usage and traffic. We use this data to analyze trends, track user movements, and improve the overall user experience.
          </li>

          <li>
            <strong>Advertising Cookies:</strong> Our website may display targeted advertisements based on your interests and browsing behavior. These cookies help us deliver more relevant ads to you.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          3. Third-Party Cookies
        </h3>

        <p>
          We may also allow third-party service providers to place cookies on your device through our website to perform services on our behalf. These cookies enable third-party features, such as social media integration, videos, and targeted advertising. We have no control over these third-party cookies, and their use is subject to the respective third party's privacy policies.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          4. Cookie Consent and Control
        </h3>

        <p>
          When you first visit our website, you will be presented with a cookie consent banner, which will allow you to accept or decline the use of non-essential cookies. You can also manage your cookie preferences through your browser settings or by using the cookie settings on our website.
        </p>

        <p>
          Please note that blocking or deleting cookies may affect your experience on our website and limit access to certain features.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          5. Data Privacy and Security
        </h3>

        <p>
          We value your privacy, and the use of cookies is subject to our Privacy Policy [include link to your Privacy Policy]. We take data protection seriously and implement appropriate security measures to safeguard your information.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          6. Updates to this Cookie Policy
        </h3>

        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices and legal obligations. Any updates will be posted on this page, and the "Last Updated" date will be revised accordingly.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          7. Contact Us
        </h3>

        <p>
          If you have any questions or concerns about our use of cookies or this Cookie Policy, please feel free to contact us at [<a href="mailto:support@getcollabo.io" className="underline">support@getcollabo.io</a>].
        </p>
      </div>
    );
  };

  return (
    <div className="pt-8 nc-PageSingle lg:pt-16 ">
      <Helmet>
        <title>Cookie Policy</title>
        
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

export default CookiePolicy;