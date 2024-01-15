import { Database } from 'bun:sqlite';

export const GET = async () => {
	const db = new Database('accounts.sqlite');
	let rows = await db.query('SELECT * FROM accounts').all();
	return new Response(JSON.stringify({ body: rows }));
};
