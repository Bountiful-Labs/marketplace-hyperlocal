import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const port = configService.get<number>('API_PORT', 3001);
  const host = configService.get<string>('API_HOST', '0.0.0.0');

  await app.listen(port, host);
  console.log(`Application is running on ${host}:${port}`);
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap application:', error);
  process.exit(1);
});
