import { calculateTaxes } from '../../src/js/modules/taxCalculator.js';

describe('Integración: main.js con taxCalculator', () => {
  let form, priceInput, rateInput, resultsDiv;

  beforeEach(() => {
    // Configurar el DOM simulado
    document.body.innerHTML = `
      <form id="tax-form">
        <input type="number" id="base-price">
        <input type="number" id="tax-rate">
        <button type="submit" id="calculate-btn">Calcular</button>
      </form>
      <div id="results"></div>
    `;

    form = document.getElementById('tax-form');
    priceInput = document.getElementById('base-price');
    rateInput = document.getElementById('tax-rate');
    resultsDiv = document.getElementById('results');

    // Simular la lógica de main.js
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const basePrice = parseFloat(priceInput.value);
      const taxRate = parseFloat(rateInput.value);
      const results = calculateTaxes(basePrice, taxRate);

      if (results) {
        renderResults(basePrice, taxRate, results);
      } else {
        resultsDiv.innerHTML = '<p class="error">Por favor, ingrese valores válidos.</p>';
      }
    });

    function renderResults(basePrice, rate, { taxAmount, totalPrice }) {
      resultsDiv.innerHTML = `
        <h3>Resultados del Cálculo (Tasa: ${rate}%)</h3>
        <p>Precio Base: <strong>$${basePrice.toFixed(2)}</strong></p>
        <p>Monto Impuesto: <strong>$${taxAmount.toFixed(2)}</strong></p>
        <p class="total-result">Precio Total: <strong>$${totalPrice.toFixed(2)}</strong></p>
      `;
    }
  });

  test('muestra resultados correctos para entrada válida', () => {
    priceInput.value = '100';
    rateInput.value = '16';

    const event = new Event('submit');
    form.dispatchEvent(event);

    expect(resultsDiv.innerHTML).toContain('Resultados del Cálculo (Tasa: 16%)');
    expect(resultsDiv.innerHTML).toContain('Precio Base: <strong>$100.00</strong>');
    expect(resultsDiv.innerHTML).toContain('Monto Impuesto: <strong>$16.00</strong>');
    expect(resultsDiv.innerHTML).toContain('Precio Total: <strong>$116.00</strong>');
  });

  test('muestra mensaje de error para entrada inválida', () => {
    priceInput.value = '-100';
    rateInput.value = '16';

    const event = new Event('submit');
    form.dispatchEvent(event);

    expect(resultsDiv.innerHTML).toContain('Por favor, ingrese valores válidos.');
    expect(resultsDiv.innerHTML).toContain('class="error"');
  });

  test('maneja valores decimales correctamente', () => {
    priceInput.value = '123.45';
    rateInput.value = '10.5';

    const event = new Event('submit');
    form.dispatchEvent(event);

    expect(resultsDiv.innerHTML).toContain('Precio Base: <strong>$123.45</strong>');
    expect(resultsDiv.innerHTML).toContain('Monto Impuesto: <strong>$12.96</strong>');
    expect(resultsDiv.innerHTML).toContain('Precio Total: <strong>$136.41</strong>');
  });

  test('previene el envío por defecto del formulario', () => {
    const mockPreventDefault = jest.fn();
    const event = new Event('submit');
    event.preventDefault = mockPreventDefault;

    form.dispatchEvent(event);

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
