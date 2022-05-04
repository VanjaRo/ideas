import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    var cookieExtractor = (req) => {
      var token = null;
      if (req && req.cookies) {
        token = req.cookies["jwt"];
      }
      return token;
    };
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN,
    });
  }
  async validate(payload: any) {
    // console.log(payload);
    return {
      id: payload.id,
      username: payload.username,
    };
  }
}
