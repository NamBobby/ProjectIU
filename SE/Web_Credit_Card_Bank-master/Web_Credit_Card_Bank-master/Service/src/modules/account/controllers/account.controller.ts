import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminJwtAuthGuard } from 'src/utils/guards/admin-jwt-auth.guard';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { fineOneDto } from '../dto/account.dto';
import { AccountService } from '../services/account.service';

@Controller('account')
@UsePipes(new ValidationPipe())
export class AccountController {
    constructor(
        private accountService: AccountService,

    ) {}
    @UseGuards(AdminJwtAuthGuard)
    @Get()
    async findAll(): Promise<any> {
        return this.accountService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async fineOne( @Param('id') id:number):Promise<any> {
        let Info:fineOneDto = {
            id : id,
            status : "GetAccount"
        }
        return this.accountService.findOne(Info);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/Iden/:IdentifyCard')
    async findUserByIdentifyCard(@Param('IdentifyCard') IdentifyCard: number): Promise<any> {
        return this.accountService.findUserByIdentifyCard({IdentifyCard: IdentifyCard});
    }

}
