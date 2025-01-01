<script lang="ts">
  import { useAuthStore } from "$lib/Firebase/firebase_init";
  import { loginWithEmail, logOut } from "../Firebase/Auth/login_logout";
  import { Menu } from "lucide-svelte";
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
    name: string;
    link?: string;
  };

  let { menu_configuration }: { menu_configuration: MenuConfiguration[] } =
    $props();

  let userAuth = useAuthStore();

  function handleSignIn() {
    if ($userAuth.user) {
      logOut();
      return;
    }

    loginWithEmail('buxmanm@icloud.com', 'helloW');
  }

  
</script>

<details class="relative cursor-pointer" id="menu_dialog">
  <summary
    class="bg-white [[open]>&]:bg-gray-200 _no-triangle grid h-10 w-10 place-items-center rounded-full"
  >
    <Menu size={24} />
  </summary>
  <div class="absolute right-0 z-20 md:left-0">
    <div
      class="relative top-1 w-40 rounded-md border border-gray-300 bg-white p-1 shadow-sm"
    >
      <nav class="flex flex-col gap-2 px-2 py-2.5">
        <button
          class="text-left text-base font-semibold opacity-80 last:mr-0 hover:opacity-100"
          onclick={handleSignIn}>{$userAuth.user ? 'Sign Out' : 'Sign In'}</button
        >

        {#each menu_configuration as menu_item}
          <a
            href={menu_item.link}
            class="text-left text-base font-semibold opacity-80 last:mr-0 hover:opacity-100"
            >{menu_item.name}</a
          >
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
