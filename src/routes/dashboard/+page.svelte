<script lang="ts">
  import { Home, Plus } from "lucide-svelte";
  import MenuPopup from "$lib/Components/Utilities/menu_popup.svelte";
  import DashboardMealManager from "$lib/Components/Features/Dashboard/dashboard_meal_manager.svelte";
  import type { PageData } from "./$types";
  import LoadingBar from "$lib/Components/Utilities/loading_bar.svelte";
  import ErrorModal from "$lib/Components/Errors/error_modal.svelte";

  let { data }: { data: PageData } = $props();

  let menu_configuration = [
    {
      name: "Profile",
      href: "/profile",
    },
    {
      name: "Settings",
      href: "/settings",
    },
    {
      name: "Logout",
      href: "/logout",
    },
  ];
</script>

<div class="max-w-2xl mx-auto p-4 space-y-5 min-h-[800px]">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6" id="dashboard_nav">
    <div class="flex items-center space-x-2">
      <Home size={24} class="text-gray-700" />
      <h1 class="text-xl font-semibold">Hi, Matteo.</h1>
    </div>
    <MenuPopup {menu_configuration} />
  </div>

  <p class="text-gray-600 mb-6">See your meal donation history below.</p>

  <!-- New Meal Button -->
  <div class="flex justify-between items-center mb-4">
    <h2 class="font-semibold">Open Donations.</h2>
    <a
      href="/newmeal"
      class="flex items-center space-x-2 bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Plus size={16} />
      <span>New Meal</span>
    </a>
  </div>

  

  {#await data.openOrders}
    <LoadingBar />
  {:then orders}
    {#if orders.length > 0}
      <DashboardMealManager {orders} />
    {:else}
      <p class="text-sm text-gray-400">
        You have no open orders. Create a new one above!
      </p>
    {/if}
  {:catch error}
    <p class="text-red-400 font-bold text-sm">Could not fetch open orders.</p>
    <ErrorModal error_message={error.message} />
  {/await}

  <div class="flex justify-between items-center mb-4">
    <h2 class="font-semibold">Completed Donations.</h2>
  </div>

  {#await data.completedOrders}
    <LoadingBar />
  {:then orders}
    {#if orders.length > 0}
      <DashboardMealManager {orders} />
    {:else}
      <p class="text-sm text-gray-400">
        You have not completed any donations yet.
      </p>
    {/if}
  {:catch error}
    <p class="text-red-400 font-bold text-sm">Could not fetch completed orders.</p>
    <ErrorModal error_message={error.message} />
  {/await}
</div>
