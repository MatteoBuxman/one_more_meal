<script lang="ts">
  import { onMount } from "svelte";

  let visible = $state(false);

  function googleTypeLoadingBar(
    _: HTMLDivElement,
    { delay = 0, duration = 600 }
  ) {
    function animationLogic(t: number, u: number) {
      if (t < 0.5) {
        return `right: ${100 - t * 200}%; left: 0px;`;
      } else {
        return `right: 0px; left: ${100 - u * 200}%;`;
      }
    }

    return {
      delay,
      duration,
      css: animationLogic,
    };
  }

  onMount(() => {
    visible = true;
    const interval = setInterval(() => {
      visible = !visible;
    }, 600);

    return () => clearInterval(interval);
  });
</script>

{#if visible}
  <div class="w-full h-[3px] relative">
    <div
      transition:googleTypeLoadingBar={{ delay: 0, duration: 600 }}
      class="bg-primary h-[3px] absolute top-0 bottom-0 left-0 right-0"
    ></div>
  </div>
{/if}
