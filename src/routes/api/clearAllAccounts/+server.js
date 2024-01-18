import { Database } from 'bun:sqlite';

export const DELETE = async () => {
	const db = new Database('accounts.sqlite');
	try {
		await db.query('DELETE FROM accounts').run();
		db.close();
		const response = {
			status: 'success'
		};

		const responseBody = JSON.stringify(response);

		return new Response(responseBody, {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'An error occurred. Error: ', error }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
