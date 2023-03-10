import {describe, it, before, after} from 'node:test';
import assert from 'assert'
import puppeteer from 'puppeteer';


describe('hyperscript', async () => {
    let browser, page;

    before(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.goto('http://localhost:8080/basics.html');
    });

    after(async () => {
        browser.close();
    });

    describe('on click', async () => {
        it('toggles a button css', async () => {
            const selector = '#firstButton'

            const getClass = () => page.$eval(selector, el => el.className);

            assert.equal(await getClass(selector), "", "no class yet")

            const element = await page.waitForSelector(selector)
            await element.click()

            assert.equal(await getClass(), "red", "now has class after clicking")
        })

        it('toggles another button css with a comment inside', async () => {
            const selector = '#comments'

            const getClass = () => page.$eval(selector, el => el.className);

            assert.equal(await getClass(), "", "no class yet")

            const element = await page.waitForSelector(selector)
            await element.click()

            assert.equal(await getClass(), "red", "now has class after clicking")

            await element.click()
            assert.equal(await getClass(), "", "class toggled away")

        })

        it('state kept within the element', async () => {
            const selector = '#state'

            const getClass = () => page.$eval(selector, el => el.className);

            assert.equal(await getClass(), "", "no class yet")

            const element = await page.waitForSelector(selector)
            await element.click()
            assert.equal(await getClass(), "", "still no class yet")
            await element.click()
            await element.click()
            assert.equal(await getClass(), "red", "now has class after clicking")
        })

        it('state put into something else', async () => {
            const element = await page.waitForSelector('#otherTarget')
            await element.click()
            await element.click()
            await element.click()
            assert.equal(await page.$eval('#output', el => el.innerText), "3")
        })

    });
})
