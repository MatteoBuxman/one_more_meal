<script lang="ts">
  import { Plus } from "lucide-svelte";
  import DashboardMealManager from "$lib/components/Features/Dashboard/dashboard_meal_manager.svelte";
  import type { PageData } from "./$types";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import ErrorModal from "$lib/components/Errors/error_modal.svelte";
  import { useAuthStore } from "$lib/Firebase/firebase_init";

  let { data }: { data: PageData } = $props();

  const auth = useAuthStore();

</script>

<div class="max-w-2xl w-full px-4 mx-auto mt-4 space-y-5 min-h-[800px]">

  <div class="flex flex-col gap-1">
    <h1 class="font-bold text-lg">Welcome, {$auth.user?.displayName}.</h1>
    <p class="text-gray-500 text-sm">See your meal donation history below.</p>
  </div>

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
