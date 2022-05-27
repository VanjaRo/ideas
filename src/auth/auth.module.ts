import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.stategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["heroku.env", ".env"],
    }),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: "14d" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
