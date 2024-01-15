import { Database } from 'bun:sqlite';

export const POST = async (event) => {
	try {
		const data = await event.request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const client_id = data.get('client_id');
		const demat_no = data.get('demat_no');
		const crn = data.get('crn');
		const boid = data.get('boid');
		const dp = data.get('dp');

		const db = await new Database('accounts.sqlite');

		await db
			.query(
				`CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT,
                client_id INTEGER,
                demat_no TEXT,
                crn TEXT,
                boid INTEGER,
                dp INTEGER
            )`
			)
			.run();

		await db
			.query(
				`INSERT INTO accounts (username, password, client_id, demat_no, crn, boid, dp) VALUES (${username}, ${password}, ${client_id}, ${demat_no}, ${crn}, ${boid}, ${dp})`
			)
			.run();

		let rows = db.query('SELECT * FROM accounts').all();
		console.log(rows);

		return new Response(JSON.stringify({ success: true }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'An error occurred' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
