import puppeteer from 'puppeteer';

export const POST = async ({ request }) => {
	try {
		const requestBody = await request.json();

		for (const account of requestBody.fetchedAccounts) {
			await login(account);
		}

		const response = {
			status: 'success'
		};

		const responseBody = JSON.stringify(response);

		return new Response(responseBody, {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ status: 'error', message: error }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500
		});
	}
};

const login = async (account) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
	);
	await page.setViewport({ width: 1920, height: 1080 });

	await page.goto('https://meroshare.cdsc.com.np/#/login');
	await page.waitForSelector('.sign-in');

	const username = await page.$('#username');
	if (username) {
		await username.click();
		await username.type(account.username);
	}

	const password = await page.$('#password');
	if (password) {
		await password.click();
		await password.type(account.password);
	}

	await page.screenshot({ path: `${account.username}_debug.png` });

	browser.close();
};
