<script>
	import '../app.css';
	import Nav from '$lib/nav/nav.svelte';
	import AnimateContainer from '$lib/animateContainer/animateContainer.svelte';
	import Toast from '$lib/toast/toast.svelte';
	import { toastStore } from '$lib/stores/toastStore';

	let showToast;
	let toastType;
	let toastMessage;

	$: {
		({ showToast, toastType, toastMessage } = $toastStore);
	}
</script>

<div class="flex">
	<div class="absolute flex"><Nav /></div>
	<AnimateContainer>
		<div class="flex justify-center items-center w-screen h-screen">
			<slot />
		</div>
	</AnimateContainer>
</div>

{#if $toastStore.showToast}
	<Toast {toastType} {toastMessage} />
{/if}
