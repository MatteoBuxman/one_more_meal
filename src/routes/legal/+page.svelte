<script>
  import { ScrollText, Shield, AlertTriangle, Scale } from 'lucide-svelte';
</script>

<div class="max-w-4xl mx-auto p-6 flex flex-col gap-8">
  <!-- Header -->
  <div class="space-y-4">
    <h1 class="text-4xl font-bold tracking-tight">Legal Information</h1>
    <p class="text-gray-500">Last updated: January 26, 2025</p>
  </div>

  <!-- Introduction -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <ScrollText class="h-5 w-5" />
        Legal Notice
      </h2>
      <div class="mt-4 space-y-4 text-gray-600">
        <p>
          Welcome to the legal information page of OneMoreMeal. This page contains
          important information about your rights and obligations when using our services.
        </p>
        <p>
          By accessing and using our services, you acknowledge that you have read,
          understood, and agree to be bound by these terms.
        </p>
      </div>
    </div>
  </div>

  <!-- Company Information -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <Shield class="h-5 w-5" />
        Company Information
      </h2>
      <div class="mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-medium mb-2">Legal Entity</h3>
            <p class="text-gray-600">OneMoreMeal.</p>
            <p class="text-gray-600">Registration Number: 12345678</p>
          </div>
          <div>
            <h3 class="font-medium mb-2">Contact Information</h3>
            <p class="text-gray-600">123 Business Street</p>
            <p class="text-gray-600">City, Country, ZIP</p>
            <p class="text-gray-600">Email: legal@example.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Terms and Conditions Summary -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <Scale class="h-5 w-5" />
        Terms Overview
      </h2>
      <div class="mt-4 space-y-6">
        <section>
          <h3 class="font-medium mb-3">1. Service Usage</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li>Users must be at least 18 years old or have parental consent</li>
            <li>Account registration requires accurate and complete information</li>
            <li>Users are responsible for maintaining account security</li>
            <li>We reserve the right to terminate accounts that violate our terms</li>
          </ul>
        </section>

        <section>
          <h3 class="font-medium mb-3">2. Privacy & Data</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li>We collect and process data as outlined in our Privacy Policy</li>
            <li>User data is protected according to applicable data protection laws</li>
            <li>Users can request access to their personal data</li>
            <li>We use cookies and similar technologies</li>
          </ul>
        </section>

        <section>
          <h3 class="font-medium mb-3">3. Intellectual Property</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-600">
            <li>All content is protected by copyright and other IP rights</li>
            <li>Users retain ownership of their uploaded content</li>
            <li>Users grant us license to use uploaded content</li>
            <li>Unauthorized use of our IP is prohibited</li>
          </ul>
        </section>
      </div>
    </div>
  </div>

  <!-- Disclaimers -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle class="h-5 w-5" />
        Legal Disclaimers
      </h2>
      <div class="mt-4 space-y-4 text-gray-600">
        <p>
          THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
          MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        </p>
        <p>
          IN NO EVENT SHALL OneMoreMeal BE LIABLE FOR ANY SPECIAL, INDIRECT,
          OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
          PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
          ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
          THIS SERVICE.
        </p>
      </div>
    </div>
  </div>

  <!-- Contact Information -->
  <div class="bg-white rounded-lg border shadow-sm">
    <div class="p-6">
      <p class="text-sm text-gray-500">
        For legal inquiries, please contact our legal department at
        <a href="mailto:legal@example.com" class="text-blue-600 hover:underline">
          legal@example.com
        </a>
      </p>
    </div>
  </div>

  <!-- Footer Note -->
  <p class="text-sm text-gray-500 text-center">
    This legal information is available in additional formats upon request.
  </p>
</div>