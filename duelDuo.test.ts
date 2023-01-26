
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:5500/public/index.html')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test("All bots are displayed", async () => {
    await driver.findElement(By.id("see-all")).click();
    const displayed = await driver.findElement(By.id("all-bots"));
    expect(displayed).toBeTruthy();
})

test("Draw displays 5 bots", async () => {
    await driver.findElement(By.id("draw")).click();
    const five = await driver.findElements(By.className("bot-card")).then(bots => bots.length);
    expect(five).toEqual(5);
})

test("Score updates", async () => {
    await driver.findElement(By.id("draw")).click();
    await driver.findElement(By.className("bot-btn")).click();
    await driver.findElement(By.className("bot-btn")).click();
    await driver.findElement(By.id("duel")).click();

    await driver.sleep(3000);

    const wins = await driver.findElement(By.id("wins")).getText();
    const losses = await driver.findElement(By.id("losses")).getText();

    expect(losses).toContain("1");
})