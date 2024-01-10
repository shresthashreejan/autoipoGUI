<script>
	export let data;
	console.log(data);
</script>

<section>
	<ul class="accounts">
		{#each data.accounts as account}
			<li class="post">
				<h1>{account.username}</h1>
				<h1>{account.boid}</h1>
			</li>
		{/each}
	</ul>
</section>
