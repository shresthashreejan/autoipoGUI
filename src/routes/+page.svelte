<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Toast from '$lib/toast/toast.svelte';

	export let data;
	let fetchedAccounts;
	let defaultAmount = 10;
	let amount = defaultAmount;
	let iteratorCount = 0;
	let showToast = false;
	let toastType;
	let toastMessage;

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
			const response = await Promise.race([
				fetch('/api/apply', {
					method: 'POST',
					body: JSON.stringify({ fetchedAccounts })
				}),
				new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
			]);

			if (!response.ok) {
				throw new Error('Failed to apply');
			}

			iteratorCount = 0;
			showToastMessage('screenshot', 'success');
		} catch (error) {
			iteratorCount++;
			if (iteratorCount < 3) {
				screenshot();
			} else {
				showToastMessage('screenshot', 'error');
			}
			console.error('Error ', error);
		}
	}

	function showToastMessage(message, type) {
		if (type == 'success') {
			toastType = 'success';
			switch (message) {
				case 'screenshot':
					toastMessage = 'Success';
					showToastEvent();
					break;
				default:
					break;
			}
		} else {
			toastType = 'error';
			switch (message) {
				case 'screenshot':
					toastMessage = 'Error';
					showToastEvent();
					break;
				default:
					break;
			}
		}
	}

	function showToastEvent() {
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 5000);
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
	{#if !fetchedAccounts}
		<h2>
			Add accounts from <a href="/settings" class="font-bold">settings</a> to get started.
		</h2>
		<button class="btn" onclick={navigateToSettings}>Settings</button>
	{:else}
		<button class="btn" onclick={setAmount}>Apply</button>
	{/if}
</div>

{#if showToast == true}
	<Toast {toastType} {toastMessage} />
{/if}

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
