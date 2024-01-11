<script>
	export let data;

	let kittaAmount;
	function setKitta(event) {
		let setAmount = event.target.parentElement.childNodes[2].value;
		if (setAmount) {
			kittaAmount = parseInt(setAmount);
		}
	}
</script>

<div class="h-[80vh] flex flex-col justify-center items-center gap-4">
	<div class="flex gap-4">
		<input
			type="number"
			placeholder="Enter amount of kitta"
			class="input input-bordered w-full max-w-xs"
		/>
		<div
			class="tooltip flex justify-center items-center"
			data-tip="Leave empty for minimum amount."
		>
			<span class="indicator-item badge bg-gray-400 text-black">i</span>
		</div>
	</div>

	<button class="btn" onclick={setKitta}>Apply</button>
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
