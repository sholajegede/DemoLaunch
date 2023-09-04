import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import BrandDashboardPage from "containers/Dashboards/BrandDashboardPage";
import AccountPage from "containers/AccountPage/AccountPage";
import CreateAccountPage from "containers/AccountPage/CreateAccountPage";
import CreateInfluencerAccountPage from "containers/AccountPage/CreateInfluencerAccountPage";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import BrandLogin from "containers/PageLogin/BrandLogin";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import SiteHeader from "containers/SiteHeader";
import InfluencerDetailPage from "containers/InfluencerDetails/InfluencerDetailPage";
import PageSearch from "containers/PageSearch";
import PageHome2 from "containers/PageHome/PageHome2";
import InfluencerUpdated from "containers/AccountUpdated/InfluencerUpdated";
import BrandUpdated from "containers/AccountUpdated/BrandUpdated";
import SignUp from "containers/Onboard/SignUp";
import Login from "containers/Onboard/Login";
import PaymentComplete from "containers/PaymentComplete";
import ChangePasswordInfluencer from "containers/ChangePasswordInfluencer";
import ForgotPasswordInfluencer from "containers/ForgotPasswordInfluencer";
import ForgotPasswordBrand from "containers/ForgotPasswordBrand";
import VerifyInfluencerOTP from "containers/VerifyInfluencerOTP";
import VerifyBrand from "containers/VerifyBrand";
import ResetSuccessful from "containers/ResetSuccessful";
import BrandVerified from "containers/BrandVerified";
import VerifyBrandOTP from "containers/VerifyBrandOTP";
import ChangePasswordBrand from "containers/ChangePasswordBrand";
import BrandChat from "containers/ChatsPage/BrandChat";
import BrandRegistration from "containers/AccountPage/BrandRegistration";
import InfluencerVerified from "containers/InfluencerVerified";
import VerifyInfluencer from "containers/VerifyInfluencer";
import PrivacyPolicy from "containers/TermsAndPrivacy/PrivacyPolicy";
import Terms from "containers/TermsAndPrivacy/Terms";
//import PageFaq from "containers/PageFaq/PageFaq";
import BuildProfile from "containers/AccountPage/BuildProfile";
import Pricing from "containers/PageSubcription/Pricing";
import InfluencerLoggedOut from "containers/PageLoggedOut/InfluencerLogin";
import BrandLoggedOff from "containers/PageLoggedOut/BrandLogin";
//import Collaborate from "containers/PageHome/Collaborate";
import PageSurvey from "containers/PageSurvey";
import PageProposals from "containers/Proposals/PageProposals";
import PayInvoice from "containers/CreatorInvoice/PayInvoice";
import PageBook from "containers/CreatorInvoice/PageBook";
import BrandInvoice from "containers/Dashboards/BrandInvoice";
import ResetSuccessfulInfluencer from "containers/ResetSuccessfulInfluencer";
import CookieBanner from "containers/Cookies/CookieBanner";
import CookiePolicy from "containers/Cookies/CookiePolicy";
import Invoices from "containers/NewDashboard/Invoices";
import Dashboard from "containers/NewDashboard/Dashboard";
import Support from "containers/NewDashboard/Support";
import Messages from "containers/NewDashboard/Messages";
import Payments from "containers/NewDashboard/Payments";
import Settings from "containers/NewDashboard/Settings";
import Proposals from "containers/NewDashboard/Proposals";
import RateCard from "containers/NewDashboard/RateCard";
import Contracts from "containers/NewDashboard/Contracts";
import Deliverables from "containers/NewDashboard/Deliverables";
import EditDeliverables from "containers/NewDashboardEdit/EditDeliverables";
import CreateInvoice from "containers/NewDashboardEdit/CreateInvoice";
import EditPayments from "containers/NewDashboardEdit/EditPayments";
import GeneralInfo from "containers/NewDashboardEdit/GeneralInfo";
import PasswordUpdate from "containers/NewDashboardEdit/PasswordUpdate";
import ViewDeliverable from "containers/NewDashboardEdit/ViewDeliverable";
import PreviewingInvoice from "containers/NewDashboardEdit/PreviewingInvoice";
import CreateDeliverableInvoice from "containers/NewDashboardEdit/CreateDeliverableInvoice";
import Videos from "containers/NewDashboardEdit/Videos";
import Socials from "containers/NewDashboardEdit/Socials";
import DeliverContent from "containers/NewDashboardEdit/DeliverContent";
import ChatInvoice from "containers/NewDashboardEdit/ChatInvoice";
import TaskManager from "containers/NewDashboard/TaskManager";
import InfluencerAccount from "containers/VerifyAccount/InfluencerAccount";
import BrandAccount from "containers/VerifyAccount/BrandAccount";
import Success from "containers/StripePages/Success";
import Failed from "containers/StripePages/Failed";
import Banner from "containers/Banner/Banner";
import Share from "containers/Page404/Share";
import OnboardUser from "containers/AccountPage/OnboardUser";
import FindCreators from "containers/Page404/FindCreators";
import CreateInfluencerPage from "containers/SubscriptionFlow/CreateInfluencerPage";
import Verify from "containers/SubscriptionFlow/Verify";
import Verified from "containers/SubscriptionFlow/Verified";
import Subscription from "containers/NewDashboardEdit/Subscription";
import SubPlan from "containers/NewDashboardEdit/SubPlan";
import MessageConvo from "containers/NewDashboardEdit/MessageConvo";
import MainChatBrand from "containers/ChatsPage/MainChatBrand";
import BannerBrand from "containers/Banner/BannerBrand";
import FAQs from "containers/PageFaq/FAQs";
import Welcome from "containers/NewDashboard/Welcome";
import PaymentNotification from "containers/FlutterwavePage/PaymentNotification";
import RefundPolicy from "containers/TermsAndPrivacy/RefundPolicy";
import PageRefund from "containers/PageContact/PageRefund";
import { CrispProvider } from "components/CrispChat/CrispProvider";
import SubscriptionRoutes from "containers/AB-ROUTING/SubscriptionRoutes";
import HowToRateCard from "containers/PagePromote/HowToRateCard";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome2 },
  { path: "/#", exact: true, component: PageHome2 },

  //{ path: "/collaborate", exact: true, component: Collaborate },

  { path: "/share/:searchName", component: Share },

  { path: "/creators", component: FindCreators },

  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },

  //Sign Up or Login Pages
  { path: "/signup", component: SignUp },
  { path: "/login", component: Login },

  //Pricing Page
  { path: "/pricing", component: Pricing },
  { path: "/privacy", component: PrivacyPolicy },
  { path: "/terms", component: Terms },
  { path: "/cookies", component: CookiePolicy },

  //Refund Policy
  { path: "/refund-policy", component: RefundPolicy },
  { path: "/refund", component: PageRefund },

  //FAQs
  { path: "/faqs", component: FAQs },
  { path: "/survey", component: PageSurvey },

  //-----------------------------------------------------------------//

  //Brand Signup
  { path: "/create-brand", component: CreateAccountPage },
  { path: "/complete-registration", component: BrandRegistration },
  { path: "/verifyBrand", component: VerifyBrand },
  { path: "/brand-verified", component: BrandVerified },

  //NOT VERIFIED
  { path: "/verify-email/brand", component: BrandAccount },

  //Brand
  { path: "/login-brand", component: BrandLogin },
  { path: "/logged-off", component: BrandLoggedOff },
  { path: "/brand", component: BrandDashboardPage },
  { path: "/received/invoices", component: BrandInvoice },

  { path: "/created/proposals", component: PageProposals },
  { path: "/update/:id", component: AccountPage },
  { path: "/brand-updated", component: BrandUpdated },
  { path: "/search", component: PageSearch },

  //Creator Landing
  { path: "/book/:username", component: InfluencerDetailPage },

  //Brand Chat
  { path: "/messages", component: MainChatBrand },


  { path: "/message/:chatId", component: MainChatBrand },

  //Booking & Invoice Payments
  { path: "/deliverable/:username/:deliverableId", component: PageBook },
  { path: "/pay/:username/:invoiceId", component: PayInvoice },
  { path: "/confirmed", component: PaymentComplete },

  //Password Reset
  { path: "/forgot-password-brand", component: ForgotPasswordBrand },
  { path: "/verifyBrandOTP/:email", component: VerifyBrandOTP },
  { path: "/reset-password-brand", component: ChangePasswordBrand },
  { path: "/reset-successful", component: ResetSuccessful },

  //-----------------------------------------------------------------//

  //Creator Signup
  { path: "/create-profile", component: CreateInfluencerAccountPage },
  { path: "/onboard/:userName", component: OnboardUser },

  //SUBSCRIPTION FLOW
  { path: "/create/:priceId/:amount", component: CreateInfluencerPage },
  { path: "/verify/:priceId/:amount", component: Verify },
  { path: "/verified/:priceId/:amount", component: Verified },

  { path: "/build-profile/:id", component: BuildProfile },
  { path: "/verifyCreator", component: VerifyInfluencer },
  { path: "/creator-verified", component: InfluencerVerified },

  //NOT VERIFIED
  { path: "/verify-email/creator", component: InfluencerAccount },

  //Creator
  { path: "/login-creator", component: InfluencerLogin },
  { path: "/logged-out", component: InfluencerLoggedOut },

  //{ path: "/contracts/:id", component: BookingContract },

  { path: "/profile-updated", component: InfluencerUpdated },

  //Password Reset
  { path: "/forgot-password-creator", component: ForgotPasswordInfluencer },
  { path: "/verifyCreatorOTP/:email", component: VerifyInfluencerOTP },
  { path: "/reset-password-creator", component: ChangePasswordInfluencer },
  { path: "/successful", component: ResetSuccessfulInfluencer },

  //MAIN DASHBOARD - CREATOR
  { path: "/welcome", component: Welcome },
  { path: "/dashboard", component: Dashboard },
  { path: "/invoices", component: Invoices },
  { path: "/support", component: Support },
  { path: "/chat", component: Messages },
  { path: "/convo/:chatId", component: MessageConvo },
  { path: "/payments", component: Payments },
  { path: "/settings", component: Settings },
  { path: "/proposals", component: Proposals },
  { path: "/card", component: RateCard },
  { path: "/contracts", component: Contracts },
  { path: "/deliverables", component: Deliverables },
  { path: "/tasks", component: TaskManager },

  //EDIT DASHBOARD - CREATOR
  { path: "/edit-deliverables", component: EditDeliverables },
  { path: "/invoice", component: CreateInvoice },
  { path: "/preview/:invoiceId", component: PreviewingInvoice },
  { path: "/edit-bank", component: EditPayments },
  { path: "/general-info", component: GeneralInfo },
  { path: "/password-update", component: PasswordUpdate },
  { path: "/view/:username/:deliverableId", component: ViewDeliverable },
  { path: "/invoiceNew/:deliverableId", component: CreateDeliverableInvoice },
  { path: "/chatInvoice/:businessName", component: ChatInvoice },
  { path: "/subscription", component: Subscription },

  { path: "/change-plan", component: SubPlan },

  { path: "/socials", component: Socials },
  { path: "/videos", component: Videos },

  { path: "/submit/:username/:indexId", component: DeliverContent },

  //STRIPE PAGES
  { path: "/success", component: Success },
  { path: "/failed", component: Failed },


  //FLUTTERWAVE
  { path: "/payment-notification", component: PaymentNotification },


  //PROMOTIONAL LINKS
  { path: "/influencer-rate-card", component: HowToRateCard },
];

const Routes = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <CrispProvider />
        <ScrollToTop />
        <Banner />
        <BannerBrand />
        <SiteHeader />
        <Switch>
          {pages.map(({ component, path, exact }) => {
            return (
              <Route
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          })}
          <Route component={Page404} />
        </Switch>
        <Footer />
        <CookieBanner />
      </BrowserRouter>
    </>
  );
};

export default Routes;