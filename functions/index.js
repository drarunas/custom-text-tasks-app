const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')( functions.config().stripe.secret_key );

admin.initializeApp();


exports.createStripeCustomerOnSignIn = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        const { email, userId } = req.body;
  
        if (!email || !userId) {
          res.status(400).send({ success: false, message: "Missing email or userId" });
          return;
        }
  
        const userDocRef = admin.firestore().collection("stripeCustomers").doc(userId);
  
        // Check if the user already exists
        const userDoc = await userDocRef.get();
  
        if (userDoc.exists) {
          res.status(200).send({
            success: true,
            message: "User already exists. No changes made.",
            customerId: userDoc.data().stripeCustomerId,
          });
          return;
        }
  
        // Create a new Stripe customer
        const customer = await stripe.customers.create({ email });
  
        // Save the new Stripe customer ID to Firestore
        await userDocRef.set({
          stripeCustomerId: customer.id,
          email,
        });
  
        res.status(200).send({
          success: true,
          message: "Stripe customer created and saved.",
          customerId: customer.id,
        });
      } catch (error) {
        console.error("Error creating Stripe customer:", error);
        res.status(500).send({ success: false, message: "Internal Server Error", error: error.message });
      }
    });
  });
  

  

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    console.log('stripe webhook');
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, functions.config().stripe.webhook_secret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const subscription = event.data.object;
    console.log(subscription);

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created' || event.type === 'customer.subscription.deleted') {
        const customerId = subscription.customer;
        const userSnapshot = await admin.firestore().collection('stripeCustomers').where('stripeCustomerId', '==', customerId).limit(1).get();

        if (!userSnapshot.empty) {
            const userId = userSnapshot.docs[0].id;
            await admin.firestore().collection('stripeCustomers').doc(userId).update({
                subscriptionStatus: subscription.status,
            });
        }
    }

    res.json({ received: true });
});


exports.createStripeCheckoutSession = functions.runWith({
    minInstances: 1,
  }).https.onCall(async (data, context) => {
    const userId = data.userId; // Retrieve user ID from the passed data
  
    if (!userId) {
      throw new functions.https.HttpsError('invalid-argument', 'User ID is required.');
    }
  
    try {
      // Fetch the customer ID from Firestore
      const userDoc = await admin.firestore().collection('stripeCustomers').doc(userId).get();
  
      if (!userDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'User document not found.');
      }
  
      const customerId = userDoc.data().stripeCustomerId;
  
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        customer: customerId,
        line_items: [
          {
            price: data.priceId,
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 1, // Adds a 1-day trial
        },
        success_url: 'https://custom-text-tasks.web.app?status=success',
        cancel_url: 'https://custom-text-tasks.web.app?status=cancel',
      });
  
      return { id: session.id };
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      throw new functions.https.HttpsError('internal', 'Failed to create Stripe Checkout session.');
    }
  });
  


exports.getSubscriptionStatus = functions.runWith({
    minInstances: 1, 
  }).https.onRequest(async (req, res) => {
    
        if (req.method !== 'POST') {
            return res.status(405).send({ error: 'Only POST requests are allowed' });
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ error: 'Email is required' });
        }

        try {
            const userSnapshot = await admin.firestore().collection('stripeCustomers')
                .where('email', '==', email)
                .limit(1)
                .get();

            if (userSnapshot.empty) {
                //return res.status(404).send({ error: 'User not found' });
                return res.status(200).send({ subscriptionStatus: 'inactive' });
            }

            const subscriptionStatus = userSnapshot.docs[0].data().subscriptionStatus || 'inactive';
            return res.status(200).send({ subscriptionStatus });
        } catch (error) {
            console.error('Error fetching subscription status:', error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    
});


// Environment variable for your API key
const API_KEY = 'open ai api key';  // Replace with your actual API key

exports.runOpenAITask = functions.https.onRequest(async (req, res) => {


    // Parse the incoming request
    const { selectedPrompt, inputText } = req.body;

    if (!selectedPrompt || !inputText) {
        res.status(400).send({ error: "Missing parameters" });
        return;
    }

    try {
        // Call OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: `${selectedPrompt} \n\n ${inputText}` }],
            }),
        });

        const data = await response.json();
        res.send(data); // Forward the response to the client
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        res.status(500).send({ error: "Failed to process the request" });
    }
});



