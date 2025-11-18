import { calculateTaxes, calculateBaseFromTotal } from '../../src/js/modules/taxCalculator.js';

describe('calculateTaxes', () => {
  test('calcula correctamente el impuesto y el precio total', () => {
    const result = calculateTaxes(100, 16);
    expect(result).toEqual({
      taxAmount: 16.00,
      totalPrice: 116.00
    });
  });

  test('maneja valores decimales correctamente', () => {
    const result = calculateTaxes(123.45, 10.5);
    expect(result).toEqual({
      taxAmount: 12.96,
      totalPrice: 136.41
    });
  });

  test('devuelve null para precio base negativo', () => {
    const result = calculateTaxes(-100, 16);
    expect(result).toBeNull();
  });

  test('devuelve null para tasa de impuesto negativa', () => {
    const result = calculateTaxes(100, -5);
    expect(result).toBeNull();
  });

  test('devuelve null para tasa de impuesto mayor a 100', () => {
    const result = calculateTaxes(100, 150);
    expect(result).toBeNull();
  });

  test('devuelve null para valores no numéricos', () => {
    const result = calculateTaxes('abc', 16);
    expect(result).toBeNull();
  });

  test('devuelve null para tasa de impuesto no numérica', () => {
    const result = calculateTaxes(100, 'xyz');
    expect(result).toBeNull();
  });

  test('calcula correctamente con tasa de impuesto cero', () => {
    const result = calculateTaxes(100, 0);
    expect(result).toEqual({
      taxAmount: 0.00,
      totalPrice: 100.00
    });
  });

  test('calcula correctamente con precio base cero', () => {
    const result = calculateTaxes(0, 16);
    expect(result).toEqual({
      taxAmount: 0.00,
      totalPrice: 0.00
    });
  });

  test('maneja números grandes correctamente', () => {
    const result = calculateTaxes(1000000, 20);
    expect(result).toEqual({
      taxAmount: 200000.00,
      totalPrice: 1200000.00
    });
  });
});

describe('calculateBaseFromTotal', () => {
  test('calcula correctamente el precio base y el impuesto desde el total', () => {
    const result = calculateBaseFromTotal(116, 16);
    expect(result).toEqual({
      basePrice: 100.00,
      taxAmount: 16.00
    });
  });

  test('maneja valores decimales correctamente', () => {
    const result = calculateBaseFromTotal(136.41, 10.5);
    expect(result).toEqual({
      basePrice: 123.45,
      taxAmount: 12.96
    });
  });

  test('devuelve null para precio total negativo', () => {
    const result = calculateBaseFromTotal(-116, 16);
    expect(result).toBeNull();
  });

  test('devuelve null para tasa de impuesto negativa', () => {
    const result = calculateBaseFromTotal(116, -5);
    expect(result).toBeNull();
  });

  test('devuelve null para tasa de impuesto mayor a 100', () => {
    const result = calculateBaseFromTotal(116, 150);
    expect(result).toBeNull();
  });

  test('devuelve null para valores no numéricos', () => {
    const result = calculateBaseFromTotal('abc', 16);
    expect(result).toBeNull();
  });

  test('devuelve null para tasa de impuesto no numérica', () => {
    const result = calculateBaseFromTotal(116, 'xyz');
    expect(result).toBeNull();
  });

  test('calcula correctamente con tasa de impuesto cero', () => {
    const result = calculateBaseFromTotal(100, 0);
    expect(result).toEqual({
      basePrice: 100.00,
      taxAmount: 0.00
    });
  });

  test('calcula correctamente con precio total cero', () => {
    const result = calculateBaseFromTotal(0, 16);
    expect(result).toEqual({
      basePrice: 0.00,
      taxAmount: 0.00
    });
  });

  test('maneja números grandes correctamente', () => {
    const result = calculateBaseFromTotal(1200000, 20);
    expect(result).toEqual({
      basePrice: 1000000.00,
      taxAmount: 200000.00
    });
  });
});
