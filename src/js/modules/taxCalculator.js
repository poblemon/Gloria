/**
 * Calcula el monto del impuesto y el precio total basado en el precio base y la tasa de impuesto.
 * @param {number} basePrice - El precio base sin impuesto.
 * @param {number} taxRate - La tasa de impuesto en porcentaje.
 * @returns {Object|null} Un objeto con taxAmount y totalPrice, o null si los valores son inválidos.
 */
export function calculateTaxes(basePrice, taxRate) {
    if (isNaN(basePrice) || isNaN(taxRate) || basePrice < 0 || taxRate < 0 || taxRate > 100) {
        return null;
    }

    const taxAmount = basePrice * (taxRate / 100);
    const totalPrice = basePrice + taxAmount;

    return {
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        totalPrice: parseFloat(totalPrice.toFixed(2))
    };
}

/**
 * Calcula el precio base a partir del precio total y la tasa de impuesto.
 * @param {number} totalPrice - El precio total incluyendo impuesto.
 * @param {number} taxRate - La tasa de impuesto en porcentaje.
 * @returns {Object|null} Un objeto con basePrice y taxAmount, o null si los valores son inválidos.
 */
export function calculateBaseFromTotal(totalPrice, taxRate) {
    if (isNaN(totalPrice) || isNaN(taxRate) || totalPrice < 0 || taxRate < 0 || taxRate > 100) {
        return null;
    }

    const basePrice = totalPrice / (1 + taxRate / 100);
    const taxAmount = totalPrice - basePrice;

    return {
        basePrice: parseFloat(basePrice.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2))
    };
}
