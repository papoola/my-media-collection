const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});


const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (if you have them in tsconfig.json)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
