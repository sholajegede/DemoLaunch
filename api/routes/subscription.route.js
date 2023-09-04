import express from "express";
import {
    //STRIPE
    getSubscriptions,
    purchasePlan,
    getCustomer,
    getCardDetails,
    getInvoicesByCustomer,
    getSingleSub,
    getPaymentMethod,
    noTrialPlan,
    cancelSubscription,

    //PAYSTACK
    getPaystackPlans,
    paystackPurchasePlan,
    paystackSubscribeCustomer,
    getPaystackCustomer,
    getPaystackCustomerSubscription,
    paystackCancelSubscription,
    updatePaystackSubscriptionCard,
    getPaystackCustomerTransactions,
} from "../controllers/subscription.controller.js";

const router = express.Router();

//PAYSTACK
router.get("/paystack/plans", getPaystackPlans);

router.post("/paystack/initialize-transaction", paystackPurchasePlan);

router.get("/paystack/customer/:customerCode", getPaystackCustomer);

router.get("/paystack/subscriptions/:subCode", getPaystackCustomerSubscription);

router.post("/paystack/subscribe", paystackSubscribeCustomer)

router.delete("/paystack/disable/:subCode/:emailToken", paystackCancelSubscription);

router.get("/paystack/card/update/:subCode", updatePaystackSubscriptionCard);

router.get("/paystack/transactions/:customerCode", getPaystackCustomerTransactions);




//STRIPE
router.get("/plans", getSubscriptions);

router.get("/customer/:stripeCustomerId", getCustomer);

router.get("/card/:stripeCustomerId", getCardDetails);

router.get("/invoices/:stripeCustomerId", getInvoicesByCustomer);

router.get("/paymentMethod/:paymentMethodId", getPaymentMethod);

router.get("/single/:subscriptionCode", getSingleSub);

router.post("/purchase", purchasePlan);

router.post("/noTrial", noTrialPlan);

router.delete("/cancel/:subscriptionId", cancelSubscription);

export default router;