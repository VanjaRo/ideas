import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const parseCookie = (str) =>
      str
        .split(";")
        .map((v) => v.split("="))
        .reduce((acc, v) => {
          acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
            v[1].trim()
          );
          return acc;
        }, {});
    var cookieExtractor = (req) => {
      var token = null;
      if (req && req.cookies) {
        token = req.cookies["jwt"];
      } else if (req && req["handshake"]["headers"]["cookie"]) {
        // check cookie for WS connection
        // parse cookie
        token = parseCookie(req["handshake"]["headers"]["cookie"])["jwt"];
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
