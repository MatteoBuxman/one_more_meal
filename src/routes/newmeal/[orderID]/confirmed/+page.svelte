
<script lang="ts">
  import MenuPopup from '$lib/Components/Utilities/menu_popup.svelte';
  import { CheckCircle, MapPin, Clock, Hash } from 'lucide-svelte';
  
  export let orderId: string = "uhfurhuruubu4ub44b";
  export let address: string = "28 Northumberland Avenue, Craighall Park, Johannesburg, 2196";
  export let distance: string = "1.6";

  const menu_configuration = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

</script>

<!-- Navbar -->
<nav class="navbar p-4">
    <div class="flex flex-1">
      <img src="/main_logo_pinkaccent.png" alt="logo_image" class="w-7" />
      <div class="divider divider-horizontal m-0"></div>
      <a class="text-xl font-lexend" aria-label="home_link" href="/"
        >One More Meal</a
      >
    </div>
    <MenuPopup {menu_configuration} />
  </nav>

<div class="flex flex-col p-4">
  <!-- Header -->
  <div class="mb-6">
    <h1 class="text-xl font-semibold text-center">Order Confirmed</h1>
  </div>

  <!-- Success Message -->
  <div class="text-center mb-8">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
      <CheckCircle size={24} class=" text-green-600" />
    </div>
    <h2 class="text-xl font-semibold text-gray-900 mb-2">
      Your order has been confirmed
    </h2>
    <p class="text-gray-600">
      You will receive a confirmation email shortly
    </p>
  </div>

  <!-- Order Details -->
  <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
    <div class="space-y-4">
      <div class="flex items-start space-x-3">
        <MapPin size={20} class=" text-gray-400 mt-0.5" />
        <div>
          <h3 class="font-medium text-gray-900">Pickup Location</h3>
          <p class="text-gray-600 text-sm">{address}</p>
          <p class="text-gray-600 text-sm">{distance} km away</p>
        </div>
      </div>
      
      <div class="flex items-start space-x-3">
        <Clock size={20} class=" text-gray-400 mt-0.5" />
        <div>
          <h3 class="font-medium text-gray-900">Pickup Time</h3>
          <p class="text-gray-600 text-sm">Today before 3:00 PM</p>
        </div>
      </div>

      <div class="flex items-start space-x-3">
        <Hash size={20} class=" text-gray-400 mt-0.5" />
        <div>
          <h3 class="font-medium text-gray-900">Order ID</h3>
          <p class="text-gray-600 font-mono text-sm">{orderId}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Action Button -->
  <a 
    href="/dashboard"
    class="text-center w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    Back to Dashboard
</a>
</div>
