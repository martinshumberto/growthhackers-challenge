import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from 'src/modules/logger/logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger: LoggerService = new LoggerService();

  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, Authorization',
      );
      next();
    });
  }

  app.enableCors();
  logger.verbose(`App listening on port => ${process.env.PORT || 4000}`);
  await app.listen(3000);
}
bootstrap();
