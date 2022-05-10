import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false, // reset after 15 minutes
          secretOrKey: "hcmiusebanking",
        });
      }
    
      async validate(payload: any) { 
        console.log("jwt.strategy(): ", payload);
        return payload
      }
}
