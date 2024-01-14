<script>
	let results = false;
	function checkResults() {
		console.log('checkResults');
		results = true;
	}
</script>

<div class=" h-screen flex flex-col justify-center items-center gap-4">
	<h1>Check Results</h1>
	{#if results}
		<h1>IPO Results</h1>
	{/if}
	<button class="btn" onclick={checkResults}>Check results</button>
</div>
