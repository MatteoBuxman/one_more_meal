<script>
  import { slide } from "svelte/transition";

  export let question;
  export let answer;
  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
  }

  import { Info, Cookie, Shield } from "lucide-svelte";

  const cookieTypes = [
    {
      type: "Essential Cookies",
      purpose:
        "These cookies are necessary for the website to function and cannot be switched off.",
      duration: "Session - 1 year",
      example: "Authentication, shopping cart, language preferences",
    },
    {
      type: "Analytics Cookies",
      purpose: "Help us understand how visitors interact with our website.",
      duration: "Up to 2 years",
      example: "Page views, traffic sources, user behavior",
    },
    {
      type: "Marketing Cookies",
      purpose:
        "Used to track visitors across websites to display relevant advertisements.",
      duration: "Up to 90 days",
      example: "Ad preferences, conversion tracking",
    },
    {
      type: "Preference Cookies",
      purpose:
        "Enable the website to remember your choices and customize your experience.",
      duration: "Up to 1 year",
      example: "Theme settings, form auto-fill data",
    },
  ];

  const faqs = [
    {
      question: "How do I manage my cookie preferences?",
      answer:
        "You can manage your cookie preferences through your browser settings. Each browser has different controls - check your browser's help section for specific instructions on how to manage or delete cookies.",
    },
    {
      question: "What happens if I decline cookies?",
      answer:
        "If you decline non-essential cookies, you'll still be able to use our website, but some features might not work properly. Essential cookies cannot be declined as they are necessary for the website to function.",
    },
    {
      question: "Do you share cookie data with third parties?",
      answer:
        "Some cookies on our website are set by third-party services we use. These third parties may receive and process your data. We carefully select these partners and require them to comply with applicable data protection laws.",
    },
    {
      question: "How often do you update this policy?",
      answer:
        "We review and update this Cookie Policy periodically to ensure it remains accurate and compliant with relevant laws and regulations. The date at the top of this page indicates when the policy was last updated.",
    },
  ];
</script>



<div class="max-w-4xl mx-auto p-6 flex flex-col gap-8">
  <!-- Header Section -->
  <div class="space-y-4">
    <h1 class="text-4xl font-bold tracking-tight">Cookie Policy</h1>
    <p class="text-gray-500">Last updated: January 26, 2025</p>
  </div>

  <!-- Introduction Card -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <Info class="h-5 w-5" />
        About Our Cookie Policy
      </h2>
      <p class="mt-4 text-gray-600">
        This Cookie Policy explains how we use cookies and similar tracking
        technologies on our website. By continuing to browse our site, you agree
        to our use of cookies as described in this policy.
      </p>
    </div>
  </div>

  <!-- Cookie Types Section -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <Cookie class="h-5 w-5" />
        Types of Cookies We Use
      </h2>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium">Type</th>
              <th class="text-left py-3 px-4 font-medium">Purpose</th>
              <th class="text-left py-3 px-4 font-medium">Duration</th>
              <th class="text-left py-3 px-4 font-medium">Example</th>
            </tr>
          </thead>
          <tbody>
            {#each cookieTypes as cookie}
              <tr class="border-b last:border-b-0">
                <td class="py-3 px-4 font-medium">{cookie.type}</td>
                <td class="py-3 px-4">{cookie.purpose}</td>
                <td class="py-3 px-4">{cookie.duration}</td>
                <td class="py-3 px-4 text-gray-500">{cookie.example}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <!-- Contact Section -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <p class="text-sm text-gray-500">
        If you have any questions about our Cookie Policy, please contact us at
        <a
          href="mailto:privacy@example.com"
          class="text-blue-600 hover:underline"
        >
          privacy@example.com
        </a>
      </p>
    </div>
  </div>
</div>
