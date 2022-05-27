import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { ThemesModule } from "src/themes/themes.module";
import { EventsGateway } from "./events.gateway";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["heroku.env", ".env"],
    }),
    AuthModule,
    ThemesModule,
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
