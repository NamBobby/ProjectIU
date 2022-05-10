import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordCompare {
    constructor(

    ) {}

    async passCompare(password: string, passHash: string): Promise<boolean>{ 
        const match = await bcrypt.compare(password, passHash);
        return match;
    }
}