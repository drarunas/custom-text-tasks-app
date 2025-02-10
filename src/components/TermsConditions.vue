<template>
  <div>
    <!-- Main App Content -->



    <div v-if="showTerms" class="m-4 mx-auto max-w-4xl bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold text-gray-800">Terms and Conditions</h2>
      <p class="text-sm text-gray-600 mt-2">
        By accessing or using our services, you agree to the following:
      </p>
      <ol class="list-decimal list-inside mt-4 text-left">
        <li>Usage of this service is subject to compliance with all applicable laws and regulations in your
          jurisdiction.</li>
        <li>Subscription fees are billed monthly and are non-refundable, and are subject to change without notice.</li>
        <li>You are responsible for maintaining the security of your account credentials.</li>
        <li>We reserve the right to update or modify these terms at any time, and it is your responsibility to review
          them periodically.</li>
        <li>Custom Text Tasks is not liable for any damages arising from the use of this service.</li>
        <li>Violation of these terms may result in termination of your account and services.</li>
        <li>Subscriptions can be terminated without notice.</li>
        <li>We do not store your data except for the purposes of providing the service.</li>
        <li>Prompting must comply with the T&Cs of Open AI.</li>
      </ol>
      <p class="text-sm text-gray-600 mt-4">
      </p>
      <button
        class="mt-4 px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md hover:from-red-600 hover:to-pink-600"
        @click="toggleTerms">
        Close
      </button>
    </div>

    <!-- Terms and Conditions Section -->
    <div class="m-8 text-center">
      <a href="#" class="text-sm text-gray-300 hover:text-gray-400 underline" @click.prevent="toggleTerms">
        Terms and Conditions
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTerms: false,
    };
  },
  methods: {
    toggleTerms() {
      this.showTerms = !this.showTerms;
    },
  },
};
</script>

<style scoped>
.text-center {
  margin-top: 1rem;
}
</style>