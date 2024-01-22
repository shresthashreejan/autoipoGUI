import puppeteer from 'puppeteer';

export const POST = async ({ request }) => {
	try {
		const requestBody = await request.json();

		const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

		for (const account of requestBody.fetchedAccounts) {
			await login(account);
			await delay(5000);
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
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
	);
	await page.setViewport({ width: 1920, height: 1080 });

	await page.goto('https://meroshare.cdsc.com.np/#/login');
	await page.waitForSelector('.forget-password');

	const selectDp = await page.$('.select2-selection__placeholder');
	if (selectDp) {
		await selectDp.click();
		await selectDp.type(account.dp.toString());
	}

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

	const signIn = await page.$('.btn.sign-in');
	if (signIn) {
		await signIn.click();
	}

	await page.waitForSelector('.msi-asba');
	const asba = await page.$('.msi-asba');
	if (asba) {
		await asba.click();
	}

	await page.screenshot({ path: `${account.username}_debug.png` });

	await browser.close();
};
