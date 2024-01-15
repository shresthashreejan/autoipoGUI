<script>
	function openModal() {
		document.querySelector('#add-accounts-modal').showModal();
	}

	async function addAccount(event) {
		const form = event.target;
		const data = new FormData(form);

		let response = await fetch('/api/addAccount', {
			method: 'POST',
			body: data
		});
	}

	async function fetchAccounts() {
		let response = await fetch('/api/fetchAccounts');
		console.log('RESPONSE: ' + response);
	}
</script>

<div class="h-screen flex flex-col justify-center items-center gap-4">
	<h1>Settings</h1>
	<button class="btn" onclick={openModal}>Add accounts</button>
	<button class="btn" onclick={fetchAccounts}>View accounts</button>
</div>

<dialog id="add-accounts-modal" class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h2 class="text-2xl font-bold mb-4">Add accounts</h2>

		<form onsubmit={addAccount}>
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
