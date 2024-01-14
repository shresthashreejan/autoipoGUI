import { Database } from 'bun:sqlite';

export const load = async () => {
	const db = new Database('$lib/server/db/accounts.sqlite');
	let response = db.query('SELECT * FROM accounts').all();
	return response();
};
