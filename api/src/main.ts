import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const Port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  await app.listen(Port);
  console.log(`Application is running on http://localhost:${Port}`);
}

bootstrap();
