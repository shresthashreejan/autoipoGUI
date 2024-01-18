import { Database } from 'bun:sqlite';

export const PUT = async ({ request }) => {
	try {
		const data = await request.formData();
		const id = data.get('id');
		const username = data.get('username');
		const password = data.get('password');
		const client_id = data.get('client_id');
		const demat_no = data.get('demat_no');
		const crn = data.get('crn');
		const boid = data.get('boid');
		const dp = data.get('dp');

		const db = new Database('accounts.sqlite');

		await db
			.query(
				`UPDATE accounts SET username = ${username}, password = ${password}, client_id = ${client_id}, demat_no = ${demat_no}, crn = ${crn}, boid = ${boid}, dp = ${dp} WHERE id = ${id}`
			)
			.run();

		const response = {
			status: 'success',
			message: `Account with ID ${id} updated successfully`
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
