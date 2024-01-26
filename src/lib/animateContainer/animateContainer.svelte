<script>
	import { blur } from 'svelte/transition';
	import { page } from '$app/stores';
</script>

{#key $page.url}
	<div
		in:blur={{
			duration: 500,
			opacity: 0
		}}
	>
		<slot />
	</div>
{/key}
