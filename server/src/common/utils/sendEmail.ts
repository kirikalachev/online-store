import nodemailer from 'nodemailer';
import { IUser } from '../../users/user.model';

export const sendVerificationEmail = async (user: IUser) => {
    try {
        // Създаване на тестов акаунт в Ethereal
        const testAccount = await nodemailer.createTestAccount();

        // Настройка на транспортьор с данни от тестовия акаунт
        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
            tls: {
                rejectUnauthorized: false,  // Игнориране на самоподписаните сертификати
            }
        });

        // Линк за верификация
        const verificationLink = `http://localhost:3000/api/auth/verify/${user.verificationToken}`;

        const mailOptions = {
            from: '"My Store" <no-reply@example.com>',
            to: user.email,
            subject: 'Email Verification',
            html: `Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`
        };

        // Изпращане на имейл
        const info = await transporter.sendMail(mailOptions);
        
        // Печат на линк за преглед
        console.log('✅ Email sent!');
        console.log('📬 Preview URL:', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};
