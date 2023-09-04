import { ComponentType } from "react";


export interface LocationStates {
  //Navigation
  "/"?: {};
  "/#"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/pricing"?: {};
  "/packages"?: {};
  "/collaborate"?: {};


  "/creators"?: {};

  "/share/:searchName"?: {};


  "/success"?: {};
  "/payment-notification"?: {};
  "/failed"?: {};
  "/subscription"?: {}; 
  "/change-plan"?: {}; 


  "/verify-email/creator"?: {};
  "/verify-email/brand"?: {};

  "/socials"?: {};
  "/videos"?: {};

  "/settings"?: {};
  "/contracts"?: {};

  "/edit-card"?: {};
  "/edit-contract"?: {};

  "/preview-card"?: {};



  "/test-dashboard"?: {};

  "/terms"?: {};
  "/privacy"?: {};
  "/refund-policy"?: {};
  "/refund"?: {};
  "/cookies"?: {};
  "/faqs"?: {};
  "/survey"?: {};

  //Blog
  "/blog"?: {};
  "/blog-single"?: {};

  //404
  "/page404"?: {};

  //Tests
  "/test"?: {};

  //Auth
  "/signup"?: {};
  "/login"?: {};

  //Messages
  "/messages"?: {};
  "/message/:chatId"?: {};


  "/chat"?: {};
  "/convo/:chatId"?: {};

  
  "/payments"?: {};

  

  "/received/invoices"?: {};
  "/created/proposals"?: {};


  //-----------------------------------------------------------------//

  //Brand
  "/create-brand"?: {};
  "/complete-registration"?: {};
  "/verifyBrand"?: {};
  "/brand-verified"?: {};

  //
  "/login-brand"?: {};
  "/logged-off"?: {}; 

  "/brand"?: {};
  "/update"?: {};
  "/update/:id"?: {};
  "/brand-updated"?: {};
  "/search"?: {};
  "/proposals"?: {};
  "/book"?: {};
  "/book/:username"?: {};
  "/booking"?: {};
  "/deliverable/:username/:deliverableId"?: {};

  //
  "/chat/:username"?: {};
  "/newMessage/:username"?: {};

  //
  "/order"?: {};
  "/pay"?: {};
  "/order/:username/:deliverableId"?: {};
  "/pay/:username/:invoiceId"?: {};
  "/custom-booking/:username"?: {};
  "/confirmed"?: {};

  //
  "/forgot-password-brand"?: {};
  "/verifyBrandOTP"?: {};
  "/verifyBrandOTP/:email"?: {};
  "/reset-password-brand"?: {};
  "/reset-successful"?: {};
  "/successful"?: {};
  


  //-----------------------------------------------------------------//

  //Influencer
  "/create-profile"?: {};
  "/onboard/:userName"?: {};

  //SUBSCRIPTION FLOW
  "/create/:priceId/:amount"?: {};
  "/verify/:priceId/:amount"?: {};
  "/verified/:priceId/:amount"?: {};



  //
  "/build-profile/:id"?: {};
  "/add-profiles/:id"?: {};


  "/verifyCreator"?: {};
  "/creator-verified"?: {};

  //
  "/login-creator"?: {}; 
  "/logged-out"?: {}; 

  "/dashboard"?: {};
  "/welcome"?: {}; 
  "/invoices"?: {};
  "/card"?: {};
  "/support"?: {};
  "/submit/:username/:indexId"?: {};
  "/edit-bank"?: {};
  "/edit-profile"?: {};

  //Edits
  "/edit-profile/:id"?: {};
  "/edit-bank/:id"?: {};
  "/general-info"?: {};
  "/edit-deliverables"?: {};
  "/sample-videos/:id"?: {};

  "/password-update"?: {};
  "/contracts/:id"?: {};
  "/payment-info/:id"?: {};

  
  "/deliverables"?: {};
  "/tasks"?: {};
  "/deliverables/edit/:id"?: {};

  "/profile-updated"?: {};

  //
  "/chat/:businessName"?: {};
  "/chatInvoice/:businessName"?: {};
  "/invoiceNew/:deliverableId"?: {};
  "/invoice"?: {};
  "/preview/:invoiceId"?: {};
  "/view/:username/:deliverableId"?: {};

  //
  "/forgot-password-creator"?: {};
  "/verifyCreatorOTP"?: {};
  "/verifyCreatorOTP/:email"?: {};
  "/reset-password-creator"?: {};
  "/creator-reset-successful"?: {};




  //-----------------------------------------------------------------//
  // PROMOTIONAL LINKS
  //-----------------------------------------------------------------//

  "/influencer-rate-card"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}

export interface Deliverable {
  rate: number;
}

export type InfluencerType = {
  rate: number;
  deliverable: Deliverable[];
  influencerId: number;
  stripeCustomerId: string;
  paystackCustomerId: string;
  _id: number;
  displayName: string;
  username: string;
  industry: string;
  platforms: [string];
  bookingStartRate: number;
  location: string;
  img: string;
  about: string;
  deliverables: [string];
  featured: boolean;
  count: number;
  verified: boolean;
  followers: number;
  audienceCount: [string, number];
  rating: number;
  platform: string;
  instagram: number;
  facebook: number;
  tiktok: number;
  twitter: number;
  price: number;
}

export interface LocationState {
  industry: string;
  industryInputValue: string;
  priceInputValue: number;
  split: string;
  influencer: string;
  username: string;
}

export interface InfluencerData {
  socialLinks: [];
  email: string;
  rate: number;
  deliveryTime: string;
  description: string;
  theinfluencer: string;
  deliverable: string;
  audience: string;
  influencerId: number;
  stripeCustomerId: string;
  paystackCustomerId: string;
  _id: number;
  img: string;
  displayName: string;
  username: string;
  industry: string;
  platforms: [string];
  bookingStartRate: number;
  location: string;
  photos: [];
  about: string;
  deliverables: [string];
  featured: boolean;
  count: number;
  verified: boolean;
  followers: number;
  audienceCount: [string, number];
  rating: number;
  platform: string;
  instagram: number;
  facebook: number;
  tiktok: number;
  twitter: number;
  price: number;
}

export interface BrandData {
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  logo: string;
  businessName: string;
  email: string;
  phone: number;
  desc: string;
}

export interface InfluencerProfileData {
  audience: string;
  influencerId: number;
  stripeCustomerId: string;
  paystackCustomerId: string;
  _id: number;
  img: string;
  displayName: string;
  username: string;
  industry: string;
  platforms: [string];
  bookingStartRate: number;
  location: string;
  photos: [];
  about: string;
  deliverables: [string];
  featured: boolean;
  count: number;
  verified: boolean;
  followers: number;
  audienceCount: [string, number];
  rating: number;
  platform: string;
  instagram: number;
  facebook: number;
  tiktok: number;
  twitter: number;
  price: number;
};

export interface BrandProfileData {
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  logo: string;
  businessName: string;
  email: string;
  phone: number;
  desc: string;
}