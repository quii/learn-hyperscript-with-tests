import {describe, it, before, after} from 'node:test';
import assert from 'assert'
import puppeteer from 'puppeteer';


describe('hyperscript', async () => {
    let browser;

    // i don't understand why this doesn't work
    // before(async () => {
    //     browser = await puppeteer.launch();
    //     console.log('browser launched')
    // });

    after(async () => {
        browser.close();
    });

    it('toggles css on stuff', async () => {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:8080/basics.html');

        const firstButtonSelector = '#firstButton'

        function getButtonClass() {
            return page.$eval(firstButtonSelector, el => el.className);
        }

        assert.equal(await getButtonClass(),
            "",
            "no class yet")

        const element = await page.waitForSelector(firstButtonSelector)
        await element.click()

        assert.equal(await getButtonClass(),
            "red",
            "now has class after clicking")
    });
})
