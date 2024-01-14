<script>
	import { goto } from '$app/navigation';
	export let data;

	function navigateToSettings() {
		goto('/settings');
	}

	let defaultAmount = 100;
	let amount = defaultAmount;

	function setAmount(event) {
		let setAmount = document.querySelector('#set-amount').value;
		if (setAmount) {
			amount = parseInt(setAmount);
		}
	}
</script>

<div class="h-screen flex flex-col justify-center items-center gap-4">
	<h1>Apply IPO</h1>
	<div class="flex gap-2">
		<input
			type="number"
			placeholder="Enter amount of kitta"
			class="input input-bordered w-full max-w-xs"
			id="set-amount"
		/>
		<div
			class="tooltip flex justify-center items-center"
			data-tip="Leave empty for minimum amount."
		>
			<span class=" bg-slate-600 w-6 rounded-full text-white">i</span>
		</div>
	</div>
	{#if Object.keys(data).length === 0}
		<h2>
			Add accounts from <a href="/settings" class="font-bold">settings</a> to get started.
		</h2>
		<button class="btn" onclick={navigateToSettings}>Settings</button>
	{:else}
		<button class="btn" onclick={setAmount}>Apply</button>
	{/if}
</div>

<style>
	/* For WebKit browsers (Chrome, Safari) */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* For Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
