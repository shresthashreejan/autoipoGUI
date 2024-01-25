<script>
	import Table from '$lib/table/table.svelte';
	import { showToastMessage } from '$lib/stores/toastStore';

	let fetchedAccounts;
	let iteratorCount = 0;

	async function addAccount(event) {
		event.preventDefault();
		try {
			const form = event.target;
			const data = await new FormData(form);

			let response;
			if (data) {
				response = await Promise.race([
					fetch('/api/addAccount', {
						method: 'POST',
						body: data
					}),
					new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
				]);
			}

			if (!response.ok) {
				throw new Error('Failed to add account');
			}

			iteratorCount = 0;
			document.querySelector('#add-accounts-modal').close();
			showToastMessage('success', 'addAccount');
		} catch (error) {
			iteratorCount++;
			if (iteratorCount < 2) {
				addAccount(event);
			} else {
				showToastMessage('error', 'addAccount');
			}
			console.error('Error adding account:', error);
		}
	}

	async function fetchAccounts() {
		try {
			const response = await fetch('/api/fetchAccounts', {
				method: 'GET'
			});
			const data = await response.json();
			fetchedAccounts = data.data;
			showToastMessage('success', 'fetchAccounts');
		} catch (error) {
			showToastMessage('error', 'fetchAccounts');
			console.error('Error fetching accounts:', error);
		}
	}

	async function clearAllAccounts() {
		try {
			await fetch('/api/clearAllAccounts', {
				method: 'DELETE'
			});
			showToastMessage('success', 'clearAllAccounts');
		} catch (error) {
			showToastMessage('error', 'clearAllAccounts');
			console.error('Error deleting all accounts:', error);
		}
	}

	function openAddAccModal() {
		document.querySelector('#add-accounts-modal').showModal();
	}

	function openViewAccModal() {
		fetchAccounts().then(() => {
			document.querySelector('#view-accounts-modal').showModal();
		});
	}
</script>

<div class="h-screen flex flex-col justify-center items-center gap-4">
	<h1>Settings</h1>
	<div class="flex gap-4">
		<button class="btn" onclick={openAddAccModal}>Add accounts</button>
		<button class="btn" onclick={openViewAccModal}>View accounts</button>
		<button class="btn" onclick={clearAllAccounts}>Clear all accounts</button>
	</div>
</div>

<dialog id="add-accounts-modal" class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h2 class="text-2xl font-bold mb-4">Add accounts</h2>

		<form onsubmit={addAccount} method="POST">
			<div class="mb-4">
				<label for="username" class="block text-sm font-medium text-gray-600">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					class="mt-1 p-2 w-full border rounded-md"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-600">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					class="mt-1 p-2 w-full border rounded-md"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="client_id" class="block text-sm font-medium text-gray-600">Client ID</label>
				<input
					type="number"
					id="client_id"
					name="client_id"
					class="mt-1 p-2 w-full border rounded-md"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="demat_no" class="block text-sm font-medium text-gray-600">Demat No.</label>
				<input
					type="text"
					id="demat_no"
					name="demat_no"
					class="mt-1 p-2 w-full border rounded-md"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="crn" class="block text-sm font-medium text-gray-600">CRN</label>
				<input type="text" id="crn" name="crn" class="mt-1 p-2 w-full border rounded-md" required />
			</div>
			<div class="mb-4">
				<label for="boid" class="block text-sm font-medium text-gray-600">BOID</label>
				<input
					type="number"
					id="boid"
					name="boid"
					class="mt-1 p-2 w-full border rounded-md"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="dp" class="block text-sm font-medium text-gray-600"
					>Depository Participants</label
				>
				<input type="number" id="dp" name="dp" class="mt-1 p-2 w-full border rounded-md" required />
			</div>
			<button type="submit" class="btn">Save</button>
		</form>
	</div>
</dialog>

<dialog id="view-accounts-modal" class="modal">
	<div class="modal-box max-w-[80vw]">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="flex justify-center">
			<h2 class="text-2xl font-bold mb-4">Saved accounts</h2>
		</div>
		{#if fetchedAccounts}
			<Table {fetchedAccounts} />
		{/if}
	</div>
</dialog>

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
