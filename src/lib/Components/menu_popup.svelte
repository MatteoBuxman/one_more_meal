<script lang="ts">
     //Listener to close the menu when clicked outside
  $effect(() => {
    const details: HTMLDialogElement = document.getElementById(
      "menu_dialog"
    ) as HTMLDialogElement;

    document.addEventListener("click", (e: Event) => {
      if (details.open && !details.contains(e.target as Node)) {
        details.removeAttribute("open");
      }
    });
  });

  type MenuConfiguration = {
    name: string,
    link?: string,
  }

  let { menu_configuration } : { menu_configuration:MenuConfiguration[] } = $props()
</script>

<details class="relative cursor-pointer" id="menu_dialog">
    <summary
      class="bg-white [[open]>&]:bg-gray-200 _no-triangle grid h-10 w-10 place-items-center rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6"
      >
        <path
          fill-rule="evenodd"
          d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
          clip-rule="evenodd"
        />
      </svg>
    </summary>
    <div class="absolute right-0 z-20 md:left-0">
      <div
        class="relative top-1 w-40 rounded-md border border-gray-300 bg-white p-1 shadow-sm"
      >
      <nav class="flex flex-col gap-2 px-2 py-2.5">

        <button
            class="text-left text-base font-semibold opacity-80 last:mr-0 hover:opacity-100"
            onclick={() =>
              (
                document.getElementById("sign_in_modal") as HTMLDialogElement
              ).showModal()}
            >Sign In</button
          >

        {#each menu_configuration as menu_item}
          <a href={menu_item.link} class="text-left text-base font-semibold opacity-80 last:mr-0 hover:opacity-100">{menu_item.name}</a>
        {/each}
        
        </nav>
      </div>
    </div>
</details>

<style>
    details summary::-webkit-details-marker {
    display: none;
  }
</style>