// Configuración global para Jest
// Aquí puedes configurar mocks globales o configuraciones adicionales si es necesario

// Mock para localStorage si es necesario
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock para console si quieres silenciar logs en tests
// global.console = {
//   log: jest.fn(),
//   error: jest.fn(),
//   warn: jest.fn(),
// };
