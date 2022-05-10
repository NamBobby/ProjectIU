import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'adminjwt') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false, // reset after 15 minutes
          secretOrKey: "hcmiusebanking",
        });
      }
    
      async validate(payload: any) {
        if(payload.type == 'Admin') {
          console.log(payload);
          return payload
        }
        else 
        throw new UnauthorizedException("Unauthorized");
      }
}
