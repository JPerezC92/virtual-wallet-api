import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { NestFactory } from '@nestjs/core';
import * as swagger from '@nestjs/swagger';
import * as morgan from 'morgan';

import { writeStaticSwagger } from '@/src/writeStaticSwagger';

import { AppModule } from './app.module';

const whitelist = ['https://alkybank-rho.vercel.app'];
// const whitelist = ['http://localhost:3000'];

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: whitelist,
		preflightContinue: false,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'OPTIONS'],
		optionsSuccessStatus: 204,
		allowedHeaders: [
			'Access-Control-Allow-Origin',
			'Content-Type',
			'Accept',
			'Origin',
			'x-refresh-token',
			'Authorization ',
		],
		credentials: true,
	});

	app.use(morgan('dev'));

	const config = new swagger.DocumentBuilder()
		.setTitle('Virtual wallet')
		.setDescription(
			'An API of a virtual wallet that provides the functionality of the wallet and can be integrated into applications or websites.',
		)
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	patchNestjsSwagger();

	const document = swagger.SwaggerModule.createDocument(app, config);

	swagger.SwaggerModule.setup('/swagger', app, document);
	await app.listen(process.env.PORT || 5000);

	// get the swagger json file (if app is running in development mode)
	writeStaticSwagger();
}

bootstrap();
