import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    './src/**/*.{js,ts}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  testMatch: ['**/*.spec.ts'],
};
export default config;
