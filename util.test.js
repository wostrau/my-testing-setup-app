const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
    const text = generateText('Alex', 35);

    expect(text).toBe('Alex (35 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);

    expect(text).toBe(' (null years old)');
});

test('should create an element with text and correct class', () => {
    const text = checkAndGenerate('Alex', 35);

    expect(text).toBe('Alex (35 years old)');
});

test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        // slowMo: 50,
        // args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();

    await page.goto(
        'file:///Users/astrautsou/projects/my-testing-setup-app/index.html'
    );

    await page.click('input#name');
    await page.type('input#name', 'Anna');

    await page.click('input#age');
    await page.type('input#age', '28');

    await page.click('#btnAddUser');

    const finalText = await page.$eval('.user-item', el => el.textContent);

    expect(finalText).toBe('Anna (28 years old)');
}, 10000);