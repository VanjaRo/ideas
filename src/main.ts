import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.useStaticAssets(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  const port = process.env.PORT;
  await app.listen(port ? port : 3000);
}
bootstrap();
