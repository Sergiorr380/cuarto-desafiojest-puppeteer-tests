const puppeteer = require("puppeteer");
const percySnapshot = require("@percy/puppeteer");

describe("Percy test", () => {
  let browser;
  let page;

  beforeAll(async function () {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
  });

  afterAll(async function () {
    await browser.close();
  });

  test("Captura sin H1", async () => {
    await page.goto("https://www.example.com");
    await page.waitForSelector("h1");

    //  Elimina todos los elementos h1
    await page.evaluate(() => {
      (document.querySelectorAll("h1") || []).forEach((el) => el.remove());
    });

    //  Toma el snapshot visual
    await percySnapshot(page, "Ejemplo sin H1");
  });
});
