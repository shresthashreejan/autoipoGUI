<script>
	import Icon from '@iconify/svelte';
	import databaseEditOutline from '@iconify/icons-mdi/database-edit-outline';
	import fileDocumentCheckOutline from '@iconify/icons-mdi/file-document-check-outline';
	import cogOutline from '@iconify/icons-mdi/cog-outline';
	import ThemeToggle from '$lib/themeToggle/themeToggle.svelte';
</script>

<div class="h-screen w-screen md:w-16 flex md:flex-col justify-center items-end mx-4 z-50">
	<nav>
		<ul class="flex md:flex-col">
			<a class="mx-4 md:m-0" href="/"
				><li class="tooltip tooltip-right my-6" data-tip="Apply for new IPOs">
					<button class="btn btn-square">
						<Icon icon={databaseEditOutline} class="w-10 h-10" />
					</button>
				</li></a
			>
			<a class="mx-4 md:m-0" href="/results">
				<li class="tooltip tooltip-right my-6" data-tip="Check your IPO results">
					<button class="btn btn-square">
						<Icon icon={fileDocumentCheckOutline} class="w-10 h-10" />
					</button>
				</li>
			</a>
			<a class="mx-4 md:m-0" href="/settings">
				<li class="tooltip tooltip-right my-6" data-tip="Settings">
					<button class="btn btn-square">
						<Icon icon={cogOutline} class="w-10 h-10" />
					</button>
				</li>
			</a>

			<li class="tooltip tooltip-right my-6" data-tip="Toggle theme">
				<button class="btn btn-square">
					<ThemeToggle />
				</button>
			</li>
		</ul>
	</nav>
</div>
