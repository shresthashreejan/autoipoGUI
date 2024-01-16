<script>
	function openModal() {
		document.querySelector('#add-accounts-modal').showModal();
	}

	async function addAccount(event) {
		event.preventDefault();
		try {
			const form = event.target;
			const data = new FormData(form);

			let response = await fetch('/api/addAccount', {
				method: 'POST',
				body: data
			});

			if (!response.ok) {
				throw new Error('Failed to add account');
			}

			const responseData = await response.json();
			console.log(responseData);

			document.querySelector('#add-accounts-modal').close();
		} catch (error) {
			console.error('Error fetching accounts:', error);
			console.error(error.stack);
		}
	}

	let fetchedAccounts;
	async function fetchAccounts() {
		try {
			const response = await fetch('/api/fetchAccounts');
			const data = await response.json();
			fetchedAccounts = data;
		} catch (error) {
			console.error('Error fetching accounts:', error);
		}
	}

	function openTempModal() {
		fetchAccounts().then(() => {
			document.querySelector('#temp-modal').showModal();
		});
	}
</script>

<dialog id="temp-modal" class="modal">
	<div class="modal-box w-auto">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h1>{JSON.stringify(fetchedAccounts)}</h1>
	</div>
</dialog>

<div class="h-screen flex flex-col justify-center items-center gap-4">
	<h1>Settings</h1>
	<button class="btn" onclick={openModal}>Add accounts</button>
	<button class="btn" onclick={openTempModal}>View accounts</button>
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
