<script>
	let currentRoute = '/';
</script>

<nav class="bg-white p-4">
	<div class="container mx-auto flex justify-end gap-4">
		<a href="/" class={currentRoute == '/' ? 'font-bold' : ''}>Home</a>
		<a href="/settings" class={currentRoute == '/settings' ? 'font-bold' : ''}>Settings</a>
	</div>
</nav>
