const envVariables = [
	'JWT_ACCESSS_TOKEN_SECRET',
	'JWT_REFRESH_TOKEN_SECRET',
] as const;

export type EnvVariables = Record<typeof envVariables[number], string>;
