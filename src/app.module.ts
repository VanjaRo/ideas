import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoadTimeInterceptor } from "./interceptors/loadTime.interceptor";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";
import { EventsModule } from "./events/events.module";
import { VotesService } from "./votes/votes.service";
import { VotesModule } from "./votes/votes.module";
import { ThemesModule } from "./themes/themes.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["heroku.env", ".env"],
    }),
    AuthModule,
    UserModule,
    PostModule,
    EventsModule,
    VotesModule,
    ThemesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoadTimeInterceptor,
    },
  ],
})
export class AppModule {}
