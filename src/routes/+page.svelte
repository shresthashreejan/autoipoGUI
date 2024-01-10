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
	<input
		type="number"
		placeholder="Enter amount of kitta"
		class="input input-bordered w-full max-w-xs"
	/>
	<span>Leave empty for default amount!</span>
	<button class="btn" onclick={setKitta}>
		Apply
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"><path d="M22 2L10 17 2 10" /></svg
		>
	</button>
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
