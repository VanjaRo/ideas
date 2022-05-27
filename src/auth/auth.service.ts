import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createHash, createHmac, Hmac } from "crypto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async checkTelegramHash({ hash, ...userData }): Promise<boolean> {
    let sekretKey = createHash("sha256").update(process.env.BOT_TOKEN).digest();
    let dataCheckStr = Object.keys(userData)
      .sort()
      .map((key) => `${key}=${userData[key]}`)
      .join("\n");
    let hmac = createHmac("sha256", sekretKey)
      .update(dataCheckStr)
      .digest("hex");

    return hash === hmac;
  }

  async login(user: any) {
    // turn user into a userdto
    let createUserDto = {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      photoUrl: user.photo_url,
    };
    let userInDb = this.userService.createUser(createUserDto);

    if (!this.checkTelegramHash(user)) {
      throw new Error("Invalid hash");
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }
}
