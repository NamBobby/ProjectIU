import jwt_decode from 'jwt-decode';
import { decodeJwtDto } from '../login/login-dto';

export const decodeToken = {
    jwtDecodeTypeFunc: (token: string) => {
        console.log(token);
        let result:decodeJwtDto = jwt_decode(token);
        return result.type
    },
    checkExpToken: (extoken:string) => {
        let tokenDecoded:decodeJwtDto = jwt_decode(extoken);
        let dateExp = Date.now();
        console.log("token is expired?: ", dateExp > (tokenDecoded.exp * 1000));
        if(dateExp > tokenDecoded.exp* 1000) {
        //return true mean that token is expired
        window.alert("expired time");
        window.location.reload();
        return true
    }
    // loginFunction(loginInfo);
    return false
    },
    getIdFromJwt: (token:string) => {
        let result:decodeJwtDto = jwt_decode(token);
        //sub response from server is accountID
        return result.sub
    }
}