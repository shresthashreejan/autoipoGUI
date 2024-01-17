import { Database } from 'bun:sqlite';

export const GET = async () => {
	const db = new Database('accounts.sqlite');

	try {
		let rows = await db.query('SELECT * FROM accounts').all();
		db.close();
		const response = {
			status: 'success',
			data: rows
		};

		const responseBody = JSON.stringify(response);

		return new Response(responseBody, {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching data:', error);
		return new Response(JSON.stringify({ status: 'error', message: 'Error fetching data' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500
		});
	}
};
