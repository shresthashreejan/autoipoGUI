<script>
	import { goto } from '$app/navigation';

	function navigateToSettings() {
		goto('/settings');
	}

	let results = false;

	function checkResults() {
		results = true;
	}
</script>

<div class=" h-screen flex flex-col justify-center items-center gap-4">
	<h1>Check Results</h1>
	{#if results}
		<h1>IPO Results</h1>
	{/if}
	<!-- {#if Object.keys(data).length === 0}
		<h2>
			Add accounts from <a href="/settings" class=" font-bold">settings</a> to get started.
		</h2>
		<button class="btn" onclick={navigateToSettings}> Settings</button>
	{:else} -->
	<button class="btn" onclick={checkResults}>Check results</button>
	<!-- {/if} -->
</div>
