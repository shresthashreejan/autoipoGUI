import { Database } from 'bun:sqlite';

export async function DELETE(RequestEvent) {
	const { params } = RequestEvent;
	const id = parseInt(params.slug);
	const db = new Database('accounts.sqlite');
	try {
		await db.query(`DELETE FROM accounts WHERE id = ${id}`).run();
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
}
