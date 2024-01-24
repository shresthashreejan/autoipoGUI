<script>
	import '../app.css';
	import Nav from '$lib/nav/nav.svelte';
	import { page } from '$app/stores';
	import AnimateContainer from '$lib/animateContainer/animateContainer.svelte';
	import Toast from '$lib/toast/toast.svelte';
	import { toastStore } from '$lib/stores/toastStore';

	let toastType;
	let toastMessage;

	$: {
		let path = $page.url.pathname;
		if (path) {
			getHeader(path);
		}
	}

	function getHeader(path) {
		let header;
		switch (path) {
			case '/':
				header = 'Apply ipo /';
				break;
			case '/results':
				header = 'Check ipo results /';
				break;
			case '/settings':
				header = 'Settings /';
				break;
			default:
				break;
		}
		setHeaderList(header);
	}

	let headerList = [];
	function setHeaderList(header) {
		headerList = Array.from({ length: 20 }, () => header);
	}

	$: {
		({ toastType, toastMessage } = $toastStore);
	}
</script>

<AnimateContainer>
	<div
		class="ipo-slider whitespace-nowrap overflow-hidden lg:mt-10 absolute lg:flex hidden bg-gray-700 text-white py-4 scroll-smooth"
	>
		{#each headerList as header}
			<div class="ipo-header inline-block lg:text-7xl uppercase italic">
				{header}
			</div>
		{/each}
	</div>
</AnimateContainer>

<div class="flex">
	<div class="absolute flex"><Nav /></div>
	<AnimateContainer>
		<div class="flex justify-center items-center w-screen h-screen">
			<div class="main-section"><slot /></div>
		</div>
	</AnimateContainer>
</div>

{#if $toastStore.showToast}
	<Toast {toastType} {toastMessage} />
{/if}

<style>
	.main-section {
		z-index: 100;
	}
	.ipo-header {
		padding: 0 20px;
		animation: scroll 3s linear infinite;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
