<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

    <!-- Not Logged In View -->

    <div v-if="!user" class="overflow-hidden bg-slate-50 bg-opacity-80 py-12 sm:py-16 rounded-xl my-10 mx-10">
      <div class="mx-10 max-w-6xl px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg mb-2">

              <div class="flex items-center mt-2">
                <img :src="require('@/assets/logo.png')" alt="Logo" class="h-10 w-10 mr-3">
                <p class="text-pretty text-5xl font-bold tracking-tight text-gray-600 sm:text-5xl">Custom Text Tasks</p>
              </div>

              <h2 class="mt-0 text-gray-500">Build custom reusable prompts to process text in Chrome</h2>
              <div
                class="flex flex-col items-center justify-center my-8 bg-slate-100 p-5 text-gray-500 rounded-xl shadow">
                <p> Custom Text Tasks is a browser extension using Open AI's GPT-4o to automate repetitive text
                  processing workflows in your browser. Define your prompts once and keep reusing them on entire page
                  html or text selection. </p>
                <a href="https://chromewebstore.google.com/detail/jkhhbdcakbglbdnocamohagekdkbnhok/"
                  class="m-2 mt-4 px-6 py-2 text-sm w-fit  text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-md hover:from-green-600 hover:to-teal-600 block text-center">
                  Install in Chrome
                </a>
              </div>

              <div class="flex flex-col items-center ">
                <div v-if="!user" class="flex flex-col mt-2 p-2 rounded-xl w-64 text-center">
                  <p class="text-gray-600 mb-2 font-bold text-5xl">$5<span class="text-sm font-light">/month</span></p>
                  <p class="text-gray-500 mb-6 font-light">after a free trial with unlimited prompts</p>
                  <button
                    class="px-6 py-3 text-sm text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-md hover:from-green-600 hover:to-teal-600"
                    @click="loginWithGoogle">
                    Log in with Google
                  </button>
                </div>
              </div>
            </div>



          </div>
          <img :src="require('@/assets/screenshot.png')" alt="Product screenshot"
            class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[48rem] md:-ml-4 lg:-ml-0"
            width="2432" height="1442">
        </div>
      </div>
    </div>




    <div v-if="!user" class="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2 w-3/4 mb-24">
      <div class="flex flex-col  bg-slate-50 bg-opacity-80 p-4 rounded-lg">
        <div class=" bg-white p-0 rounded-xl shadow-xl text-center flex items-center justify-center">
          <img :src="require('@/assets/feature-one.png')" class="w-auto h-auto">
        </div>
        <p class="mx-2 mt-2 text-left text-lg font-semibold text-gray-600">Define your own prompts</p>
        <p class="mx-2 text-left text-sm font-light text-gray-600">Craft your own custom GPT instructions.</p>
      </div>
      <div class="flex flex-col  bg-slate-50 bg-opacity-80 p-4 rounded-lg">
        <div class=" bg-white p-0 rounded-xl shadow-xl text-center flex items-center justify-center">
          <img :src="require('@/assets/feature-two.png')" class="w-auto h-auto">
        </div>
        <p class="mx-2 mt-2 text-left text-lg font-semibold text-gray-600">Extract data. Summarize. Process text.</p>
        <p class="mx-2 text-left text-sm font-light text-gray-600">Automate repetitive text and data
          summarization/extration tasks directly in your browser.</p>
      </div>
      <div class="flex flex-col   bg-slate-50 bg-opacity-80 p-4 rounded-lg">
        <div class=" bg-white p-0 rounded-xl shadow-xl text-center flex items-center justify-center">
          <img :src="require('@/assets/feature-three.png')" class="w-auto h-auto">
        </div>
        <p class="mx-2 mt-2 text-left text-lg font-semibold text-gray-600">Full power of GPT-4o.</p>
        <p class="mx-2 text-left text-sm font-light text-gray-600">Employ the full capabilities of the latest models
          from Open AI.</p>
      </div>
      <div class="flex flex-col   bg-slate-50 bg-opacity-80 p-4 rounded-lg">
        <div class=" bg-white p-0 rounded-xl shadow-xl text-center flex items-center justify-center">
          <img :src="require('@/assets/feature-four.png')" class="w-auto h-auto">
        </div>
        <p class="mx-2 mt-2 text-left text-lg font-semibold text-gray-600">Reuse again and again.</p>
        <p class="mx-2 text-left text-sm font-light text-gray-600">Simplify repetitive tasks by reusing your saved
          custom prompts again, with consistent results.</p>
      </div>
    </div>


    <!-- Logged In View -->
    <div v-if="user" class="text-center bg-white p-10 rounded-xl shadow-xl">
      <p class="text-gray-700 mb-6">Signed in as {{ user.email }}</p>

      <!-- Subscription Card -->
      <div class="bg-gray-100 p-6 rounded-lg shadow-md">
        <p v-if="!isSubscribed" class="text-lg text-gray-800 font-semibold mb-4">Subscribe to access premium features
        </p>
        <p v-if="!isSubscribed" class="text-gray-600 mb-4">Full access $5/month</p>
        <button v-if="!isSubscribed"
          class="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-md hover:from-green-600 hover:to-teal-600"
          @click.prevent="createStripeCheckoutSession">
          Subscribe Now
        </button>
        <p v-if="isSubscribed" class="text-green-600 font-medium">Subscription Status: Active</p>
        <a v-if="isSubscribed && user" href="" @click.prevent="redirectToStripePortal"
          class="m-2 px-6 py-2 text-sm text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-md hover:from-green-600 hover:to-teal-600 block text-center">
          Manage Your Subscription
        </a>
      </div>

      <!-- Logout Button -->
      <button
        class="mt-6 px-6 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md hover:from-red-600 hover:to-pink-600"
        @click="logout">
        Log out
      </button>
    </div>





    <div v-if="!user" class="bg-white shadow-lg rounded-lg overflow-hidden p-8 sm:p-12 my-10 mx-10">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Use Cases</h1>


      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Research</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Extract references from a research paper PDFs.</li>
        <li>Detect IRB approvals and extract approval or clinical trial numbers from PDFs.</li>
        <li>Summarize main findings, sample sizes, strength of evidence.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Content Creation and Marketing</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize long-form articles or blogs into key bullet points for quick reference or social media sharing.
        </li>
        <li>Extract and highlight keywords or phrases from a web page to optimize new content.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Customer Support</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize today's customer support tickets in a given format</li>
        <li>Write a daily report of ticket progress and resolution</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">E-commerce</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Scrape product descriptions and reviews from competitors' websites, summarize user sentiment, and compare
          features.</li>
        <li>Automatically list key features of products on e-commerce pages for creating comparison charts.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Legal and Compliance</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Identify and summarize key clauses (e.g., termination, liability) in online contracts or terms of service.
        </li>
        <li>Parse and summarize updates to online terms and conditions or privacy policies.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Education and Research</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Extract and summarize the main points from online lecture transcripts or class notes.</li>
        <li>Extract reference lists from online articles and format them into a specific citation style (e.g., APA,
          MLA).</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Healthcare</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Process clinical case reports or patient data summaries to extract key symptoms, diagnoses, and treatments.
        </li>
        <li>Highlight potential drug interactions when reading online medical literature or pharmaceutical product
          pages.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Entertainment</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize reviews or descriptions of movies, TV shows, or books to help decide what to watch or read.</li>
        <li>Extract trivia or interesting facts from web pages for use in quizzes or games.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Travel and Leisure</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Extract and organize travel recommendations, locations, and reviews into a structured itinerary format.</li>
        <li>Summarize reviews of restaurants on aggregator platforms (e.g., Yelp) to choose the best options.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Personal Productivity</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize or reformat goal-setting articles into actionable plans.</li>
        <li>Extract relevant information from web pages to generate email templates or draft responses.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Human Resources</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Extract key points from employee feedback surveys for reports.</li>
        <li>Generate training outlines from detailed procedural documents.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Project Management</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize meeting notes into actionable tasks and deadlines.</li>
        <li>Analyze project updates and identify overdue tasks or blockers.</li>
        <li>Draft weekly progress reports from raw project updates.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Sales</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize key insights from customer interactions or CRM entries.</li>
        <li>Generate personalized email templates based on customer profiles.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Finance</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize financial reports or earnings calls into key takeaways.</li>
        <li>Draft investment summaries from market research data.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">IT and Operations</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Summarize incident reports into root cause and resolution steps.</li>
        <li>Generate troubleshooting documentation from resolved ticket logs.</li>
        <li>Highlight common system issues based on log entries.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Data Extraction and Categorization</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Extract all names on a page and categorize them by gender, then output as a CSV.</li>
        <li>Retrieve and organize company names from a webpage into industry-specific categories.</li>
        <li>Identify and categorize job titles from LinkedIn or job boards into hierarchical levels (e.g., junior, mid,
          senior).</li>
        <li>Retrieve references to monetary amounts and group them by source.</li>
        <li>Identify all hyperlinks on a page.</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-4">Raw HTML Processing</h2>
      <ul class="list-disc pl-6 text-gray-600 space-y-2">
        <li>Extract all <code>&lt;img&gt;</code> tags and output a list of image URLs.</li>
        <li>Identify and remove all inline styles from HTML elements.</li>
        <li>Parse <code>&lt;a&gt;</code> tags and categorize hyperlinks by <code>rel</code> attribute (e.g.,
          <code>nofollow</code>, <code>noopener</code>).
        </li>
        <li>Extract and summarize all <code>&lt;meta&gt;</code> tags for SEO analysis.</li>
        <li>Organize all <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code> tags into a hierarchical structure for
          outlining a webpage's content.</li>
        <li>Extract table data from <code>&lt;table&gt;</code> elements and convert it into CSV or JSON format.</li>
        <li>Parse <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code> elements with specific <code>class</code> or
          <code>id</code> attributes for targeted content extraction.
        </li>
        <li>Identify missing <code>alt</code> attributes in <code>&lt;img&gt;</code> tags for accessibility
          improvements.</li>
      </ul>
    </div>
    <TermsConditions />
  </div>


  <div>
    <!-- Thank You Popup -->
    <div v-if="showThankYouPopup" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 20px;
      ">
      <h1 class="text-xl">Thank You for Your Payment!</h1>
    </div>
  </div>


  <div>
    <div v-if="showPrivacyPopup" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 20px;
      ">
      <div class="m-4 mx-auto max-w-4xl bg-gray-50 p-6 rounded-lg shadow-md overflow-auto">
        <h2 class="text-lg font-semibold text-gray-800">Privacy Policy</h2>
        <p class="text-sm text-gray-600 mt-2">Effective Date: December 27th 2024</p>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Interpretation and Definitions</h3>
          <p class="text-sm text-gray-600 mt-2"><strong>Interpretation:</strong> Capitalized terms in this Privacy
            Policy have specific meanings defined below.</p>
          <ul class="list-disc list-inside text-gray-600 mt-2">
            <li><strong>Account:</strong> A unique account created for you to access the Service or parts of the
              Service.</li>
            <li><strong>Device:</strong> Any device that can access the Service, such as a computer or digital tablet.
            </li>
            <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable individual.
            </li>
            <li><strong>Service:</strong> Refers to the Custom Text Tasks browser extension.</li>
            <li><strong>You:</strong> The individual accessing or using the Service.</li>
          </ul>
        </section>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Collecting and Using Your Personal Data</h3>
          <h4 class="text-sm font-semibold text-gray-700 mt-2">Types of Data Collected</h4>
          <p class="text-sm text-gray-600 mt-2"><strong>Personal Data:</strong></p>
          <ul class="list-disc list-inside text-gray-600">
            <li>Email Address</li>
            <li>Username</li>
          </ul>
          <p class="text-sm text-gray-600 mt-2"><strong>Usage Data:</strong></p>
          <ul class="list-disc list-inside text-gray-600">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Time and date of access</li>
            <li>Diagnostic data</li>
          </ul>
        </section>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Purpose of Collecting Personal Data</h3>
          <ul class="list-disc list-inside text-gray-600 mt-2">
            <li><strong>To Provide and Maintain the Service:</strong> Including to monitor and improve its performance.
            </li>
            <li><strong>To Manage Your Account:</strong> To authenticate and manage your access to the Service.</li>
            <li><strong>To Respond to Your Requests:</strong> For customer support and resolving inquiries.</li>
            <li><strong>Compliance:</strong> To comply with legal obligations, including GDPR and local laws.</li>
          </ul>
        </section>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Data Handling</h3>
          <ol class="list-decimal list-inside text-gray-600 mt-2">
            <li><strong>Storage:</strong> Data is stored securely on Google's servers via Firebase.</li>
            <li><strong>Prompt Processing:</strong> Prompts and selected page content are stored locally on your device
              and transferred securely to OpenAI's servers for processing.</li>
            <li><strong>Payment Data:</strong> Payment information is handled by Stripe, adhering to their security and
              compliance policies.</li>
            <li><strong>Children's Privacy:</strong> The Service is not intended for users under the age of 13. Such
              data will be promptly deleted if discovered.</li>
          </ol>
        </section>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Your Rights</h3>
          <p class="text-sm text-gray-600 mt-2">Under applicable laws, including GDPR, you have the right to:</p>
          <ul class="list-disc list-inside text-gray-600">
            <li>Access your data</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your data</li>
            <li>Restrict or object to the processing of your data</li>
          </ul>
          <p class="text-sm text-gray-600 mt-2">To exercise these rights, contact us at <a
              href="mailto:support at xprlabs dot com" class="text-blue-500 underline">support at xprlabs dot com</a>.
          </p>
        </section>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Security of Your Data</h3>
          <p class="text-sm text-gray-600 mt-2">We implement reasonable security measures to protect your data. However,
            no method of transmission or storage is 100% secure. We strive to minimize risks but cannot guarantee
            absolute security.</p>
        </section>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Changes to This Privacy Policy</h3>
          <p class="text-sm text-gray-600 mt-2">We may update this Privacy Policy periodically. Changes will be posted
            on this page with a new "Effective Date." We encourage you to review it regularly.</p>
        </section>

        <section class="mt-4">
          <h3 class="text-md font-semibold text-gray-700">Contact Us</h3>
          <p class="text-sm text-gray-600 mt-2">For questions or concerns, please contact us at:</p>
          <p class="text-sm text-gray-600"><strong>Email:</strong> <a href="mailto:support@exprlabs.com"
              class="text-blue-500 underline">support at exprlab s
              dot com</a></p>
        </section>

        <button @click.prevent="hidePrivacy"
          class="mt-6 px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md hover:from-red-600 hover:to-pink-600">Close</button>
      </div>

    </div>
  </div>

