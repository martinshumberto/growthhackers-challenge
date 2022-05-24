import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from 'src/modules/logger/logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger: LoggerService = new LoggerService();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        let errorsRemap = errors.map((erro) =>
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(erro?.constraints).map(([key, value]) => value),
        );
        errorsRemap = [...new Set([].concat(...errorsRemap))];
        return {
          status: 422,
          message: errorsRemap,
        };
      },
    }),
  );

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

  // HM | 24/05/2022
  // I added the cors options above to make sure we respond correctly to OPTIONS requests since
  // chrome and some older browsers flake out on the default response (204) so I am changin it to 200,
  // also chrome does not like max age beyond 600 seconds. All the others are the cors defaults. I just wanted to be
  // explicit here.

  app.enableCors({
    preflightContinue: false,
    optionsSuccessStatus: 200,
    maxAge: 600,
  });

  logger.verbose(`App listening on port => ${process.env.PORT || 4000}`);
  await app.listen(4000);
}
bootstrap();
