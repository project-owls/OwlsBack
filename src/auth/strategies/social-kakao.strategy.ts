import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";

@Injectable()
// kakao 로그인 passport 전략
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ["account_email", "profile_nickname"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      email: profile._json.kakao_account.email,
      nickname: profile.displayName,
    };
  }
}