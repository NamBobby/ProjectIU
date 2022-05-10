import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminJwtAuthGuard } from 'src/utils/guards/admin-jwt-auth.guard';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { externalPaymentDto, internalPaymentDto } from '../dto/paymentType.dto';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService
    ) {}
    @UseGuards(JwtAuthGuard)
    @Post('internal')
    async internalTransfer(@Body() paymentData: internalPaymentDto) {
        return this.paymentService.internalTransfer(paymentData, "internal");
    }

    @UseGuards(JwtAuthGuard)
    @Post('external')
    async externalTransfer(@Body() paymentData: externalPaymentDto) {
        return this.paymentService.externalTransfer(paymentData, "external")
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get()
    async getAllPayment():Promise<any>{ 
        return this.paymentService.getAllPayment();
    }
}
