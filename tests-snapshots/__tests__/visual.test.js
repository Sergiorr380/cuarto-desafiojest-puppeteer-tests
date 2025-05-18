const puppeteer = require("puppeteer");
const { toMatchImageSnapshot } = require("jest-image-snapshot");

expect.extend({ toMatchImageSnapshot });

describe("Visual test simple", () => {
  it("Debe tomar una screenshot", async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://example.com");
    const screenshot = await page.screenshot();
    await browser.close();
    expect(screenshot).toMatchImageSnapshot();
  });
});

it("Captura de pantalla de un elemento en específico", async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.example.com");

  const h1 = await page.waitForSelector("h1");
  const image = await h1.screenshot();

  expect(image).toMatchImageSnapshot({
    failureThresholdType: "percent",
    failureThreshold: 0.01,
  });

  await browser.close();
});

it.only("Captura de pantalla removiendo un elemento en específico", async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.example.com");

  // Elimina todos los <h1>
  await page.evaluate(() => {
    (document.querySelectorAll("h1") || []).forEach((el) => el.remove());
  });

  await page.waitForTimeout(500); // espera pequeña para estabilizar

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();

  await browser.close();
});




