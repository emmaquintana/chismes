"use server"

import nodemailer from 'nodemailer';
import winston from 'winston';
import dotenv from "dotenv";
import { randomString } from './utils';
import prisma from './db';

dotenv.config();

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

type EmailProps = {
    from: string,
    to: string,
    subject: string,
    html: string
}

export const sendMail = async (info: EmailProps) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: info.from,
        to: info.to,
        subject: info.subject,
        html: info.html
    };

    logger.info(`Sending mail to - ${info.to}`);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error(error);
        } else {
            logger.info('Email sent: ' + info.response);
        }
    });
}

export async function sendMailForResetPassword(destEmail: string) {
    const dominio = process.env.NODE_ENV === 'production' ? "https://chismes.vercel.app" : "http://localhost:3000";
    const token = randomString(15);
    const randomLink = `${dominio}/reset-password/${token}`;

    // Verify if destEmail exists in the password_reset table in the db
    const emailExistsInPasswordReset = await prisma.password_reset.findUnique({
        where: {
            user_email: destEmail
        }
    });
    // Deletes a register for this email if exists
    if (emailExistsInPasswordReset) {
        await prisma.password_reset.delete({
            where: {
                user_email: destEmail
            }
        });
    }

    await prisma.password_reset.create({
        data: {
            token,
            user_email: destEmail,
            createdAt: new Date(Date.now())
        }
    });

    await sendMail({
        from: 'eqb2021@gmail.com',
        to: destEmail,
        subject: 'Reestablecer contraseña',
        html: `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reestablecer contraseña</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f0f0;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f0f0;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 15px; overflow: hidden;">
                    <tr>
                        <td bgcolor="#b766e5" style="padding: 20px 0; text-align: center;">
                            <h1 style="font-family: Arial, sans-serif; color: #ffffff; font-weight: 800; letter-spacing: 1px; margin: 0;">Chismes</h1>
                        </td>
                    </tr>
                    <tr style="background-color: #ffffff;">
                        <td style="padding: 20px; background-color: #ffffff;">
                            <h2 style="font-family: Arial, sans-serif; font-weight: 700; text-align: center;">Reestablecer contraseña</h2>
                            <p style="font-family: 'Segoe UI', Arial, sans-serif; text-align: center;">
                                El siguiente link te permitirá reestablecer tu contraseña. Recuerda que expirará dentro de 15 minutos.
                            </p>
                            <a href="${randomLink}" style="display: block; color: #0000FF; font-family: 'Segoe UI', Arial, sans-serif; text-align: center;">${randomLink}</a>
                            <p style="font-family: 'Segoe UI', Arial, sans-serif; color: #666666; text-align: center;">
                                Si no solicitaste reestablecer tu contraseña, puedes ignorar este correo.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#b766e5" style="padding: 15px 0; text-align: center;">
                            <p style="font-family: 'Segoe UI', Arial, sans-serif; color: #ffffff; font-weight: 600; letter-spacing: -0.5px; margin: 0;">Derechos reservados - 2024</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `
    });
}