import puppeteer from 'puppeteer';

export const GET = async () => {
	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
		);
		await page.setViewport({ width: 1920, height: 1080 });

		await page.goto('https://meroshare.cdsc.com.np/#/login');
		await page.waitForSelector('.sign-in');

		await page.screenshot({ path: `debug.png` });

		browser.close();

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
