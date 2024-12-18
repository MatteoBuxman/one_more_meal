<script lang="ts">
  import type { MealEntry } from "$lib/Types/meals";
  import MenuPopup from "$lib/Components/menu_popup.svelte";
  import MealEntryUI from "$lib/Components/meal_entry.svelte";

  const menu_configuration = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  let open_meals: MealEntry[] = [
    {
      uuid: "h73gdt6389s",
      name: "Rice and Beans",
      description: "Rice and Beans. A classic meal.",
      created_at: 1000000000000,
      status: 'picked up',
    },
    {
      uuid: "a1b2c3d4e5f6",
      name: "Spaghetti Bolognese",
      description: "A hearty Italian pasta dish with a rich meat sauce.",
      created_at: 1000050000001,
      status: 'order placed',
    },
  ];

  let closed_meals: MealEntry[] = [
    {
      uuid: "g7h8i9j0k1l2",
      name: "Chicken Curry",
      description: "A spicy and flavorful chicken curry.",
      created_at: 1000100000002,
      status: 'completed',
      completion_image: "https://random.imagecdn.app/320/569",
    },
    {
      uuid: "m3n4o5p6q7r8",
      name: "Vegetable Stir Fry",
      description: "A healthy and colorful vegetable stir fry.",
      created_at: 1000150000003,
      status: 'completed',
      completion_image: "https://random.imagecdn.app/320/569",
    },
  ];
</script>

<nav class="flex justify-between items-center font-lexend p-4">
  <div class="flex gap-3 p-2 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-6"
    >
      <path
        d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
      />
      <path
        d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
      />
    </svg>

    <h1 class="text-2xl font-semibold">Hi, Matteo.</h1>
  </div>

  <MenuPopup {menu_configuration} />
</nav>

<main class="px-4 font-lexend flex flex-col gap-4">
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
</main>
