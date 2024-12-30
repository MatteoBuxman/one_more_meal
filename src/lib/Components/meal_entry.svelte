<script lang="ts">
  import type { MealEntry } from "$lib/Types/meals";
  import StatusBadge from "./status_badge.svelte";
  let { meal_configuration }: { meal_configuration: MealEntry } = $props();

  const formatDateTime = (utcTime: number) => {
    const date = new Date(utcTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} @ ${hours}:${minutes}`;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      (
        document.getElementById(meal_configuration.uuid) as HTMLDialogElement
      ).showModal();
    }
  };
</script>

<div
  class="p-2 rounded-lg font-lexend border border-slate-100 h-32"
  role="button"
  tabindex="0"
  onkeydown={handleKeyDown}
  onclick={() =>
    (
      document.getElementById(meal_configuration.uuid) as HTMLDialogElement
    ).showModal()}
  aria-haspopup="dialog"
>
  <div class="flex justify-between h-full">
    <div class="flex flex-col gap-3 justify-between">
      <div class="flex flex-col gap-1">
        <h2>{meal_configuration.name}</h2>
        <h4 class="text-slate-400 font-light text-xs">
          {meal_configuration.description}
        </h4>
        <h4 class="text-slate-400 font-light text-xs">
          {`Created on: ${formatDateTime(meal_configuration.created_at)}`}
        </h4>
      </div>
      <h3 class="text-sm">Click to expand.</h3>
    </div>
    <div class="flex flex-col justify-between items-end min-w-24">
      <StatusBadge status={meal_configuration.status} />
      <svg
        class="w-12 bg-slate-200 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 64 64"
      >
        <path
          d="M32,12 C40,12 48,20 48,28 C48,38 40,50 32,50 C24,50 16,38 16,28 C16,20 24,12 32,12 Z"
          fill="#FF5722"
        />
        <!-- Leaf -->
        <path
          d="M37,8 C39,6 42,6 44,8 C46,10 45,12 44,14 C42,16 39,16 37,14 C35,12 35,10 37,8 Z"
          fill="#4CAF50"
        />

        <!-- Highlight -->
        <circle cx="27" cy="23" r="3" fill="rgba(255,255,255,0.7)" />
      </svg>
    </div>
  </div>
</div>

<!-- Modal structure -->

<dialog id={meal_configuration.uuid} class="modal relative font-lexend">
  <div
    class="modal-box absolute w-full bottom-0 top-20 rounded-t-lg rounded-b-none"
  >
    <button
      aria-label="Close modal"
      onclick={() =>
        (
          document.getElementById(meal_configuration.uuid) as HTMLDialogElement
        ).close()}
      ><svg
        class="ml-auto size-6 mb-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg></button
    >

    <div class="flex gap-4 w-full items-center">
      <svg
        class="size-14 bg-slate-200 rounded-full flex-grow-0 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 64 64"
      >
        <path
          d="M32,12 C40,12 48,20 48,28 C48,38 40,50 32,50 C24,50 16,38 16,28 C16,20 24,12 32,12 Z"
          fill="#FF5722"
        />
        <!-- Leaf -->
        <path
          d="M37,8 C39,6 42,6 44,8 C46,10 45,12 44,14 C42,16 39,16 37,14 C35,12 35,10 37,8 Z"
          fill="#4CAF50"
        />

        <!-- Highlight -->
        <circle cx="27" cy="23" r="3" fill="rgba(255,255,255,0.7)" />
      </svg>

      <div class="flex flex-col">
        <h2 class="font-bold text-lg">{meal_configuration.name}</h2>
        <h4 class="font-light text-sm">
          {meal_configuration.description || "No description."}
        </h4>
      </div>
    </div>
    <div class="flex flex-col gap-2 text-sm mt-4">
      <h3 class="font-light text-gray-500">
        Meal ID <span class="font-semibold">{meal_configuration.uuid}</span>
      </h3>
      <h3 class="font-light text-gray-500">
        Created on {formatDateTime(meal_configuration.created_at)}
      </h3>
      <StatusBadge status={meal_configuration.status} />
    </div>
    <div class="mt-5">
      <a href="/" class="link font-light text-sm"
        >Contact us with regards to this meal.</a
      >
    </div>
    <div class="flex items-center justify-center mt-10">
      {#if meal_configuration.completion_image}
        <img
          loading="lazy"
          src={meal_configuration.completion_image}
          alt="Order completion"
          class="aspect-[9/16]"
        />
      {:else if meal_configuration.status === "completed" || meal_configuration.status === "cancelled"}
        <h2 class="font-semibold">No image was provided for this order.</h2>
      {/if}
    </div>
  </div>
</dialog>
