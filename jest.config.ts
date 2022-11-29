import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
	verbose: true,
	preset: "ts-jest",
	rootDir: ".",
	roots: ["<rootDir>"],
	modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
	moduleNameMapper: pathsToModuleNameMapper(
		compilerOptions.paths /*, { prefix: '<rootDir>/' } */
	),
	moduleFileExtensions: ["ts", "js", "json"],
	transform: {
		"^.+\\.(ts|tsx|js)$": "ts-jest",
	},
	testMatch: ["**/__TESTS__/**/*.spec.(ts|js)"],
	testEnvironment: "node",
	setupFiles: ["<rootDir>/jest.setup.ts"],
	moduleDirectories: ["<rootDir>/../", "node_modules"],
};

export default jestConfig;
