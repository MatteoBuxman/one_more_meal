<script lang="ts">
  import { Home, ChevronDown, ChevronRight, Clock, Plus, Menu } from 'lucide-svelte';
  import MenuPopup from '$lib/Components/menu_popup.svelte';

  let menu_configuration= [
    
      {
        name: 'Profile',
        href: '/profile',
      },
      {
        name: 'Settings',
        href: '/settings',
      },
      {
        name: 'Logout',
        href: '/logout',
      },
    
    ];

  // Sample data remains the same
  const sampleOrders = [
    {
      id: 'uhud7d7d6dhhhd4',
      createdAt: '09/09/2001 @ 03:46',
      status: 'picked_up',
      meals: [
        {
          name: 'Rice and Beans',
          description: 'A classic meal.',
          quantity: 2,
        },
        {
          name: 'Spaghetti Bolognese',
          description: 'A hearty Italian pasta dish with a rich meat sauce.',
          quantity: 1,
        }
      ]
    },
    {
      id: 'dejihjieu878e6',
      createdAt: '10/09/2001 @ 07:33',
      status: 'completed',
      meals: [
        {
          name: 'Chicken Curry',
          description: 'A spicy and flavorful chicken curry.',
          quantity: 1,
        },
        {
          name: 'Vegetable Stir Fry',
          description: 'A healthy and colorful vegetable stir fry.',
          quantity: 2,
        }
      ]
    }
  ];

  let expandedOrder: string | null = null;

  function toggleOrder(orderId: string) {
    expandedOrder = expandedOrder === orderId ? null : orderId;
  }

  function getStatusStyle(status: string): string {
    switch (status) {
      case 'picked_up':
        return 'bg-emerald-100 text-emerald-700';
      case 'ordered':
        return 'bg-gray-100 text-gray-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'picked_up':
        return 'Picked up';
      case 'ordered':
        return 'Ordered';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  }
</script>

<!-- <main class="px-4 font-lexend flex flex-col gap-4">
  <section>
    <h2 class="text-gray-500 text-sm">See your meal donation history below.</h2>
  </section>
  <section class="">
    <div class="flex justify-between items-center">
      <h3 class="font-bold text-sm">Open Donations.</h3>
      <a href="/newmeal" class="btn text-sm font-normal bg-white shadow-none border-none"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6 text-teal-600"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clip-rule="evenodd"
          />
        </svg>
        New Meal
    </a>
    </div>

    <div class="flex flex-col gap-3 mt-3">
      {#each open_meals as meal_configuration}
        <MealEntryUI {meal_configuration} />
      {/each}
    </div>
  </section>

  <section class="">
    <div class="flex justify-between items-center">
      <h3 class="font-bold text-sm">Completed Donations.</h3>
    </div>

    <div class="flex flex-col gap-3 mt-3">
      {#each closed_meals as meal_configuration}
        <MealEntryUI {meal_configuration} />
      {/each}
    </div>
  </section>
</main> -->



<div class="max-w-2xl mx-auto p-4">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <div class="flex items-center space-x-2">
      <Home size={24} class="text-gray-700" />
      <h1 class="text-xl font-semibold">Hi, Matteo.</h1>
    </div>
    <MenuPopup {menu_configuration} />
  </div>

  <p class="text-gray-600 mb-6">See your meal donation history below.</p>

  <!-- New Meal Button -->
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-lg font-semibold">Open Donations</h2>
    <a href="/newmeal" class="flex items-center space-x-2 bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition-colors">
      <Plus size={16} />
      <span>New Meal</span>
    </a>
  </div>

  <!-- Orders List -->
  <div class="space-y-4">
    {#each sampleOrders as order}
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button 
          on:click={() => toggleOrder(order.id)}
          class="w-full text-left p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex justify-between items-start">
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <Clock size={20} class="text-gray-400" />
                <span class="text-sm text-gray-500">{order.createdAt}</span>
              </div>
              <div>
                <h3 class="text-sm font-semibold">Order #{order.id}</h3>
                <p class="text-sm text-gray-600">
                  {order.meals.reduce((acc, meal) => acc + meal.quantity, 0)} meals
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span class="px-3 py-1 rounded-full text-sm {getStatusStyle(order.status)}">
                {getStatusText(order.status)}
              </span>
              {#if expandedOrder === order.id}
                <ChevronDown size={20} class="text-gray-400" />
              {:else}
                <ChevronRight size={20} class="text-gray-400" />
              {/if}
            </div>
          </div>
        </button>
        
        {#if expandedOrder === order.id}
          <div class="border-t border-gray-200 p-4 bg-gray-50">
            <div class="space-y-4">
              {#each order.meals as meal}
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span class="text-red-600">🍱</span>
                    </div>
                    <div>
                      <h4 class="font-medium">{meal.name}</h4>
                      <p class="text-sm text-gray-600">{meal.description}</p>
                    </div>
                  </div>
                  <span class="text-sm text-gray-500">x{meal.quantity}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

