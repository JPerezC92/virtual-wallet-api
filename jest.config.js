// jest.config.js

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	verbose: true,
	preset: 'ts-jest',
	rootDir: '.',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js', 'json'],
	modulePaths: [compilerOptions.baseUrl],
	transform: {
		'^.+\\.(ts|js)$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper(
		compilerOptions.paths /*, { prefix: '<rootDir>/' } */,
	),
	// testMatch: ['**/test/**/*.spec.(ts|js)'],
	testRegex: '.*\\.spec\\.ts$',
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
};
