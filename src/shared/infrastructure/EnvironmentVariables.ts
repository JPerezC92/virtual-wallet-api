interface EnvironmentVariables {
	PORT: string;
	DATABASE_HOST: string;
	DATABASE_PORT: string;
	DATABASE_USERNAME: string;
	DATABASE_PASSWORD: string;
	DATABASE_NAME: string;
	JWT_ACCESSS_TOKEN_SECRET: string;
	JWT_REFRESH_TOKEN_SECRET: string;
}

export const environmentVariables =
	process.env as unknown as EnvironmentVariables;
