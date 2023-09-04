import { stripe } from "../utils/stripe.js";
import Paystack from '@paystack/paystack-sdk';
import Influencer from "../models/influencer.js";
import axios from 'axios';

// PAYSTACK APIS
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

export const getPaystackPlans = async (req, res) => {
  try {
    const fetchPlansResponse = await paystack.plan.list({});

    if (!fetchPlansResponse.status) {
      console.log('Error fetching plans: ', fetchPlansResponse.message);
      return res
        .status(400)
        .send(`Error fetching plans: ${fetchPlansResponse.message}`);
    }

    return res.status(200).send(fetchPlansResponse.data);
  } catch (error) {
    next(error);
    console.error("Error occurred while fetching plans:", error);
    return res.status(500).json({ error: "Failed to retrieve plans." });
  }
};

export const paystackPurchasePlan = async (req, res) => {
  try {
    const {influencerId, amount, plan } = req.body;

    if (!influencerId || !amount || !plan) {
      console.log('Please provide a valid customer ID, amount to charge, and plan code');
    }

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return res.status(404).json({ error: "Influencer not found." });
    }

    const email = influencer.email;

    const existingPaystackCustomerId = influencer.paystackCustomerId;

    let customer;

    if (!influencer.paystackCustomerId) {
      const emailCustomer = influencer.email;
      const nameCustomer = influencer.username;

      customer = await paystack.customer.create({
        email: emailCustomer,
        first_name: nameCustomer
      });

      await Influencer.findByIdAndUpdate(influencerId, {
        paystackCustomerId: customer.data.customer_code,
      });
    } else {
      console.log(`Customer Code Exists: ${existingPaystackCustomerId}`);
    }

    const purchase = await paystack.transaction.initialize({
      email,
      amount,
      plan,
      //start_date: 14,
      channels: ['card'],
      //callback_url: "http://localhost:3000/sucess",
    });

    if (purchase.status === false) {
      console.error('Error initializing transaction: ', purchase.message);
      return res
        .status(400)
        .send(`Error creating subscription: ${purchase.message}`);
    }

    const transaction = purchase.data;
    return res.status(200).send(transaction);
  } catch (error) {
    console.error("Error occurred during purchase:", error);
    next(error);
    return res.status(400).send(error.message);
  }

};

export const getPaystackCustomer = async (req, res, next) => {
  try {
    const { customerCode } = req.params;

    if (!customerCode) {
      console.log('Please provide a valid customer code');
    }

    const options = {
      baseURL: 'https://api.paystack.co',
      url: `/customer/${customerCode}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    };

    const response = await axios(options);

    const customer = response.data;
    return res.status(200).json(customer);
  } catch (error) {
    console.error('Error occurred while fetching customer:', error);
    next(error);
    return res.status(400).json({ error: error.message });
  }
};

export const getPaystackCustomerSubscription = async (req, res, next) => {
  try {
    const { subCode } = req.params;

    if (!subCode) {
      return res.status(400).json({ error: 'Please provide a valid subscription code' });
    }

    const options = {
      baseURL: 'https://api.paystack.co',
      url: `/subscription/${subCode}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    };

    const response = await axios(options);

    const subscription = response.data;
    return res.status(200).json(subscription);
  } catch (error) {
    console.error('Error occurred while fetching subscriptions:', error);
    next(error);
    return res.status(400).send(error.message);
  }
};

export const paystackSubscribeCustomer = async (req, res, next) => {
  try {
    const { customer, plan, authorization, start_date } = req.body;

    if (!customer || !plan) {
      console.log('Please provide a valid customer code and plan ID');
    }

    const purchase = await paystack.subscription.create({
      customer,
      plan,
      authorization,
      start_date,
    });

    if (purchase.status === false) {
      console.error('Error creating subscription: ', purchase.message);
      return res
        .status(400)
        .send(`Error creating subscription: ${purchase.message}`);
    }

    const subscription = purchase.data;
    return res.status(200).send(subscription);
  } catch (error) {
    console.error("Error occurred during purchase:", error);
    next(error);
    return res.status(400).send(error.message);
  }
};

export const paystackCancelSubscription = async (req, res, next) => {
  try {
    const { subCode, emailToken } = req.params;

    const code = subCode;
    const token = emailToken;

    if (!code || !token) {
      console.log("Please provide a valid customer code and subscription token");
    }

    const disableSubscriptionResponse = await paystack.subscription.disable({
      code,
      token,
    });

    return res.status(200).send("Subscription successfully disabled:", disableSubscriptionResponse);
  } catch (error) {
    console.error('Error occurred while disabling subscription:', error);
    next(error);
    return res.status(400).json({ error: error.message });
  }
};

export const updatePaystackSubscriptionCard = async (req, res, next) => {
  try {
    const { subCode } = req.params;

    if (!subCode) {
      return res.status(400).json({ error: 'Please provide a valid subscription code' });
    }

    const options = {
      baseURL: 'https://api.paystack.co',
      url: `/subscription/${subCode}/manage/link`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    };

    const response = await axios(options);

    const manageSubscription = response.data;
    return res.status(200).json(manageSubscription);
  } catch (error) {
    console.error('Error occurred while fetching manage subscription link:', error);
    next(error);
    return res.status(400).send(error.message);
  }
};

