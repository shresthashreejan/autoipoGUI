<script>
	import Icon from '@iconify/svelte';
	import deleteOutline from '@iconify/icons-mdi/delete-outline';
	import creditCardEditOutline from '@iconify/icons-mdi/credit-card-edit-outline';
	import { showToastMessage } from '$lib/stores/toastStore';

	export let fetchedAccounts;

	let iteratorCount = 0;

	async function deleteAccount(event) {
		try {
			let response;
			const id = event.target.id;

			if (id) {
				response = await fetch(`/api/deleteAccount/${id}`, {
					method: 'DELETE'
				});
			}

			if (!response.ok) {
				throw new Error('Failed to delete account');
			}

			document.querySelector('#view-accounts-modal').close();
		} catch (error) {
			console.error('Error deleting account:', error);
		}
	}

	function filterSelectedAccount(id) {
		if (fetchedAccounts) {
			fetchedAccounts = fetchedAccounts.filter((account) => account.id === parseInt(id));
		}
	}

	async function editAccount(event) {
		event.preventDefault();
		try {
			let response;
			const form = event.target;
			const id = form.id;
			const data = await new FormData(form);
			data.append('id', id);
			if (data) {
				response = await await Promise.race([
					fetch('/api/editAccount', {
						method: 'PUT',
						body: data
					}),
					new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
				]);
			}

			if (!response.ok) {
				throw new Error('Failed to edit account');
			}

			iteratorCount = 0;
			document.querySelector('#edit-account-modal').close();
			showToastMessage('success', 'editAccount');
		} catch (error) {
			iteratorCount++;
			if (iteratorCount < 2) {
				editAccount(event);
			} else {
				showToastMessage('error', 'editAccount');
			}
			console.error('Error editing account:', error);
		}
	}

	function openEditModal(event) {
		document.querySelector('#view-accounts-modal').close();
		const id = event.target.id;
		filterSelectedAccount(id);
		document.querySelector('#edit-account-modal').showModal();
	}
</script>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>Username</th>
				<th>Password</th>
				<th>Client Id</th>
				<th>DEMAT No.</th>
				<th>CRN</th>
				<th>BOID</th>
				<th>DP</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each fetchedAccounts as account}
				<tr
					><td>{account.id}</td>
					<td>{account.username}</td>
					<td>{account.password}</td>
					<td>{account.client_id}</td>
					<td>{account.demat_no}</td>
					<td>{account.crn}</td>
					<td>{account.boid}</td>
					<td>{account.dp}</td>
					<td
						><span class="gap-2">
							<li class="tooltip my-6" data-tip="Edit account">
								<button class="btn btn-square" onclick={openEditModal} id={account.id}>
									<Icon icon={creditCardEditOutline} height="25" id={account.id} />
								</button>
							</li>
							<li class="tooltip my-6" data-tip="Delete account">
								<button class="btn btn-square" onclick={deleteAccount} id={account.id}>
									<Icon icon={deleteOutline} height="25" id={account.id} />
								</button>
							</li></span
						></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<dialog id="edit-account-modal" class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h2 class="text-2xl font-bold mb-4">Edit account</h2>

		{#if fetchedAccounts}
			<form onsubmit={editAccount} method="PUT" id={fetchedAccounts[0].id}>
				<div class="mb-4">
					<label for="username" class="block text-sm font-medium ">Username</label>
					<input
						type="text"
						name="username"
						class="mt-1 p-2 w-full border rounded-md"
						value={fetchedAccounts[0].username}
						required
					/>
				</div>
				<div class="mb-4">
					<label for="password" class="block text-sm font-medium ">Password</label>
					<input
						type="password"
						name="password"
						class="mt-1 p-2 w-full border rounded-md"
						value={fetchedAccounts[0].password}
						required
					/>
				</div>
				<div class="mb-4">
					<label for="client_id" class="block text-sm font-medium ">Client ID</label>
					<input
						type="number"
						name="client_id"
						class="mt-1 p-2 w-full border rounded-md"
						value={fetchedAccounts[0].client_id}
						required
					/>
				</div>
				<div class="mb-4">
					<label for="demat_no" class="block text-sm font-medium ">Demat No.</label>
					<input
						type="text"
						name="demat_no"
						class="mt-1 p-2 w-full border rounded-md"
						value={fetchedAccounts[0].demat_no}
						required
					/>
				</div>
				<div class="mb-4">
					<label for="crn" class="block text-sm font-medium ">CRN</label>
					<input
						type="text"
						name="crn"
						class="mt-1 p-2 w-full border rounded-md"
						value={fetchedAccounts[0].crn}
						required
					/>
				</div>
				<div class="mb-4">
					<label for="boid" class="block text-sm font-medium ">BOID</label>
					<input
						type="number"
						name="boid"
						class="mt-1 p-2 w-full border rounded-md"
						value={fetchedAccounts[0].boid}
						required
					/>
				</div>
				<div class="mb-4">
					<label for="dp" class="block text-sm font-medium "
						>Depository Participants</label
					>
					<input
						type="number"
						name="dp"
						class="mt-1 p-2 w-full border rounded-md"
						value={fetchedAccounts[0].dp}
						required
					/>
				</div>
				<button type="submit" class="btn">Save</button>
			</form>
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
