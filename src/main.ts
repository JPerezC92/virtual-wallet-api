import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { NestFactory } from '@nestjs/core';
import * as swagger from '@nestjs/swagger';
import * as morgan from 'morgan';

import { writeStaticSwagger } from '@/src/writeStaticSwagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.use(morgan('dev'));
	const config = new swagger.DocumentBuilder()
		.setTitle('Alkybank wallet')
		.setDescription('The cats API description')
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
