<script lang="ts">
  import type { MealEntry } from "$lib/Types/meal_dashboard";
  let { meal_configuration }: { meal_configuration: MealEntry } = $props();

  const formatUTCDateTime = (utcTime : number) => {
    const date = new Date(utcTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} @ ${hours}:${minutes}`;
};

</script>

<div class="p-2 rounded-lg font-lexend border border-slate-100 h-32">
  <div class="flex justify-between h-full">
    <div class="flex flex-col gap-3 justify-between">
      <div class="flex flex-col gap-1">
        <h2>{meal_configuration.name}</h2>
        <h4 class="text-slate-400 font-light text-xs">
          {meal_configuration.description}
        </h4>
        <h4 class="text-slate-400 font-light text-xs">
            {`Created on: ${formatUTCDateTime(meal_configuration.created_at)}`}
          </h4>
      </div>
      <h3 class="text-sm">Click to expand.</h3>
    </div>
    <div class="flex flex-col justify-between items-end min-w-24">
      <span class="badge badge-accent">picked up</span>
      <svg
        class="w-12 bg-slate-200 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 64 64"
      >
        <!-- Apple Body -->
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
