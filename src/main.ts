import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  var hbs = require("hbs");
  var hbsutils = require("hbs-utils")(hbs);
  hbsutils.registerPartials(join(__dirname, "..", "views", "partials"));
  hbsutils.registerWatchedPartials(join(__dirname, "..", "views", "partials"));

  const config = new DocumentBuilder()
    .setTitle("IDEAS")
    .setDescription("IDEAS API description")
    .addBearerAuth()
    .setVersion("0.4")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT;
  await app.listen(port ? port : 3000);
}
bootstrap();
