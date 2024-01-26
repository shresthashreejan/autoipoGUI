<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { showToastMessage } from '$lib/stores/toastStore';

	export let data;
	let fetchedAccounts;
	let defaultAmount = 10;
	let amount = defaultAmount;
	let iteratorCount = 0;

	onMount(async () => {
		try {
			const response = await fetch('/api/fetchAccounts', {
				method: 'GET'
			});
			const data = await response.json();
			if (data.data.length !== 0) {
				fetchedAccounts = data.data;
			}
		} catch (error) {
			console.error('Error fetching accounts:', error);
		}
	});

	function navigateToSettings() {
		goto('/settings');
	}

	function setAmount(event) {
		let setAmount = document.querySelector('#set-amount').value;
		if (setAmount) {
			amount = parseInt(setAmount);
		}
		screenshot();
	}

	async function screenshot() {
		try {
			let response;
			if (iteratorCount == 0) {
				response = await Promise.race([
					fetch('/api/apply', {
						method: 'POST',
						body: JSON.stringify({ fetchedAccounts })
					}),
					new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
				]);
			} else {
				response = await fetch('/api/apply', {
					method: 'POST',
					body: JSON.stringify({ fetchedAccounts })
				});
			}

			if (!response.ok) {
				throw new Error('Failed to apply');
			}

			if (response.ok) {
				showToastMessage('success', 'screenshot');
			}

			iteratorCount = 0;
		} catch (error) {
			iteratorCount++;
			if (iteratorCount < 2) {
				screenshot();
			}
			console.error('Error ', error);
		}
	}
</script>

<div class="h-screen flex flex-col justify-center items-center gap-4">
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
			<span class="bg-neutral w-6 rounded-full text-white">i</span>
		</div>
	</div>
	{#if !fetchedAccounts}
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
