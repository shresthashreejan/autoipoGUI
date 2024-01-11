<script>
	let results = false;
	function checkResults() {
		console.log('checkResults');
		results = true;
	}
</script>

<div class="flex flex-col justify-center items-center">
	{#if results}
		<h1>IPO Results</h1>
	{/if}
	<button class="btn" onclick={checkResults}>Check results</button>
</div>
