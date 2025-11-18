import { calculateTaxes, calculateBaseFromTotal } from './modules/taxCalculator.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tax-form');
    const priceInput = document.getElementById('base-price');
    const rateInput = document.getElementById('tax-rate');
    const resultsDiv = document.getElementById('results');

    const reverseForm = document.getElementById('reverse-tax-form');
    const totalPriceInput = document.getElementById('total-price');
    const reverseRateInput = document.getElementById('reverse-tax-rate');
    const reverseResultsDiv = document.getElementById('reverse-results');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const basePrice = parseFloat(priceInput.value);
        const taxRate = parseFloat(rateInput.value);

        // Llamada al módulo de cálculo (Lógica de Negocio)
        const results = calculateTaxes(basePrice, taxRate);

        if (results) {
            // Función para mostrar resultados (Lógica de Presentación)
            renderResults(basePrice, taxRate, results);
        } else {
            resultsDiv.innerHTML = '<p class="error">Por favor, ingrese valores válidos.</p>';
        }
    });

    reverseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const totalPrice = parseFloat(totalPriceInput.value);
        const taxRate = parseFloat(reverseRateInput.value);

        // Llamada al módulo de cálculo inverso (Lógica de Negocio)
        const results = calculateBaseFromTotal(totalPrice, taxRate);

        if (results) {
            // Función para mostrar resultados inversos (Lógica de Presentación)
            renderReverseResults(totalPrice, taxRate, results);
        } else {
            reverseResultsDiv.innerHTML = '<p class="error">Por favor, ingrese valores válidos.</p>';
        }
    });

    function renderResults(basePrice, rate, { taxAmount, totalPrice }) {
        resultsDiv.innerHTML = `
            <h3>Resultados del Cálculo (Tasa: ${rate}%)</h3>
            <p>Precio Base: **$${basePrice.toFixed(2)}**</p>
            <p>Monto Impuesto: **$${taxAmount.toFixed(2)}**</p>
            <p class="total-result">Precio Total: **$${totalPrice.toFixed(2)}**</p>
        `;
    }

    function renderReverseResults(totalPrice, rate, { basePrice, taxAmount }) {
        reverseResultsDiv.innerHTML = `
            <h3>Resultados del Cálculo Inverso (Tasa: ${rate}%)</h3>
            <p>Precio Total: **$${totalPrice.toFixed(2)}**</p>
            <p>Monto Impuesto: **$${taxAmount.toFixed(2)}**</p>
            <p class="total-result">Precio Base: **$${basePrice.toFixed(2)}**</p>
        `;
    }
});