export const getPaystackCustomerTransactions = async (req, res, next) => {
  try {
    const { customerCode } = req.params;

    if (!customerCode) {
      return res.status(400).json({ error: 'Please provide a valid customer code' });
    }

    const options = {
      baseURL: 'https://api.paystack.co',
      url: `/transaction`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    };

    const response = await axios(options);

    let customerTransactions = [];

    const transactions = response.data?.data || [];

    customerTransactions = transactions.filter(transaction => {
      return (
        transaction.customer &&
        transaction.customer.customer_code === customerCode
      );
    });

    return res.status(200).json(customerTransactions);
  } catch (error) {
    console.error('Error occurred while fetching transactions:', error);
    next(error);
    return res.status(400).send(error.message);
  }
};









// STRIPE APIS
export const getSubscriptions = async (req, res, next) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY,
    });

    //prices = plans

    return res.json(prices);
  } catch (error) {
    next(error);
    console.error("Error occurred while fetching subscriptions:", error);
    return res.status(500).json({ error: "Failed to retrieve subscriptions." });
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const stripeCustomerId = req.params.stripeCustomerId;

    const customer = await stripe.customers.retrieve(stripeCustomerId);

    return res.status(200).json({ customer });

  } catch (error) {
    console.error("Error retrieving customer:", error);
    next(error);
  }
};

export const getInvoicesByCustomer = async (req, res, next) => {
  try {
    const stripeCustomerId = req.params.stripeCustomerId;

    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
    });

    return res.status(200).json(invoices.data);
  } catch (error) {
    next(error);
  }
};

export const getPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethodId = req.params.paymentMethodId;

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    res.status(200).json(paymentMethod);
  } catch (error) {
    console.error('Error retrieving subscription:', error.message);
    res.status(500).json({ error: 'Error retrieving subscription.' });
  }
};

export const getSingleSub = async (req, res, next) => {
  try {
    const subscriptionCode = req.params.subscriptionCode;

    const subscription = await stripe.subscriptions.retrieve(subscriptionCode);

    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error retrieving single subscription:', error.message);
    res.status(500).json({ error: 'Error retrieving single subscription.' });
  }
};

export const getCardDetails = async (req, res, next) => {
  try {
    const stripeCustomerId = req.params.stripeCustomerId;

    const customer = await stripe.customers.retrieve(stripeCustomerId);
    const cardId = "pm_1NYGZ9FjwLGNxy6ozFnWTrXG";

    if (!cardId) {
      console.error("No default card found for customer:", stripeCustomerId);
      return res.status(404).json({ error: "No default card found for customer" });
    }

    const card = await stripe.customers.retrieveSource(stripeCustomerId, cardId, {
      expand: ['card'],
    });

    return res.status(200).json({ card });

  } catch (error) {
    console.error("Error retrieving card:", error);
    next(error);
  }
};

export const purchasePlan = async (req, res, next) => {
  try {
    const { priceId, stripeCustomerId, influencerId } = req.body;

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return res.status(404).json({ error: "Influencer not found." });
    }

    let customer;

    if (!influencer.stripeCustomerId) {
      const emailCustomer = influencer.email;
      const nameCustomer = influencer.username;

      customer = await stripe.customers.create(
        {
          email: emailCustomer,
          name: nameCustomer,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );

      await Influencer.findByIdAndUpdate(influencerId, {
        stripeCustomerId: customer.id,
      });
    } else {
      customer.id = stripeCustomerId;
    }

    const purchase = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 14,
        },
        success_url: "https://getcollabo.io/success",
        cancel_url: "https://getcollabo.io/failed",
        customer: customer.id,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    return res.json(purchase);
  } catch (error) {
    next(error);
    console.error("Error occurred during purchase:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong with the purchase." });
  }
};

export const noTrialPlan = async (req, res, next) => {
  try {
    const { priceId, stripeCustomerId, influencerId } = req.body;

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return res.status(404).json({ error: "Influencer not found." });
    }

    let customer;

    if (!influencer.stripeCustomerId) {
      const emailCustomer = influencer.email;
      const nameCustomer = influencer.username;

      customer = await stripe.customers.create(
        {
          email: emailCustomer,
          name: nameCustomer,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );

      await Influencer.findByIdAndUpdate(influencerId, {
        stripeCustomerId: customer.id,
      });
    } else {
      customer.id = stripeCustomerId;
    }

    const purchase = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: "https://getcollabo.io/success",
        cancel_url: "https://getcollabo.io/failed",
        customer: customer.id,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    return res.json(purchase);
  } catch (error) {
    next(error);
    console.error("Error occurred during purchase:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong with the purchase." });
  }
};

export const cancelSubscription = async (req, res, next) => {
  const subscriptionId = req.params.subscriptionId;

  try {
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);
    console.log('Subscription canceled:', canceledSubscription);
    res.status(200).json({ message: 'Subscription canceled successfully.' });

  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: 'An error occurred while canceling the subscription.' });
  }
};