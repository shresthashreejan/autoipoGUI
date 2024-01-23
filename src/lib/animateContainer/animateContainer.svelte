<script>
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
</script>

{#key $page.url}
	<div
		in:fly={{
			duration: 300,
			opacity: 0,
			y: '10%'
		}}
	>
		<slot />
	</div>
{/key}
