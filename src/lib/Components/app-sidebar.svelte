<script lang="ts">

	import * as Sidebar from "$lib/components/ui/sidebar/index";
  	import { useAuthStore } from "$lib/firebase/firebase_init";
	import type { ComponentProps } from "svelte";
	import { signedOutItems, signedInItems } from "$lib/types/sidebar_menu_items";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
	const auth = useAuthStore();
	const sidebar = Sidebar.useSidebar();

	let data = $derived($auth.user ? signedInItems : signedOutItems);
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Content>
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton onclick={() => {sidebar.toggle();}}>
									{#snippet child({ props })}
										<a href={item.url} {...props}>{item.title}</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
