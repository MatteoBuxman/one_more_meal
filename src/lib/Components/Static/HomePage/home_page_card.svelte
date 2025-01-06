<script lang="ts">
    let { index, title, description } = $props();
</script>

<div class="p-4 rounded-lg flex flex-col border gap-4">
    <div class="flex flex-col gap-2">
        <h4 class="text-[#F9D200]">Step {index}</h4>
        <h3 class="font-bold text-lg">{title}</h3>
        <div class="divider my-1"></div>
    </div>
    <p class="font-light text-sm">{description}</p>
    <div class="flex justify-end">
        <button class="btn ">Learn More <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
          </button>
    </div>
</div>