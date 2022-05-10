import { BadRequestException, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { findUserDto } from 'src/modules/account/dto/account.dto';
import { newAccountSendMail } from 'src/modules/card/dto/cardType.dto';

dotenv.config();
const {EMAIL_USERNAME, EMAIL_PASSWORD} =process.env;

@Injectable()
export class SendMail {
    constructor(
    ) {}

    async sendMailOtp(email: string, otp:number): Promise<any> {
        console.log(email);
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: EMAIL_USERNAME, // username of gmail
              pass: EMAIL_PASSWORD, // password of this gmail
            },
        });
        let mailOption = {
            from: `${EMAIL_USERNAME}`, //email username is email
            to: `${email}`, // list of receivers
            subject: "[IU Bank] Mã Xác Thực Giao Dịch / Transaction Verification Code", // Subject line
            html: `<p style="font-size:16px;">Mã xác thực là <b>${otp}</b>, có hiệu lực trong vòng 1 phút. Chi tiết giao dịch: Chuyển khoản bằng thẻ trên  website IUB Digibank.</p>

            <p style="font-size:16px;">Đây là email tự động. Quý khách vui lòng không gửi thư vào địa chỉ này. Mọi vướng mắc liên quan đến dịch vụ, Quý khách vui lòng tham khảo tại website InternationalUniversityBank https://portal.iubank.com.vn hoặc liên hệ với Hotline 24/7 theo số 1900156868.</p>

            <p style="font-size:16px;"><b>Cám ơn Quý khách đã sử dụng dịch vụ của InternationalUniversityBank!</b></p>

            <hr>

            <p style="font-size:16px;">Your OTP is <b>${otp}</b>, valid in 1 minutes.Transaction details: Transfer via card on Website of IUB Digibank.</p>
            
            <p style="font-size:16px;">Please do not reply to this automatically-generated email. For further information, please direct your inquiries to: <br>
            - Our website: https://portal.iubank.com.vn <br>
            - Our Hotline 24/7 at 1900 15 68 68</p>

            <p style="font-size:16px;"><b>Thank you for banking with InternationalUniversityBank!</b></p>
            `
            
        }
        let info = await transporter.sendMail(mailOption, (err,data) => {
            if(err) {
                console.log("SentMailErr(): ",err);
                throw new BadRequestException('can not sent');
            } else {
                console.log("SentMail(): sent");
            }
        })
        return otp
    }

    async sendNewPass(email:string, generatePass: string): Promise<any> {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: EMAIL_USERNAME, // username of gmail
              pass: EMAIL_PASSWORD, // password of this gmail
            },
        });

        let mailOption = {
            from: `${EMAIL_USERNAME}`, //email username is email
            to: `${email}`, // list of receivers
            subject: `[IU Bank] Cấp lại mật khẩu IU Bank/Reset IU Bank’s password`, // Subject line
            html: `<p style="font-size:16px;">InternationalUniversityBank xin thông báo yêu cầu cấp lại mật khẩu dịch vụ IUB Digibank đã được thực hiện thành công. Mật khẩu mới là:</p>

            <p style="font-size:16px;"><b>${generatePass}</b></p>

            <p style="font-size:16px;">Quý khách vui lòng kích hoạt dịch vụ trong vòng 24 giờ để sử dụng dịch vụ.</p>

            <p style="font-size:16px;">Đây là email tự động. Quý khách vui lòng không gửi thư vào địa chỉ này. Mọi vướng mắc liên quan đến dịch vụ, Quý khách vui lòng tham khảo tại website InternationalUniversityBank https://portal.iubank.com.vn hoặc liên hệ với Hotline 24/7 theo số 1900156868.</p>

            <p style="font-size:16px;"><b>Cám ơn Quý khách đã sử dụng dịch vụ của InternationalUniversityBank!</b></p>

            <hr>

            <p style="font-size:16px;">We would like to inform you that your password has been reset at your request. Your new password is:</p>

            <p style="font-size:16px;"><b>${generatePass}</b></p>

            <p style="font-size:16px;">Please activate service during 24 hours since you have received PIN.</p>

            <p style="font-size:16px;">Please do not reply to this automatically-generated email. For further information, please direct your inquiries to: <br>
            - Our website: https://portal.iubank.com.vn <br>
            - Our Hotline 24/7 at 1900 15 68 68</p>

            <p style="font-size:16px;"><b>Thank you for using our services!</b></p>
            `
            
        }

        let info = await transporter.sendMail(mailOption, (err,data) => {
            if(err) {
                console.log("SentMailErr(): ",err);
                throw new BadRequestException('can not sent');
            } else {
                console.log("SentMail(): sent");
            }
        })
        return generatePass;
    }

    async sendNewUser (params: newAccountSendMail): Promise<any> {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: EMAIL_USERNAME, // username of gmail
              pass: EMAIL_PASSWORD, // password of this gmail
            },
        });

        let mailOption = {
            from: `${EMAIL_USERNAME}`, //email username is email
            to: `${params.Email}`, // list of receivers
            subject: `[IU Bank] Cấp tài khoản IU Digibank/ Create new account IU Digibank’s`, // Subject line
            html: `<p style="font-size:16px;">InternationalUniversityBank xin thông báo yêu cầu cấp tài khoản mới dịch vụ IUB Digibank đã được thực hiện thành công. Tài khoản mới là:</p>
 
            <p style="font-size:16px;">Họ và tên: <b>${params.FirstName} ${params.LastName}</b></p>
            <p style="font-size:16px;">Tên đăng nhập: <b>${params.UserName}</b></p>
            <p style="font-size:16px;">Số căn cước công dân: <b>${params.IdentifyCard}</b></p>
            <p style="font-size:16px;">Ngày sinh: <b>${params.DateOfBirth}</b></p>
            <p style="font-size:16px;">Số điện thoại: <b>0${params.PhoneNumber}</b></p>
            <p style="font-size:16px;">Mã số thẻ: <b>${params.CardID}</b></p>
            <p style="font-size:16px;">Số tiền: <b>${params.CurrentBalance}</b></p>
            <p style="font-size:16px;">Ngày Hết hạn: <b>${params.DateOfExpired}</b></p>

            <p style="font-size:16px;">Quý khách vui lòng kích hoạt dịch vụ trong vòng 24 giờ để sử dụng dịch vụ.</p>

            <p style="font-size:16px;">Đây là email tự động. Quý khách vui lòng không gửi thư vào địa chỉ này. Mọi vướng mắc liên quan đến dịch vụ, Quý khách vui lòng tham khảo tại website InternationalUniversityBank https://portal.iubank.com.vn hoặc liên hệ với Hotline 24/7 theo số 1900156868.</p>

            <p style="font-size:16px;"><b>Cám ơn Quý khách đã sử dụng dịch vụ của InternationalUniversityBank!</b></p>

            <hr>

            <p style="font-size:16px;">We would like to inform you that your account has been created at your request. Your new account is:</p>

            <p style="font-size:16px;">Full name: <b>${params.FirstName} ${params.LastName}</b></p>
            <p style="font-size:16px;">Username: <b>${params.UserName}</b></p>
            <p style="font-size:16px;">Identify number: <b>${params.IdentifyCard}</b></p>
            <p style="font-size:16px;">Date Of Birth: <b>${params.DateOfBirth}</b></p>
            <p style="font-size:16px;">Phone Number: <b>0${params.PhoneNumber}</b></p>
            <p style="font-size:16px;">Card Number: <b>${params.CardID}</b></p>
            <p style="font-size:16px;">CurrenBalance: <b>${params.CurrentBalance}</b></p>
            <p style="font-size:16px;">Date of expired: <b>${params.DateOfExpired}</b></p>

            <p style="font-size:16px;">Please activate service during 24 hours since you have received PIN.</p>

            <p style="font-size:16px;">Please do not reply to this automatically-generated email. For further information, please direct your inquiries to: <br>
            - Our website: https://portal.iubank.com.vn <br>
            - Our Hotline 24/7 at 1900 15 68 68</p>

            <p style="font-size:16px;"><b>Thank you for using our services!</b></p>
            `
        }
        let info = await transporter.sendMail(mailOption, (err,data) => {
            if(err) {
                console.log("SentMailErr(): ",err);
                throw new BadRequestException('can not sent');
            } else {
                console.log("SentMail(): sent");
            }
        })
        return "done";
    }
}