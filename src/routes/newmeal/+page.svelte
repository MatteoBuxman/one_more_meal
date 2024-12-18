<script lang="ts">
  import MenuPopup from "$lib/Components/menu_popup.svelte";
  import OneMoreMealPackagingFlow from "$lib/Components/Flows/one_more_meal_packaging_flow.svelte";
  import OwnPackagingFlow from "$lib/Components/Flows/own_packaging_flow.svelte";

  const menu_configuration = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  let new_meal_selection: undefined | "company" | "customer" =
    $state(undefined);
  //User selects type of meal
  function handleCompany(e: Event): void {
    new_meal_selection = "company";
  }

  function handleCustomer(e: Event): void {
    new_meal_selection = "customer";
  }
</script>

<nav class="navbar p-4">
  <div class="flex flex-1">
    <img src="/main_logo_pinkaccent.png" alt="logo_image" class="w-7" />
    <div class="divider divider-horizontal m-0"></div>
    <a class="text-xl font-lexend" aria-label="home_link" href="/"
      >Add New Meal</a
    >
  </div>
  <MenuPopup {menu_configuration} />
</nav>
<h3 class="text-sm text-slate-500 mx-4">Please select an option below.</h3>
<main class="font-lexend">
  <h3 class="text-sm text-slate-500 mx-4 my-3 font-light">I purchased my...</h3>
  <div class="flex items-center justify-evenly m-4">
    <div
      onclick={handleCompany}
      class="rounded {new_meal_selection === 'company'
        ? 'bg-gray-300 shadow'
        : 'bg-gray-100'} flex flex-col items-center p-3 size-40"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M3 9h6V3H3zm1-5h4v4H4zm1 1h2v2H5zm10 4h6V3h-6zm1-5h4v4h-4zm1 1h2v2h-2zM3 21h6v-6H3zm1-5h4v4H4zm1 1h2v2H5zm15 2h1v2h-2v-3h1zm0-3h1v1h-1zm0-1v1h-1v-1zm-10 2h1v4h-1v-4zm-4-7v2H4v-1H3v-1h3zm4-3h1v1h-1zm3-3v2h-1V3h2v1zm-3 0h1v1h-1zm10 8h1v2h-2v-1h1zm-1-2v1h-2v2h-2v-1h1v-2h3zm-7 4h-1v-1h-1v-1h2v2zm6 2h1v1h-1zm2-5v1h-1v-1zm-9 3v1h-1v-1zm6 5h1v2h-2v-2zm-3 0h1v1h-1v1h-2v-1h1v-1zm0-1v-1h2v1zm0-5h1v3h-1v1h-1v1h-1v-2h-1v-1h3v-1h-1v-1zm-9 0v1H4v-1zm12 4h-1v-1h1zm1-2h-2v-1h2zM8 10h1v1H8v1h1v2H8v-1H7v1H6v-2h1v-2zm3 0V8h3v3h-2v-1h1V9h-1v1zm0-4h1v1h-1zm-1 4h1v1h-1zm3-3V6h1v1z"
        /><path fill="none" d="M0 0h24v24H0z" /></svg
      >
      <h2 class="text-sm font-light text-center">
        packaging from One More Meal.
      </h2>
    </div>
    <div
      onclick={handleCustomer}
      class="rounded {new_meal_selection === 'customer'
        ? 'bg-gray-300 shadow'
        : 'bg-gray-100'} flex flex-col justify-between items-center p-3 size-40"
    >
      <svg
        class="size-24"
        version="1.1"
        id="_x32_"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <style type="text/css">
          .st0 {
            fill: #000000;
          }
        </style>
        <g>
          <path
            class="st0"
            d="M332.933,213.451c-20.713,17.784-47.559,28.624-76.938,28.624c-29.37,0-56.224-10.84-76.928-28.624
		c-54.991,20.952-92.686,66.126-92.686,132.094v98.082c0,0,14.505,19.331,45.864,37.437v-69.339h28.992v83.228
		c24.848,9.78,56.243,17.047,94.758,17.047c38.524,0,69.901-7.266,94.767-17.047v-83.228h28.992v69.339
		c31.359-18.106,45.864-37.437,45.864-37.437v-98.082C425.618,279.577,387.923,234.403,332.933,213.451z"
          />
          <path
            class="st0"
            d="M255.996,213.902c49.299,0,89.26-39.96,89.26-89.259V89.269C345.255,39.96,305.294,0,255.996,0
		c-49.3,0-89.268,39.96-89.268,89.269v35.374C166.727,173.942,206.696,213.902,255.996,213.902z"
          />
        </g>
      </svg>
      <h2 class="text-sm font-light text-center">own packaging.</h2>
    </div>
  </div>
  {#if new_meal_selection === "company"}
    <OneMoreMealPackagingFlow />
  {:else if new_meal_selection === "customer"}
    <OwnPackagingFlow />
  {/if}
</main>
