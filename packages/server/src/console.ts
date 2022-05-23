import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app/app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    app.close();

    process.exit(0);
  } catch (e) {
    app.close();
    console.log(e);

    process.exit(1);
  }
});
