<script>
	import Icon from '@iconify/svelte';
	import databaseEditOutline from '@iconify/icons-mdi/database-edit-outline';
	import fileDocumentCheckOutline from '@iconify/icons-mdi/file-document-check-outline';
	import cogOutline from '@iconify/icons-mdi/cog-outline';
</script>

<div class="fixed top-0 left-0 h-screen w-16 flex flex-col justify-center mx-4">
	<nav>
		<ul>
			<a href="/"
				><li class="tooltip tooltip-right my-6" data-tip="Apply for new IPOs">
					<button class="btn btn-square">
						<Icon icon={databaseEditOutline} height="30" />
					</button>
				</li></a
			>
			<a href="/results">
				<li class="tooltip tooltip-right my-6" data-tip="Check your IPO results">
					<button class="btn btn-square">
						<Icon icon={fileDocumentCheckOutline} height="30" />
					</button>
				</li>
			</a>
			<a href="/settings">
				<li class="tooltip tooltip-right my-6" data-tip="Settings">
					<button class="btn btn-square">
						<Icon icon={cogOutline} height="30" />
					</button>
				</li>
			</a>
		</ul>
	</nav>
</div>
