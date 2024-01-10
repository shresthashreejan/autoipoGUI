import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

async function getAccounts() {
	const pb = new PocketBase('http://127.0.0.1:8090');
	const response = await pb.collection('accounts').getFullList();
	return response;
}

export async function GET() {
	const accounts = await getAccounts();
	return json(accounts);
}