</template>


<script>
import TermsConditions from './components/TermsConditions.vue';

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';


export default {

  components: {
    TermsConditions,
  },
  data() {
    return {
      user: null,
      isSubscribed: false,
      showThankYouPopup: false,
      showPrivacyPopup: false,
    };
  },
  methods: {

    async loginWithGoogle() {
      const clientId = "";
      const redirectUri = `${window.location.origin}/oauth2callback`; // Define a route in your app to handle OAuth callback
      const scope = "https://www.googleapis.com/auth/userinfo.email";

      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${encodeURIComponent(clientId)}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&prompt=select_account`;

      try {
        // Open a popup for OAuth2 authentication
        const popup = window.open(authUrl, "oauth2", "width=600,height=700");

        if (!popup) throw new Error("Popup blocked or failed to open.");

        // Wait for the token to be set by the popup
        const interval = setInterval(() => {
          try {
            if (popup.closed) throw new Error("Authentication popup was closed.");

            const hash = popup.location.hash;
            if (hash && hash.startsWith("#access_token")) {
              const params = new URLSearchParams(hash.slice(1));
              const accessToken = params.get("access_token");

              popup.close();
              clearInterval(interval);

              // Fetch user information
              this.fetchUserInfo(accessToken);
            }
          } catch (err) {
            if (err.message.includes("popup was closed")) clearInterval(interval);
          }
        }, 1000);
      } catch (error) {
        console.error("Google sign-in error:", error.message);
      }
    },

    async fetchUserInfo(accessToken) {
      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Invalid token");
        }
        localStorage.setItem('access_token', accessToken);

        window.postMessage({ type: "auth_token", accessToken }, "*");

        const user = await response.json();

        this.user = {
          email: user.email,
          id: user.id
        };

        // Save user to backend (replace with your API endpoint)
        await this.checkUserSubscription(user);
        await this.saveUserToBackend(user);
        await this.checkUserSubscription(user);


      } catch (error) {
        console.error("Error fetching user info:", error);
        localStorage.removeItem('access_token'); // Clear invalid token
        this.user = null;
      }
    },

    async saveUserToBackend(user) {
      try {


        // Create Stripe customer
        const createStripeResponse = await fetch("https://us-central1-custom-text-tasks.cloudfunctions.net/createStripeCustomerOnSignIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, userId: user.id }),
        });

        if (!createStripeResponse.ok) throw new Error("Failed to create Stripe customer.");
        const stripeData = await createStripeResponse.json();
        console.log("Stripe customer created:", stripeData);
      } catch (error) {
        console.error("Error saving user to backend or creating Stripe customer:", error);
      }
    },




    async logout() {
      try {
        // Clear local user data
        this.user = null;

        // Optional: Revoke the access token
        const revokeTokenEndpoint = "https://oauth2.googleapis.com/revoke";
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          await fetch(revokeTokenEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${accessToken}`,
          });
          localStorage.removeItem("access_token"); // Clear the token from local storage
        }

        console.log("User logged out and token revoked.");
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    },




    async createStripeCheckoutSession() {
  if (!this.user || !this.user.id) {
    console.error('User is not authenticated.');
    return;
  }

  const functions = getFunctions();
  const createSession = httpsCallable(functions, 'createStripeCheckoutSession');

  try {
    const session = await createSession({
      priceId: '',
      userId: this.user.id, // Pass the user ID explicitly
    });

    const result = await this.stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (error) {
    console.error('Error creating Stripe session:', error);
  }
},


    redirectToStripePortal() {
      // Replace the URL below with your actual Stripe billing portal link
      const stripeBillingPortalURL = '';

      // Redirect the user to the Stripe billing portal
      window.location.href = stripeBillingPortalURL;
    },

    async checkUserSubscription(user) {
      if (!user) {
        console.error("No user provided.");
        return;
      }

      try {
        const userDocRef = doc(db, 'stripeCustomers', user.id);

        // Fetch the user's subscription document from Firestore
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Get the subscription status from Firestore
          const userData = userDoc.data();
          const subscriptionStatus = userData.subscriptionStatus;

          // Update isSubscribed based on subscription status
          // this.isSubscribed = subscriptionStatus === 'active';
          this.isSubscribed = subscriptionStatus === 'active' || subscriptionStatus === 'trialing';


          //console.log(`Subscription status for ${user.email}: ${subscriptionStatus}`);
        } else {
          console.warn(`No subscription data found for user ${user.id}`);
          this.isSubscribed = false;
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
        this.isSubscribed = false; // Assume not subscribed on error
      }
    },
    hidePrivacy() {
      this.showPrivacyPopup = false;
    },
    handleSuccess() {
      console.log('Payment successful!');

      this.showThankYouPopup = true;
      window.history.replaceState({}, document.title, window.location.pathname);


      // Automatically reload the page after 15 seconds
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
        window.location.reload();
      }, 10000);

    },
    handleCancel() {
      console.log('Payment was canceled.');
      // Optionally show a message or reset the UI
    },


    handlePrivacy() {
      this.showPrivacyPopup = true;
    },

  },

  async mounted() {
    document.title = "Custom Text Tasks";
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      await this.fetchUserInfo(savedToken);
    }


    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');

    if (status === 'success') {

      this.handleSuccess();
    } else if (status === 'privacy') {
      this.handlePrivacy();
    } else if (status === 'cancel') {
      this.handleCancel();
    }
    this.stripe = await loadStripe('pk_live');
    //test
    // Check authentication state on load




  },
};
</script>

<style></style>
