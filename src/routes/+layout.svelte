<script>
	import '../app.css';
	import Nav from '$lib/nav/nav.svelte';
	import AnimateContainer from '$lib/animateContainer/animateContainer.svelte';
</script>

<div class="flex">
	<div class="absolute flex"><Nav /></div>
	<AnimateContainer>
		<div class="flex justify-center items-center w-screen h-screen">
			<div class="card w-1/2 h-1/3 bg-base-100 shadow-xl">
				<slot />
			</div>
		</div>
	</AnimateContainer>
</div>
