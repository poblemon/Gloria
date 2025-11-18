const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');

describe('Pruebas de Aceptación: Calculadora de Impuestos', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      userDataDir: path.join(os.tmpdir(), `puppeteer_test_${Date.now()}_${Math.random()}`)
    });
  }, 30000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  }, 30000);

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('file://' + __dirname + '/../../src/index.html');
  }, 30000);

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  }, 30000);

  test('debe calcular impuestos correctamente', async () => {
    await page.type('#base-price', '100');
    await page.type('#tax-rate', '16');
    await page.click('#calculate-btn');

    await page.waitForSelector('#results');

    const resultsText = await page.$eval('#results', el => el.textContent);
    expect(resultsText).toContain('Resultados del Cálculo (Tasa: 16%)');
    expect(resultsText).toContain('Precio Base: $100.00');
    expect(resultsText).toContain('Monto Impuesto: $16.00');
    expect(resultsText).toContain('Precio Total: $116.00');
  });

  test('debe mostrar error para valores inválidos', async () => {
    await page.type('#base-price', '-100');
    await page.type('#tax-rate', '16');
    await page.click('#calculate-btn');

    await page.waitForSelector('#results .error');

    const errorText = await page.$eval('#results .error', el => el.textContent);
    expect(errorText).toBe('Por favor, ingrese valores válidos.');
  });

  test('debe manejar valores decimales', async () => {
    await page.type('#base-price', '123.45');
    await page.type('#tax-rate', '10.5');
    await page.click('#calculate-btn');

    await page.waitForSelector('#results');

    const resultsText = await page.$eval('#results', el => el.textContent);
    expect(resultsText).toContain('Precio Base: $123.45');
    expect(resultsText).toContain('Monto Impuesto: $12.96');
    expect(resultsText).toContain('Precio Total: $136.41');
  });

  test('debe tener el título correcto', async () => {
    const title = await page.title();
    expect(title).toBe('Calculadora Profesional de Impuestos');
  });

  test('debe tener campos de entrada requeridos', async () => {
    const basePriceRequired = await page.$eval('#base-price', el => el.hasAttribute('required'));
    const taxRateRequired = await page.$eval('#tax-rate', el => el.hasAttribute('required'));

    expect(basePriceRequired).toBe(true);
    expect(taxRateRequired).toBe(true);
  });

  test('debe tener valores por defecto apropiados', async () => {
    const taxRateValue = await page.$eval('#tax-rate', el => el.value);
    expect(taxRateValue).toBe('16');
  });

  test('debe ser responsivo en diferentes tamaños de pantalla', async () => {
    await page.setViewport({ width: 375, height: 667 }); // iPhone SE
    const container = await page.$('.container');
    const isVisible = await container.isIntersectingViewport();
    expect(isVisible).toBe(true);

    await page.setViewport({ width: 768, height: 1024 }); // iPad
    const isVisibleTablet = await container.isIntersectingViewport();
    expect(isVisibleTablet).toBe(true);
  });

  test('debe mostrar resultados con formato correcto', async () => {
    await page.type('#base-price', '1000');
    await page.type('#tax-rate', '20');
    await page.click('#calculate-btn');

    await page.waitForSelector('#results');

    const resultsDiv = await page.$('#results');
    const hasHeading = await resultsDiv.$('h3');
    const paragraphs = await resultsDiv.$$('p');

    expect(hasHeading).not.toBeNull();
    expect(paragraphs.length).toBe(3); // Precio base, impuesto, total
  });
});
