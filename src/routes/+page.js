export async function load({ fetch }) {
	const response = await fetch('api/getAccounts');
	const accounts = await response.json();
	return { accounts };
}
