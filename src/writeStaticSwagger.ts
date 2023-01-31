import * as fs from 'fs';
import { get } from 'http';

export function writeStaticSwagger() {
	const dir = __dirname + '/swagger-static';

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	const serverUrl = 'http://localhost:5000';
	// get the swagger json file (if app is running in development mode)
	if (process.env.NODE_ENV === 'development') {
		// write swagger ui files
		get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
			response.pipe(
				fs.createWriteStream(
					__dirname + '/swagger-static/swagger-ui-bundle.js',
				),
			);
			console.log(
				`Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
			);
		});

		get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
			response.pipe(
				fs.createWriteStream(__dirname + '/swagger-static/swagger-ui-init.js'),
			);
			console.log(
				`Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
			);
		});

		get(
			`${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
			function (response) {
				response.pipe(
					fs.createWriteStream(
						__dirname + '/swagger-static/swagger-ui-standalone-preset.js',
					),
				);
				console.log(
					`Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
				);
			},
		);

		get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
			response.pipe(
				fs.createWriteStream(__dirname + '/swagger-static/swagger-ui.css'),
			);
			console.log(
				`Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
			);
		});
	}
}
