import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async checkTelegramAuthorization(user: any): Promise<any> {}
}
