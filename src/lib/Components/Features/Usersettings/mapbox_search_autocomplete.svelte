<script lang="ts">
  import { MapboxSearchBox } from "@mapbox/search-js-web";
  import type { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
  import { onMount } from "svelte";

  let { selected_location = $bindable()} : {selected_location : SearchBoxRetrieveResponse | null} = $props();

  let search_div: HTMLElement;

  onMount(() => {
    // instantiate a <mapbox-search-box> element using the MapboxSearchBox class
    const searchBoxElement = new MapboxSearchBox();

    searchBoxElement.accessToken =
      "pk.eyJ1IjoibWF0dGVvYnV4bWFuIiwiYSI6ImNsdG85ZmE3MTBmYWsycXJxZmJ1ajF1bjkifQ.f7FqOvPUkAIqAlXty7p4VA";

    // set the options property
    searchBoxElement.options = {
      language: "en",
      country: "ZA",
      proximity: [18.471781, -33.957521],
    };

    //searchBoxElement.input.setAttribute("required", "");

    
    searchBoxElement.addEventListener("retrieve", (event) => {
        selected_location = event.detail;
    });
    
    search_div.appendChild(searchBoxElement as Node);
  });
</script>

<div bind:this={search_div}></div>
