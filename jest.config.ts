import type {Config} from 'jest';
import nextJest from 'next/jest.js';

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
 dir: './',
});

// Correctly use Config.InitialOptions as the type for your config variable
const config: Config = {
 coverageProvider: 'v8',
 testEnvironment: 'jsdom',
 setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
 coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
 },
};

// Merge the custom configuration with the Next.js Jest configuration
export default createJestConfig(config);
