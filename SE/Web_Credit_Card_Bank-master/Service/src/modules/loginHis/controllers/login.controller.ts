import { Controller, Get, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminJwtAuthGuard } from 'src/utils/guards/admin-jwt-auth.guard';
import { LoginService } from '../services/login.service';

@Controller('loginHis')
@UsePipes(new ValidationPipe())
export class LoginController {
    constructor(
        private loginService: LoginService,
    ){}

    @UseGuards(AdminJwtAuthGuard)
    @Get()
    async getAllLoginHis(): Promise<any> {
        return this.loginService.getAllLoginHis();
    }
}
