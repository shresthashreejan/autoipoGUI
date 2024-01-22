<script>
	export let toastType;
	export let toastMessage;
</script>

<div class="toast">
	{#if toastType == 'success'}
		<div class="alert alert-success">
			<span class=" text-white">{toastMessage}</span>
		</div>
	{:else}
		<div class="alert bg-red-400">
			<span class=" text-white">{toastMessage}</span>
		</div>
	{/if}
</div>
